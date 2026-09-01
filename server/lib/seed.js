import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SERVER_DATA_DIR = path.join(__dirname, '..', 'data')
const SRC_DATA_DIR = path.join(__dirname, '..', '..', 'src', 'data')

/**
 * Read-only seed loader. Prefers server/data (deploy seed), falls back to src/data (dev bundle).
 * Seed files are never written at runtime — MongoDB is the canonical store.
 */
function readSeedFile(filename) {
  const candidates = [
    path.join(SERVER_DATA_DIR, filename),
    path.join(SRC_DATA_DIR, filename)
  ]

  for (const filePath of candidates) {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
  }

  return null
}

export function loadMenuSeed() {
  return readSeedFile('menu.json')
}

export function loadGallerySeed() {
  return readSeedFile('gallery.json')
}

export function loadBentoSeed() {
  return readSeedFile('bento.json')
}

export const SEED_DATA_DIR = SERVER_DATA_DIR
