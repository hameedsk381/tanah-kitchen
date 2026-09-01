/** Returns stored admin Bearer token (if any). */
export function getAdminToken() {
  return (
    localStorage.getItem('tanah_admin_token') ||
    sessionStorage.getItem('tanah_admin_token') ||
    ''
  )
}

/** Headers for authenticated API requests. */
export function getAuthHeaders({ json = true } = {}) {
  const headers = {}
  if (json) headers['Content-Type'] = 'application/json'
  const token = getAdminToken()
  if (token) headers['Authorization'] = `Bearer ${token}`
  return headers
}
