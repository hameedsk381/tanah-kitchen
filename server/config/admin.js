/**
 * Centralized admin credentials from environment.
 * ADMIN_PASSWORD is required in production; optional in development (with warning).
 */
export function validateAdminConfig() {
  if (process.env.ADMIN_PASSWORD) return

  const msg = 'ADMIN_PASSWORD is not set — admin login and user seeding are disabled'
  if (process.env.NODE_ENV === 'production') {
    console.error(`❌ ${msg}. Exiting.`)
    process.exit(1)
  }
  console.warn(`⚠️ ${msg}`)
}

export function getAdminConfig() {
  const password = process.env.ADMIN_PASSWORD
  if (!password) return null

  return {
    username: (process.env.ADMIN_USERNAME || 'admin').trim().toLowerCase(),
    password,
    email: (process.env.ADMIN_EMAIL || 'admin@tanahkitchen.com').trim().toLowerCase()
  }
}
