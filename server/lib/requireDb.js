import { isDbConnected } from '../db.js'

/** Reject CMS mutations when MongoDB is unavailable. */
export function requireDb(req, res, next) {
  if (!isDbConnected()) {
    return res.status(503).json({
      error: 'Database unavailable. CMS changes require an active MongoDB connection.'
    })
  }
  next()
}

/** Run auth then DB checks for mutation routes. */
export function requireAdminAndDb(requireAdmin) {
  return (req, res, next) => {
    requireAdmin(req, res, () => requireDb(req, res, next))
  }
}
