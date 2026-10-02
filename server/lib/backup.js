import zlib from 'zlib'
import { promisify } from 'util'
import mongoose from 'mongoose'
import cron from 'node-cron'
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import { MenuItem } from '../models/MenuItem.js'
import { BentoSlot } from '../models/BentoSlot.js'
import { GalleryItem } from '../models/GalleryItem.js'
import { Content } from '../models/Content.js'
import { Reservation } from '../models/Reservation.js'

const gzip = promisify(zlib.gzip)

// Admin users are intentionally excluded (password hashes should not be copied around).
const COLLECTIONS = {
  menuItems: MenuItem,
  bentoSlots: BentoSlot,
  galleryItems: GalleryItem,
  content: Content,
  reservations: Reservation
}

export function isBackupConfigured() {
  return Boolean(process.env.S3_BACKUP_BUCKET)
}

function getClient() {
  return new S3Client({ region: process.env.AWS_REGION || 'ap-south-1' })
}

// ISO week number, e.g. 2026-W40
function weekStamp(date = new Date()) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
  const day = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const week = Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`
}

async function objectExists(client, Bucket, Key) {
  try {
    await client.send(new HeadObjectCommand({ Bucket, Key }))
    return true
  } catch (err) {
    if (err?.$metadata?.httpStatusCode === 404 || err?.name === 'NotFound') return false
    throw err
  }
}

/**
 * Dumps the CMS collections to one gzipped JSON file in S3, keyed by ISO week.
 * A week that already has a backup is skipped unless force is true, so multiple
 * instances or restarts don't produce duplicates.
 */
export async function runBackup({ force = false, log = console.log } = {}) {
  const Bucket = process.env.S3_BACKUP_BUCKET
  if (!Bucket) throw new Error('S3_BACKUP_BUCKET is not set')
  if (mongoose.connection.readyState !== 1) throw new Error('MongoDB is not connected')

  const prefix = (process.env.S3_BACKUP_PREFIX || 'tanah-kitchen/').replace(/^\/+/, '')
  const Key = `${prefix}${weekStamp()}.json.gz`
  const client = getClient()

  if (!force && (await objectExists(client, Bucket, Key))) {
    log(`Backup ${Key} already exists, skipping`)
    return { key: Key, skipped: true }
  }

  const data = {}
  const counts = {}
  for (const [name, Model] of Object.entries(COLLECTIONS)) {
    data[name] = await Model.find().lean()
    counts[name] = data[name].length
  }

  const body = await gzip(
    JSON.stringify({ createdAt: new Date().toISOString(), database: mongoose.connection.name, counts, data })
  )
  await client.send(
    new PutObjectCommand({ Bucket, Key, Body: body, ContentType: 'application/gzip', ContentEncoding: 'identity' })
  )
  log(`Backup written to s3://${Bucket}/${Key} (${(body.length / 1024).toFixed(1)} KB)`, counts)
  return { key: Key, skipped: false, counts }
}

/** Schedules the weekly backup (default Sunday 03:00 UTC; override with BACKUP_CRON). */
export function startBackupSchedule() {
  if (!isBackupConfigured()) {
    console.log('💾 Weekly S3 backup disabled (set S3_BACKUP_BUCKET to enable)')
    return
  }
  const expr = process.env.BACKUP_CRON || '0 3 * * 0'
  if (!cron.validate(expr)) {
    console.error(`💾 Invalid BACKUP_CRON "${expr}", backups not scheduled`)
    return
  }
  cron.schedule(expr, () => {
    runBackup({ log: (...a) => console.log('💾', ...a) }).catch((err) => console.error('💾 Backup failed:', err.message))
  }, { timezone: 'UTC' })
  console.log(`💾 Weekly S3 backup scheduled (${expr} UTC) to s3://${process.env.S3_BACKUP_BUCKET}`)
}
