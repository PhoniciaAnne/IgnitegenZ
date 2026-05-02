import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './Mentorship.module.css'

const categoryColors = {
  Technology: { bg: '#ede9fe', color: '#6930c3', badge: 'badge-tech' },
  Sustainability: { bg: '#d1fae5', color: '#059669', badge: 'badge-sustain' },
  Education: { bg: '#dbeafe', color: '#2563eb', badge: 'badge-edu' },
}

export default function Mentorship() {
  const [mentors, setMentors] = useState([])
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get(`/api/mentors${category !== 'All' ? `?category=${category}` : ''}`)
      .then(r => setMentors(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [category])

  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-content container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>Mentorship Portal</span>
          <h1>Learn from <em style={{ fontStyle: 'normal', color: '#c084fc' }}>Experts</em></h1>
          <p>Browse our directory of experienced coaches and mentors ready to guide your entrepreneurship journey.</p>
        </div>
      </div>

      <section className={styles.section}>
        <div className="container">
          {/* Filters */}
          <div className={styles.filters}>
            {['All', 'Technology', 'Sustainability', 'Education'].map(cat => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${category === cat ? styles.active : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat === 'All' && '🌐 '}
                {cat === 'Technology' && '💻 '}
                {cat === 'Sustainability' && '🌿 '}
                {cat === 'Education' && '📚 '}
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading mentors...</p>
            </div>
          ) : (
            <div className={styles.mentorsGrid}>
              {mentors.map(mentor => {
                const style = categoryColors[mentor.category] || categoryColors.Technology
                return (
                  <div key={mentor.id} className={`card ${styles.mentorCard}`}>
                    <div className={styles.mentorTop}>
                      <div className={styles.avatar} style={{ background: style.bg }}>
                        <span style={{ color: style.color, fontSize: 32, fontWeight: 800 }}>
                          {mentor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <span className={`badge ${style.badge}`}>{mentor.category}</span>
                    </div>
                    <div className={styles.mentorInfo}>
                      <h3>{mentor.name}</h3>
                      <p className={styles.mentorTitle}>{mentor.title}</p>
                      <p className={styles.mentorBio}>{mentor.bio}</p>
                    </div>
                    {mentor.expertise?.length > 0 && (
                      <div className={styles.expertise}>
                        {mentor.expertise.slice(0, 3).map(e => (
                          <span key={e} className={styles.expertiseTag}>{e}</span>
                        ))}
                      </div>
                    )}
                    <div className={styles.mentorActions}>
                      <a href={mentor.linkedin_url || '#'} className="btn-primary" style={{ fontSize: 13, padding: '10px 20px' }}>
                        Connect
                      </a>
                      <button className="btn-outline" style={{ fontSize: 13, padding: '9px 18px' }}>
                        Book Session
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Become Mentor CTA */}
      <section className={styles.becomeMentor}>
        <div className="container">
          <div className={styles.becomeBox}>
            <div>
              <h2>Are you an expert in your field?</h2>
              <p>Join our mentor community and help shape the next generation of Indian entrepreneurs.</p>
            </div>
            <a href="/contact" className="btn-primary">Become a Mentor</a>
          </div>
        </div>
      </section>
    </div>
  )
}
