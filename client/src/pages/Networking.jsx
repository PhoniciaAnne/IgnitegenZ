import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './Networking.module.css'

const typeIcons = {
  'Co-working Space': '🏢',
  'University Lab': '🔬',
  'Research Lab': '⚗️',
}

export default function Networking() {
  const [institutes, setInstitutes] = useState([])
  const [city, setCity] = useState('All')
  const [search, setSearch] = useState('')
  const [cities, setCities] = useState(['All'])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/institutes/cities').then(r => setCities(r.data)).catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (city !== 'All') params.append('city', city)
    if (search) params.append('search', search)
    axios.get(`/api/institutes/?${params}`)
      .then(r => setInstitutes(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [city, search])

  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-content container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>Networking</span>
          <h1>Find Your <em style={{ fontStyle: 'normal', color: '#c084fc' }}>Space</em></h1>
          <p>Discover partnered labs, co-working spaces, and innovation centres near you. Build your startup in an ecosystem that supports you.</p>
        </div>
      </div>

      <section className={styles.section}>
        <div className="container">
          {/* Search & Filter */}
          <div className={styles.searchRow}>
            <div className={styles.searchBox}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search by name, area, or keyword..."
                className={styles.searchInput}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select
              className={styles.citySelect}
              value={city}
              onChange={e => setCity(e.target.value)}
            >
              {cities.map(c => <option key={c} value={c}>{c === 'All' ? 'All Cities' : c}</option>)}
            </select>
          </div>

          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading institutes...</p>
            </div>
          ) : institutes.length === 0 ? (
            <div className={styles.empty}>
              <p>🔎 No institutes found for your search. Try different keywords or city.</p>
            </div>
          ) : (
            <div className={styles.institutesGrid}>
              {institutes.map(inst => (
                <div key={inst.id} className={`card ${styles.instituteCard}`}>
                  <div className={styles.instTop}>
                    <div className={styles.instIcon}>{typeIcons[inst.type] || '🏛️'}</div>
                    <span className={styles.instType}>{inst.type}</span>
                  </div>
                  <div className={styles.instInfo}>
                    <h3>{inst.name}</h3>
                    <p className={styles.instLocation}>
                      📍 {inst.area}, {inst.city}
                    </p>
                    <p className={styles.instDesc}>{inst.description}</p>
                  </div>
                  {inst.facilities?.length > 0 && (
                    <div className={styles.facilities}>
                      {inst.facilities.map(f => (
                        <span key={f} className={styles.facilityTag}>{f}</span>
                      ))}
                    </div>
                  )}
                  <div className={styles.instActions}>
                    {inst.contact_email && (
                      <a href={`mailto:${inst.contact_email}`} className="btn-primary" style={{ fontSize: 13, padding: '10px 18px' }}>
                        Contact
                      </a>
                    )}
                    {inst.website && inst.website !== '#' && (
                      <a href={inst.website} target="_blank" rel="noreferrer" className="btn-outline" style={{ fontSize: 13, padding: '9px 16px' }}>
                        Visit Website
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Community Section */}
      <section className={styles.communitySection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="section-tag">Community</span>
            <h2 className="section-title">Join Our <span>Founder Community</span></h2>
            <p className="section-subtitle">Connect with 500+ student entrepreneurs, co-founders, and early-stage builders across India. Collaborate, share, and grow together.</p>
          </div>
          <div className={styles.communityGrid}>
            {[
              { icon: '💬', title: 'Discussion Forums', desc: 'Topic-specific forums for every stage of your startup journey.' },
              { icon: '🤝', title: 'Co-founder Matching', desc: 'Find complementary co-founders with our skill-based matching system.' },
              { icon: '🎉', title: 'Demo Days', desc: 'Monthly demo days to showcase your MVP to peers and mentors.' },
              { icon: '🏆', title: 'Startup Competitions', desc: 'Compete, learn, and win prizes at our quarterly hackathons.' },
            ].map((item, i) => (
              <div key={i} className={`card ${styles.communityCard}`}>
                <div className={styles.commIcon}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
