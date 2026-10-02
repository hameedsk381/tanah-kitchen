import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { MenuItem } from '../models/MenuItem.js'
import { BentoSlot } from '../models/BentoSlot.js'
import { GalleryItem } from '../models/GalleryItem.js'
import { Content } from '../models/Content.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const DEFAULT_SEED_DIR = path.join(__dirname, '..', 'data')

function readSeed(dir, name) {
  const file = path.join(dir, name)
  if (!fs.existsSync(file)) return null
  return JSON.parse(fs.readFileSync(file, 'utf-8'))
}

async function addMissing(label, Model, docs, filterFor, onlyIfEmpty, log) {
  if (!Array.isArray(docs) || docs.length === 0) return
  if (onlyIfEmpty && (await Model.estimatedDocumentCount()) > 0) {
    log(`${label}: collection not empty, skipped`)
    return
  }
  const result = await Model.bulkWrite(
    docs.map((doc) => ({
      updateOne: { filter: filterFor(doc), update: { $setOnInsert: doc }, upsert: true }
    }))
  )
  log(`${label}: ${result.upsertedCount} added, ${docs.length - result.upsertedCount} already present`)
}

async function setCategories(key, categories, log) {
  if (!Array.isArray(categories) || categories.length === 0) return
  const res = await Content.updateOne(
    { key },
    { $setOnInsert: { key, data: { categories } } },
    { upsert: true }
  )
  if (res.upsertedCount) log(`${key}: added`)
}

/**
 * Adds seed menu, bento and gallery documents from JSON files. Never overwrites or deletes.
 * With onlyIfEmpty, a collection is seeded only when it has no documents, so deliberate
 * admin deletions are not undone on restart.
 */
export async function seedDefaults({ dir = DEFAULT_SEED_DIR, onlyIfEmpty = false, log = console.log } = {}) {
  const menu = readSeed(dir, 'menu.json')
  if (menu) {
    await addMissing('Menu items', MenuItem, menu.items, (d) => ({ id: d.id }), onlyIfEmpty, log)
    await setCategories('menu-categories', menu.categories, log)
  }

  const bento = readSeed(dir, 'bento.json')
  if (bento) {
    await addMissing('Bento slots', BentoSlot, bento.items || bento.slots, (d) => ({ $or: [{ id: d.id }, { slot: d.slot }] }), onlyIfEmpty, log)
  }

  const gallery = readSeed(dir, 'gallery.json')
  if (gallery) {
    const items = (gallery.items || []).map(({ spanClass, ...rest }) => (spanClass ? { ...rest, span: spanClass } : rest))
    await addMissing('Gallery items', GalleryItem, items, (d) => ({ id: d.id }), onlyIfEmpty, log)
    await setCategories('gallery-categories', gallery.categories, log)
  }
}
