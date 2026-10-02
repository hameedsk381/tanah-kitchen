import zlib from 'zlib'
import { promisify } from 'util'
import mongoose from 'mongoose'
import cron from 'node-cron'
import fs from 'fs'
import { Storage } from '@google-cloud/storage'
import { MenuItem } from '../models/MenuItem.js'
import { BentoSlot } from '../models/BentoSlot.js'
import { GalleryItem } from '../models/GalleryItem.js'
import { Content } from '../models/Content.js'
import { Reservation } from '../models/Reservation.js'

const gzip = promisify(zlib.gzip)

// Admin users are intentionally excluded (password hashes should not be copied around).
export const COLLECTIONS = {
  menuItems: MenuItem,
  bentoSlots: BentoSlot,
  galleryItems: GalleryItem,
  content: Content,
  reservations: Reservation
}

export function isBackupConfigured() {
  return Boolean(process.env.GCS_BACKUP_BUCKET)
}

export function getBackupPrefix() {
  return (process.env.GCS_BACKUP_PREFIX || 'tanah-kitchen/').replace(/^\/+/, '')
}

// Same credential sources as the media uploads in server/index.js.
export function getBackupBucket() {
  const name = process.env.GCS_BACKUP_BUCKET
  if (!name) throw new Error('GCS_BACKUP_BUCKET is not set')

  const options = {}
  const projectId = process.env.GCS_PROJECT_ID || process.env.GCP_PROJECT_ID
  if (projectId) options.projectId = projectId

  const clientEmail = process.env.GCS_CLIENT_EMAIL || process.env.GCP_CLIENT_EMAIL
  const privateKey = (process.env.GCS_PRIVATE_KEY || process.env.GCP_PRIVATE_KEY || '').replace(/\\n/g, '\n')
  const keyJson = process.env.GCP_SERVICE_ACCOUNT_KEY || process.env.GCS_SERVICE_ACCOUNT_KEY

  if (clientEmail && privateKey) {
    options.credentials = { client_email: clientEmail, private_key: privateKey }
  } else if (keyJson) {
    options.credentials = JSON.parse(keyJson)
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS && fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
    options.keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS
  }
  return new Storage(options).bucket(name)
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

/**
 * Dumps the CMS collections to one gzipped JSON file in GCS, keyed by ISO week.
 * A week that already has a backup is skipped unless force is true, so multiple
 * instances or restarts don't produce duplicates.
 */
export async function runBackup({ force = false, log = console.log } = {}) {
  if (mongoose.connection.readyState !== 1) throw new Error('MongoDB is not connected')

  const bucket = getBackupBucket()
  const Key = `${getBackupPrefix()}${weekStamp()}.json.gz`
  const file = bucket.file(Key)

  if (!force && (await file.exists())[0]) {
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
  await file.save(body, { contentType: 'application/gzip', resumable: false })
  log(`Backup written to gs://${bucket.name}/${Key} (${(body.length / 1024).toFixed(1)} KB)`, counts)
  return { key: Key, skipped: false, counts }
}

/** Schedules the weekly backup (default Sunday 03:00 UTC; override with BACKUP_CRON). */
export function startBackupSchedule() {
  if (!isBackupConfigured()) {
    console.log('💾 Weekly GCS backup disabled (set GCS_BACKUP_BUCKET to enable)')
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
  console.log(`💾 Weekly GCS backup scheduled (${expr} UTC) to gs://${process.env.GCS_BACKUP_BUCKET}`)
}
