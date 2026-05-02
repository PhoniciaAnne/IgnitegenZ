import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './Learning.module.css'

const masterclasses = [
  { icon: '👑', speaker: 'Vasudeva Vangara', topic: 'Zero to MVP in 90 Days', date: 'Every 1st Saturday', seats: 24 },
  { icon: '🌱', speaker: 'Dr. Tinoo Ubale', topic: 'Building a Sustainable Startup', date: 'Every 2nd Saturday', seats: 18 },
  { icon: '📚', speaker: 'Abhay Prajapati', topic: 'EdTech & Social Innovation', date: 'Every 3rd Saturday', seats: 20 },
  { icon: '💡', speaker: 'Guest Founder Series', topic: 'Founder Stories & Lessons', date: 'Every 4th Saturday', seats: 50 },
]

const liveSessions = [
  { day: 'Mon', title: 'Ask Me Anything: Startup Operations', host: 'Mentorship Team', time: '7:00 PM IST' },
  { day: 'Wed', title: 'Pitch Practice Workshop', host: 'Coaches Panel', time: '6:30 PM IST' },
  { day: 'Fri', title: 'Industry Expert Talk', host: 'Guest Speaker', time: '6:00 PM IST' },
  { day: 'Sun', title: 'Founders Circle Meetup', host: 'Community Lead', time: '11:00 AM IST' },
]

const CATEGORIES = ['All', 'Foundation', 'Strategy', 'Finance', 'Technology', 'Marketing', 'Sustainability']

const levelColors = {
  Beginner: { bg: '#d1fae5', color: '#059669' },
  Intermediate: { bg: '#dbeafe', color: '#2563eb' },
  Advanced: { bg: '#fef3c7', color: '#d97706' },
}

export default function Learning() {
  const [courses, setCourses] = useState([])
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (category !== 'All') params.append('category', category)
    axios.get(`/api/courses/?${params}`)
      .then(r => setCourses(r.data))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false))
  }, [category])

  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-content container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>Education Hub</span>
          <h1>Learn. Build. <em style={{ fontStyle: 'normal', color: '#c084fc' }}>Succeed.</em></h1>
          <p>Free entrepreneurship courses designed for ambitious student founders — certified, practical, and 100% free.</p>
        </div>
      </div>

      {/* Live Sessions */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="section-tag">Live Lectures</span>
            <h2 className="section-title">Weekly <span>Live Sessions</span></h2>
            <p className="section-subtitle">Join live interactive sessions every week with practitioners building real companies.</p>
          </div>
          <div className={styles.liveGrid}>
            {liveSessions.map((s, i) => (
              <div key={i} className={`card ${styles.liveCard}`}>
                <div className={styles.liveDay}>{s.day}</div>
                <div className={styles.liveInfo}>
                  <h3>{s.title}</h3>
                  <p>{s.host}</p>
                  <span className={styles.liveTime}>🕐 {s.time}</span>
                </div>
                <button className={`btn-primary ${styles.liveBtn}`}>Join Live</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Courses */}
      <section className={`${styles.section} ${styles.sectionBg}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="section-tag">Free Certified Courses</span>
            <h2 className="section-title">Start Learning <span>For Free</span></h2>
            <p className="section-subtitle">
              {courses.length > 0 ? `${courses.length} free courses available` : 'Curated courses across all entrepreneurship domains'} — earn certificates, build skills, launch faster.
            </p>
          </div>

          {/* Category Filter */}
          <div className={styles.filters}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${category === cat ? styles.active : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading courses...</p>
            </div>
          ) : courses.length === 0 ? (
            <div className={styles.empty}><p>No courses found for this category.</p></div>
          ) : (
            <div className={styles.coursesGrid}>
              {courses.map(c => {
                const lvl = levelColors[c.level] || levelColors.Beginner
                return (
                  <div key={c.id} className={`card ${styles.courseCard}`}>
                    <div className={styles.courseTop}>
                      <span className={styles.courseIcon}>{c.icon}</span>
                      <span className={styles.freeBadge}>FREE</span>
                    </div>

                    <div className={styles.courseMeta}>
                      <span className={styles.courseCategory}>{c.category}</span>
                      <span className={styles.courseLevel} style={{ background: lvl.bg, color: lvl.color }}>{c.level}</span>
                    </div>

                    <h3 className={styles.courseTitle}>{c.title}</h3>
                    <p className={styles.courseDesc}>{c.desc}</p>

                    <div className={styles.courseTopics}>
                      {c.topics.slice(0, 3).map(t => (
                        <span key={t} className={styles.topicTag}>{t}</span>
                      ))}
                    </div>

                    <div className={styles.courseStats}>
                      <span>⏱ {c.duration}</span>
                      <span>📖 {c.lessons} lessons</span>
                      <span>👥 {c.students.toLocaleString()}</span>
                    </div>

                    <div className={styles.courseFooter}>
                      {c.certified && <span className={styles.certBadge}>✓ Certificate</span>}
                      <div className={styles.courseRating}>⭐ {c.rating}</div>
                    </div>

                    <a
                      href={c.link}
                      target="_blank"
                      rel="noreferrer"
                      className={`btn-primary ${styles.enrollBtn}`}
                    >
                      Enroll Free →
                    </a>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Master Classes */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="section-tag">Master Classes</span>
            <h2 className="section-title">Deep-Dive <span>Master Classes</span></h2>
            <p className="section-subtitle">Intensive monthly sessions led by our coaches. Limited seats for maximum interaction.</p>
          </div>
          <div className={styles.masterGrid}>
            {masterclasses.map((m, i) => (
              <div key={i} className={`card ${styles.masterCard}`}>
                <div className={styles.masterIcon}>{m.icon}</div>
                <div className={styles.masterContent}>
                  <h3>{m.topic}</h3>
                  <p className={styles.masterSpeaker}>with {m.speaker}</p>
                  <div className={styles.masterMeta}>
                    <span>📅 {m.date}</span>
                    <span>👥 {m.seats} seats only</span>
                  </div>
                </div>
                <button className="btn-outline">Reserve Seat</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
