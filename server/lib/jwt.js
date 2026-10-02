import crypto from 'crypto'
import jwt from 'jsonwebtoken'

const TOKEN_TTL = process.env.JWT_EXPIRES_IN || '12h'
let secret = null

export function validateJwtConfig() {
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length >= 32) {
    secret = process.env.JWT_SECRET
    return
  }

  const msg = 'JWT_SECRET is missing or shorter than 32 characters'
  if (process.env.NODE_ENV === 'production') {
    console.error(`❌ ${msg}. Exiting.`)
    process.exit(1)
  }
  console.warn(`⚠️ ${msg} — using a random per-process secret; admin sessions reset on restart`)
  secret = crypto.randomBytes(48).toString('hex')
}

export function signAdminToken(username) {
  return jwt.sign({ sub: username }, secret, { algorithm: 'HS256', expiresIn: TOKEN_TTL })
}

/** Returns the username from a valid token, or null. */
export function verifyAdminToken(token) {
  try {
    const payload = jwt.verify(token, secret, { algorithms: ['HS256'] })
    return typeof payload.sub === 'string' ? payload.sub : null
  } catch {
    return null
  }
}
