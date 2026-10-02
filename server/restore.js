import 'dotenv/config'
import zlib from 'zlib'
import mongoose from 'mongoose'
import { COLLECTIONS, getBackupBucket, getBackupPrefix } from './lib/backup.js'

const USAGE = `Usage:
  node server/restore.js --list
  node server/restore.js <latest|backup-key> [--apply] [--replace]

  (no flags)   dry run: shows what the backup contains and what would change
  --apply      actually write to the database
  --replace    with --apply: wipe each collection first, then load the backup
               (default is merge: only documents missing by _id are added)`

const args = process.argv.slice(2)
const flags = new Set(args.filter((a) => a.startsWith('--')))
const target = args.find((a) => !a.startsWith('--'))

const prefix = getBackupPrefix()

async function listBackups(bucket) {
  const [files] = await bucket.getFiles({ prefix })
  return files.map((f) => f.name).filter((n) => n.endsWith('.json.gz')).sort()
}

async function main() {
  if (!flags.has('--list') && !target) {
    console.log(USAGE)
    process.exit(1)
  }

  const bucket = getBackupBucket()
  const keys = await listBackups(bucket)

  if (flags.has('--list')) {
    console.log(keys.length ? keys.join('\n') : 'No backups found')
    return
  }

  const key = target === 'latest' ? keys[keys.length - 1] : target.includes('/') || target.endsWith('.json.gz') ? target : `${prefix}${target}.json.gz`
  if (!key) throw new Error('No backups found in bucket')

  const [contents] = await bucket.file(key).download()
  const backup = JSON.parse(zlib.gunzipSync(contents).toString('utf-8'))
  console.log(`Backup ${key}: created ${backup.createdAt} from database "${backup.database}"`)

  const apply = flags.has('--apply')
  const replace = flags.has('--replace')

  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tanah_kitchen'
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 })
  console.log(`Target database "${mongoose.connection.name}" — ${apply ? (replace ? 'REPLACE' : 'MERGE') : 'DRY RUN'}`)

  for (const [name, Model] of Object.entries(COLLECTIONS)) {
    const docs = backup.data?.[name]
    if (!Array.isArray(docs)) {
      console.log(`${name}: not in backup, skipped`)
      continue
    }
    const existing = await Model.countDocuments()

    if (!apply) {
      const ids = new Set((await Model.find({}, '_id').lean()).map((d) => String(d._id)))
      const missing = docs.filter((d) => !ids.has(String(d._id))).length
      console.log(`${name}: backup ${docs.length}, in DB ${existing}, ${missing} missing from DB`)
      continue
    }

    if (replace) await Model.deleteMany({})
    if (docs.length === 0) {
      console.log(`${name}: nothing to restore`)
      continue
    }
    try {
      const result = await Model.bulkWrite(
        docs.map((doc) => ({ updateOne: { filter: { _id: doc._id }, update: { $setOnInsert: doc }, upsert: true } })),
        { ordered: false, timestamps: false }
      )
      console.log(`${name}: ${result.upsertedCount} restored, ${docs.length - result.upsertedCount} already present`)
    } catch (err) {
      console.error(`${name}: partial failure — ${err.message}`)
      process.exitCode = 1
    }
  }

  if (!apply) console.log('\nDry run only. Re-run with --apply to write (add --replace to wipe collections first).')
}

try {
  await main()
} catch (err) {
  console.error('Restore failed:', err.message)
  process.exitCode = 1
} finally {
  await mongoose.disconnect()
}
