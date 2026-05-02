import styles from './Learning.module.css'

const courses = [
  { icon: '🚀', title: 'Entrepreneurship Fundamentals', category: 'Foundation', duration: '6 weeks', certified: true, level: 'Beginner', desc: 'Learn the core principles of building a startup — from idea generation to business model design.' },
  { icon: '💰', title: 'Startup Fundraising Mastery', category: 'Finance', duration: '4 weeks', certified: true, level: 'Intermediate', desc: 'Understand investor psychology, pitch decks, term sheets, and navigating the fundraising process.' },
  { icon: '🎯', title: 'Product-Market Fit', category: 'Strategy', duration: '5 weeks', certified: true, level: 'Intermediate', desc: 'Discover proven frameworks to validate your idea, find your early adopters, and achieve PMF.' },
  { icon: '🌿', title: 'Sustainable Business Design', category: 'Sustainability', duration: '4 weeks', certified: true, level: 'Beginner', desc: 'Build businesses that create positive environmental and social impact alongside profit.' },
  { icon: '📱', title: 'Digital Product Development', category: 'Technology', duration: '8 weeks', certified: true, level: 'Intermediate', desc: 'From wireframes to MVP — learn no-code and low-code tools to build your first product.' },
  { icon: '🤝', title: 'Startup Marketing & Growth', category: 'Marketing', duration: '5 weeks', certified: true, level: 'Beginner', desc: 'Growth hacking, content marketing, and community building strategies for early-stage startups.' },
]

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

export default function Learning() {
  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-content container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>Education Hub</span>
          <h1>Learn. Build. <em style={{ fontStyle: 'normal', color: '#c084fc' }}>Succeed.</em></h1>
          <p>World-class entrepreneurship education designed for ambitious student founders at every stage of the journey.</p>
        </div>
      </div>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="section-tag">Live Lectures</span>
            <h2 className="section-title">Weekly <span>Live Sessions</span></h2>
            <p className="section-subtitle">Join live interactive sessions every week. Ask questions, network with peers, and learn from practitioners building real companies.</p>
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

      <section className={`${styles.section} ${styles.sectionBg}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="section-tag">Certified Courses</span>
            <h2 className="section-title">Industry-Recognized <span>Certifications</span></h2>
            <p className="section-subtitle">Complete structured learning paths and earn certifications that prove your entrepreneurial skills to the world.</p>
          </div>
          <div className={styles.coursesGrid}>
            {courses.map((c, i) => (
              <div key={i} className={`card ${styles.courseCard}`}>
                <div className={styles.courseIcon}>{c.icon}</div>
                <div className={styles.courseMeta}>
                  <span className={styles.courseCategory}>{c.category}</span>
                  <span className={styles.courseLevel}>{c.level}</span>
                </div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <div className={styles.courseFooter}>
                  <span>⏱ {c.duration}</span>
                  {c.certified && <span className={styles.certBadge}>✓ Certificate</span>}
                </div>
                <button className={`btn-primary ${styles.courseBtn}`}>Enroll Free</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="section-tag">Master Classes</span>
            <h2 className="section-title">Deep-Dive <span>Master Classes</span></h2>
            <p className="section-subtitle">Intensive monthly sessions led by our coaches and serial entrepreneurs. Limited seats for maximum interaction.</p>
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
