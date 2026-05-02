import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import styles from './Admin.module.css'

export default function Admin() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const [deleting, setDeleting] = useState(null)
  const [search, setSearch] = useState('')

  const fetchLeads = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    try {
      const res = await axios.get('/api/leads/')
      setLeads(res.data)
      setLastRefresh(new Date())
    } catch (e) {}
    finally { setLoading(false) }
  }, [])

  useEffect(() => {
    fetchLeads()
    const interval = setInterval(() => fetchLeads(true), 15000)
    return () => clearInterval(interval)
  }, [fetchLeads])

  const deleteLead = async (id) => {
    if (!window.confirm('Delete this submission?')) return
    setDeleting(id)
    try {
      await axios.delete(`/api/leads/${id}`)
      setLeads(l => l.filter(x => x.id !== id))
    } catch (e) {}
    finally { setDeleting(null) }
  }

  const filtered = leads.filter(l =>
    !search || l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase()) ||
    l.problem_statement.toLowerCase().includes(search.toLowerCase())
  )

  const timeAgo = (dateStr) => {
    if (!dateStr) return 'Unknown'
    const diff = Math.floor((new Date() - new Date(dateStr)) / 1000)
    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className="container">
          <div className={styles.headerInner}>
            <div>
              <h1>Admin Dashboard</h1>
              <p>Live idea submissions from IgniteZen — auto-refreshes every 15 seconds</p>
            </div>
            <div className={styles.headerRight}>
              <div className={styles.liveIndicator}>
                <span className={styles.liveDot}></span>
                Live
              </div>
              <button className={styles.refreshBtn} onClick={() => fetchLeads()}>
                ↻ Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Stats row */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <span className={styles.statNum}>{leads.length}</span>
            <span className={styles.statLbl}>Total Submissions</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNum}>
              {leads.filter(l => {
                const d = new Date(l.created_at)
                return !isNaN(d) && (new Date() - d) < 86400000
              }).length}
            </span>
            <span className={styles.statLbl}>Today</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNum}>
              {leads.filter(l => {
                const d = new Date(l.created_at)
                return !isNaN(d) && (new Date() - d) < 604800000
              }).length}
            </span>
            <span className={styles.statLbl}>This Week</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNum} style={{ fontSize: 14, color: '#6b7280' }}>
              {lastRefresh.toLocaleTimeString()}
            </span>
            <span className={styles.statLbl}>Last Refreshed</span>
          </div>
        </div>

        {/* Search */}
        <div className={styles.toolbar}>
          <div className={styles.searchWrap}>
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search by name, email, or idea..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <span className={styles.countLabel}>{filtered.length} submission{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Content */}
        {loading ? (
          <div className={styles.center}>
            <div className={styles.spinner}></div>
            <p>Loading submissions...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📬</div>
            <h3>{leads.length === 0 ? 'No submissions yet' : 'No results found'}</h3>
            <p>{leads.length === 0
              ? 'When entrepreneurs submit their ideas via the Contact page, they will appear here in real time.'
              : 'Try a different search term.'}</p>
          </div>
        ) : (
          <div className={styles.leadsGrid}>
            {filtered.map(lead => (
              <div key={lead.id} className={styles.leadCard}>
                <div className={styles.leadHeader}>
                  <div className={styles.leadAvatar}>
                    {lead.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div className={styles.leadMeta}>
                    <h3>{lead.name}</h3>
                    <a href={`mailto:${lead.email}`} className={styles.leadEmail}>{lead.email}</a>
                  </div>
                  <div className={styles.leadActions}>
                    <span className={styles.timeAgo}>{timeAgo(lead.created_at)}</span>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => deleteLead(lead.id)}
                      disabled={deleting === lead.id}
                      title="Delete"
                    >
                      {deleting === lead.id ? '...' : '×'}
                    </button>
                  </div>
                </div>

                <div className={styles.leadBody}>
                  <div className={styles.leadSection}>
                    <div className={styles.sectionLabel}>
                      <span className={styles.dot} style={{ background: '#6930c3' }}></span>
                      Problem Statement
                    </div>
                    <p>{lead.problem_statement}</p>
                  </div>
                  <div className={styles.leadSection}>
                    <div className={styles.sectionLabel}>
                      <span className={styles.dot} style={{ background: '#059669' }}></span>
                      Proposed Solution
                    </div>
                    <p>{lead.solution}</p>
                  </div>
                </div>

                <div className={styles.leadFooter}>
                  <span className={styles.idBadge}>#{lead.id}</span>
                  <a href={`mailto:${lead.email}?subject=Re: Your IgniteZen Application`} className={styles.replyBtn}>
                    Reply via Email →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
