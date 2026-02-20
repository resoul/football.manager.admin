import { useCallback, useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''
const ADMIN_AUTH_BASE = `${API_BASE}/admin/auth`
const ADMIN_USERS_BASE = `${API_BASE}/admin/users`
const TOKEN_KEY = 'fm-admin-auth-token'

type AdminUser = {
  id: number
  uuid: string
  full_name: string
  email: string
  email_verified: boolean
  email_verified_at?: number
  created_at: number
  updated_at: number
}

type UsersResponse = {
  users: AdminUser[]
  total: number
  page: number
  page_size: number
}

type Page = 'dashboard' | 'users'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [role, setRole] = useState('')
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')
  const [users, setUsers] = useState<AdminUser[]>([])
  const [usersTotal, setUsersTotal] = useState(0)
  const [usersPage, setUsersPage] = useState(1)
  const [usersLoading, setUsersLoading] = useState(false)
  const [usersError, setUsersError] = useState('')
  const tokenRef = useRef<string>('')

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY) ?? ''
    if (stored) {
      tokenRef.current = stored
      void checkAdminAuth(stored)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function parseResponse(response: Response): Promise<unknown> {
    const contentType = response.headers.get('content-type') ?? ''
    if (contentType.includes('application/json')) return response.json()
    const text = await response.text()
    return text ? { message: text } : {}
  }

  function extractError(payload: unknown, fallback: string): string {
    if (!payload || typeof payload !== 'object') return fallback
    const p = payload as Record<string, unknown>
    if (typeof p.message === 'string' && p.message.trim()) return p.message
    if (typeof p.error === 'string' && p.error.trim()) return p.error
    return fallback
  }

  async function checkAdminAuth(token: string) {
    try {
      const response = await fetch(`${ADMIN_AUTH_BASE}/check`, {
        method: 'GET',
        credentials: 'include',
        headers: { Authorization: `Bearer ${token}` },
      })
      const payload = (await parseResponse(response)) as { status?: string; role?: string }
      if (!response.ok || payload.status !== 'ok') {
        localStorage.removeItem(TOKEN_KEY)
        tokenRef.current = ''
        setAuthenticated(false)
        return
      }
      setAuthenticated(true)
      setRole(payload.role ?? '')
    } catch {
      setAuthenticated(false)
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await fetch(`${ADMIN_AUTH_BASE}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const payload = (await parseResponse(response)) as { token?: string; role?: string; message?: string }
      if (!response.ok || !payload.token) {
        setError(extractError(payload, 'Login failed'))
        return
      }
      localStorage.setItem(TOKEN_KEY, payload.token)
      tokenRef.current = payload.token
      setAuthenticated(true)
      setRole(payload.role ?? '')
      setEmail('')
      setPassword('')
    } catch {
      setError('Network error. Check API availability.')
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    tokenRef.current = ''
    setAuthenticated(false)
    setRole('')
    setCurrentPage('dashboard')
    setUsers([])
  }

  const fetchUsers = useCallback(async (page: number) => {
    setUsersLoading(true)
    setUsersError('')
    try {
      const response = await fetch(`${ADMIN_USERS_BASE}?page=${page}&page_size=20`, {
        headers: { Authorization: `Bearer ${tokenRef.current}` },
        credentials: 'include',
      })
      const payload = (await parseResponse(response)) as UsersResponse
      if (!response.ok) {
        setUsersError(extractError(payload, 'Failed to load users'))
        return
      }
      setUsers(payload.users ?? [])
      setUsersTotal(payload.total ?? 0)
      setUsersPage(payload.page ?? page)
    } catch {
      setUsersError('Failed to load users')
    } finally {
      setUsersLoading(false)
    }
  }, [])

  useEffect(() => {
    if (authenticated && currentPage === 'users') {
      void fetchUsers(usersPage)
    }
  }, [authenticated, currentPage, usersPage, fetchUsers])

  function handleNavUsers() {
    setCurrentPage('users')
    setUsersPage(1)
  }

  const totalPages = Math.max(1, Math.ceil(usersTotal / 20))

  if (!authenticated) {
    return (
      <main className="page">
        <section className="card login-card">
          <div className="login-logo">
            <span className="logo-icon">⚽</span>
            <h1>FM Admin</h1>
            <p className="muted">Football Manager Control Panel</p>
          </div>

          <form onSubmit={onSubmit} className="form">
            <label>
              Email
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                placeholder="admin@example.com"
              />
            </label>
            <label>
              Password
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
              />
            </label>
            {error && <p className="err">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </section>
      </main>
    )
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="logo-icon">⚽</span>
          <span>FM Admin</span>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('dashboard')}
          >
            <span className="nav-icon">📊</span> Dashboard
          </button>
          <button
            className={`nav-item ${currentPage === 'users' ? 'active' : ''}`}
            onClick={handleNavUsers}
          >
            <span className="nav-icon">👥</span> Users
          </button>
        </nav>
        <div className="sidebar-footer">
          <div className="user-badge">
            <span className="badge-role">{role}</span>
          </div>
          <button className="nav-item logout-btn" onClick={logout}>
            <span className="nav-icon">🚪</span> Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        {currentPage === 'dashboard' && (
          <div className="page-content">
            <header className="page-header">
              <h2>Dashboard</h2>
            </header>
            <div className="stats-grid">
              <div className="stat-card" onClick={handleNavUsers}>
                <div className="stat-icon">👥</div>
                <div className="stat-label">Manage Users</div>
                <div className="stat-sub">View all registered users →</div>
              </div>
              <div className="stat-card info">
                <div className="stat-icon">🔐</div>
                <div className="stat-label">Admin Session</div>
                <div className="stat-sub">Role: {role}</div>
              </div>
              <div className="stat-card info">
                <div className="stat-icon">🌐</div>
                <div className="stat-label">API</div>
                <div className="stat-sub" title={API_BASE}>{API_BASE.replace('http://', '').replace('https://', '').split('/')[0]}</div>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'users' && (
          <div className="page-content">
            <header className="page-header">
              <h2>Users</h2>
              <span className="badge-count">{usersTotal} total</span>
            </header>

            {usersLoading && <div className="loading-row">Loading…</div>}
            {usersError && <p className="err">{usersError}</p>}

            {!usersLoading && !usersError && (
              <>
                <div className="table-wrap">
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Verified</th>
                        <th>Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 ? (
                        <tr key="empty">
                          <td colSpan={5} className="empty-row">No users found</td>
                        </tr>
                      ) : users.map((u) => (
                        <tr key={u.id}>
                          <td className="col-id">{u.id}</td>
                          <td>{u.full_name}</td>
                          <td className="col-email">{u.email}</td>
                          <td>
                            <span className={`verified-badge ${u.email_verified ? 'yes' : 'no'}`}>
                              {u.email_verified ? '✓' : '✗'}
                            </span>
                          </td>
                          <td className="col-date">{new Date(u.created_at * 1000).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pagination">
                  <button
                    disabled={usersPage <= 1}
                    onClick={() => setUsersPage((p) => p - 1)}
                    className="page-btn"
                  >
                    ← Prev
                  </button>
                  <span className="page-info">Page {usersPage} of {totalPages}</span>
                  <button
                    disabled={usersPage >= totalPages}
                    onClick={() => setUsersPage((p) => p + 1)}
                    className="page-btn"
                  >
                    Next →
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
