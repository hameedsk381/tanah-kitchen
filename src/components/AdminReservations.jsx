import { useEffect, useMemo, useState } from 'react'
import { RefreshCw, Search } from 'lucide-react'
import { getAuthHeaders } from '../utils/apiAuth'

const STATUS_STYLES = {
  pending: 'bg-amber-50 text-amber-800 border-amber-200',
  confirmed: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  cancelled: 'bg-rose-50 text-rose-800 border-rose-200'
}

function formatReceived(value) {
  const d = new Date(value)
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleString(undefined, { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })
}

export default function AdminReservations() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {
    let cancelled = false
    fetch('/api/reservations', { headers: getAuthHeaders({ json: false }) })
      .then((res) => {
        if (!res.ok) throw new Error(res.status === 401 ? 'Session expired — sign in again' : 'Failed to load reservations')
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        setReservations(data)
        setError('')
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [reloadCount])

  const load = () => {
    setLoading(true)
    setReloadCount((n) => n + 1)
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return reservations.filter((r) => {
      if (statusFilter !== 'all' && (r.status || 'pending') !== statusFilter) return false
      if (!q) return true
      return [r.name, r.email, r.phone, r.date].some((v) => String(v || '').toLowerCase().includes(q))
    })
  }, [reservations, query, statusFilter])

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-[#5E332E]/15 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl text-[#5E332E]">Reservations</h2>
          <p className="text-xs text-[#1E1B18]/70 mt-1">
            {filtered.length} of {reservations.length} shown, newest first
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#1E1B18]/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, phone, email, date"
              className="pl-9 pr-3 py-2 rounded-xl border border-[#5E332E]/20 text-sm bg-[#FAF8F5] w-64 max-w-full"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-[#5E332E]/20 text-sm bg-[#FAF8F5]"
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button
            onClick={load}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-[#5E332E] text-[#E5E2DC] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {error && <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}

      {!error && !loading && filtered.length === 0 && (
        <div className="bg-white p-10 rounded-3xl border border-[#5E332E]/15 text-center text-sm text-[#1E1B18]/60">
          {reservations.length === 0 ? 'No reservations yet.' : 'No reservations match your filters.'}
        </div>
      )}

      {filtered.length > 0 && (
        <div className="bg-white rounded-3xl border border-[#5E332E]/15 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] uppercase tracking-wider text-[#5E332E] bg-[#FAF8F5]">
              <tr>
                <th className="px-4 py-3">Guest</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Date &amp; time</th>
                <th className="px-4 py-3">Party</th>
                <th className="px-4 py-3">Notes</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Received</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => {
                const status = r.status || 'pending'
                return (
                  <tr key={r._id} className="border-t border-[#5E332E]/10 align-top">
                    <td className="px-4 py-3 font-semibold text-[#1E1B18]">{r.name}</td>
                    <td className="px-4 py-3">
                      <a href={`tel:${r.phone}`} className="block text-[#5E332E] hover:underline">{r.phone}</a>
                      {r.email && <a href={`mailto:${r.email}`} className="block text-xs text-[#1E1B18]/70 hover:underline">{r.email}</a>}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {r.date}
                      <span className="block text-xs text-[#1E1B18]/70">{r.time}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {r.guests} {Number(r.guests) === 1 ? 'guest' : 'guests'}
                      {r.seatingPreference && <span className="block text-xs text-[#1E1B18]/70">{r.seatingPreference}</span>}
                    </td>
                    <td className="px-4 py-3 max-w-xs text-[#1E1B18]/80">{r.notes || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider ${STATUS_STYLES[status] || STATUS_STYLES.pending}`}>
                        {status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-[#1E1B18]/70">{formatReceived(r.createdAt)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
