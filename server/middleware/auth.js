import { isDbConnected } from '../db.js'
import { AdminUser } from '../models/AdminUser.js'
import { getAdminConfig } from '../config/admin.js'

/**
 * Validates admin Bearer token (same format as /api/auth/login).
 * Attaches req.adminUser on success.
 */
export async function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' })
  }

  const token = authHeader.replace('Bearer ', '').trim()
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' })
  }

  try {
    const decoded = Buffer.from(token, 'base64').toString('ascii')
    const [username] = decoded.split(':')

    if (!username) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    const cleanUsername = username.trim().toLowerCase()

    if (isDbConnected()) {
      const user = await AdminUser.findOne({ username: cleanUsername }).lean()
      if (user) {
        req.adminUser = {
          username: user.username,
          email: user.email,
          role: user.role
        }
        return next()
      }
    }

    const adminConfig = getAdminConfig()
    if (adminConfig && cleanUsername === adminConfig.username) {
      req.adminUser = {
        username: adminConfig.username,
        email: adminConfig.email,
        role: 'Super Admin'
      }
      return next()
    }

    return res.status(401).json({ error: 'Invalid or expired session' })
  } catch {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
