import { Link } from 'react-router-dom'
import AIValidator from '../components/AIValidator'
import styles from './Home.module.css'

const stats = [
  { value: '500+', label: 'Student Entrepreneurs' },
  { value: '30+', label: 'Expert Mentors' },
  { value: '50+', label: 'Partner Institutes' },
  { value: '95%', label: 'Satisfaction Rate' },
]

const foundrySteps = [
  { icon: '💡', title: 'Idea Discovery', desc: 'Refine your raw idea into a clear problem statement and unique solution through structured workshops.' },
  { icon: '🔬', title: 'Validation', desc: 'Test your assumptions with real users, data, and our AI-powered startup validator tool.' },
  { icon: '🛠️', title: 'MVP Building', desc: 'Get hands-on support to build your minimum viable product with mentors and technical coaches.' },
  { icon: '🚀', title: 'Launch Support', desc: 'Connect with investors, pitch at demo days, and grow with our incubation network.' },
]

const eduCards = [
  { icon: '🎥', title: 'Live Lectures', color: '#6930c3', desc: 'Weekly live sessions with industry experts, founders, and domain specialists. Ask questions in real time.' },
  { icon: '🏆', title: 'Certified Courses', color: '#7b2fff', desc: 'Complete structured learning paths and earn industry-recognized certifications to boost your profile.' },
  { icon: '⭐', title: 'Master Classes', color: '#9b5bff', desc: 'Intensive deep-dive sessions led by serial entrepreneurs covering business model, fundraising, and scaling.' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroParticles}>
          {[...Array(6)].map((_, i) => <div key={i} className={styles.particle} style={{ '--i': i }}></div>)}
        </div>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroBadge}>Virtual Pre-Incubation Platform</div>
          <h1 className={styles.heroTitle}>
            Together <span>We Thrive</span>
          </h1>
          <p className={styles.heroSubtitle}>
            IgniteZen is where ambitious student entrepreneurs transform bold ideas into real ventures — with mentorship, education, community, and funding access.
          </p>
          <div className={styles.heroCta}>
            <Link to="/contact" className="btn-primary">Start Your Journey</Link>
            <Link to="/learning" className={styles.heroSecondary}>Explore Learning →</Link>
          </div>
        </div>
        <div className={styles.statsBar}>
          <div className="container">
            <div className={styles.statsGrid}>
              {stats.map(s => (
                <div key={s.label} className={styles.statItem}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founders Foundry */}
      <section className={styles.foundry} id="founders-foundry">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="section-tag">Founders Foundry</span>
            <h2 className="section-title">From Raw Idea to <span>Real MVP</span></h2>
            <p className="section-subtitle">
              Our signature Founders Foundry program guides you through every stage of the entrepreneurship journey — from that first spark of an idea to a product your customers love.
            </p>
          </div>
          <div className={styles.foundryGrid}>
            {foundrySteps.map((step, i) => (
              <div key={i} className={`card ${styles.foundryCard}`}>
                <div className={styles.foundryStep}>{String(i + 1).padStart(2, '0')}</div>
                <div className={styles.foundryIcon}>{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Hub */}
      <section className={styles.education} id="education-hub">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="section-tag">Education Hub</span>
            <h2 className="section-title">Learn. Grow. <span>Lead.</span></h2>
            <p className="section-subtitle">
              Access world-class entrepreneurship education designed specifically for student innovators at every stage of their journey.
            </p>
          </div>
          <div className={styles.eduGrid}>
            {eduCards.map((card, i) => (
              <div key={i} className={`card ${styles.eduCard}`}>
                <div className={styles.eduIcon} style={{ background: `${card.color}18` }}>
                  <span style={{ fontSize: 36 }}>{card.icon}</span>
                </div>
                <h3 style={{ color: card.color }}>{card.title}</h3>
                <p>{card.desc}</p>
                <Link to="/learning" className={styles.eduLink} style={{ color: card.color }}>
                  Explore →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Validator */}
      <section className={styles.aiSection} id="ai-validator">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="section-tag">AI Feature</span>
            <h2 className="section-title">Validate Your <span>Startup Idea</span></h2>
            <p className="section-subtitle">
              Enter your business idea and our AI will generate a structured validation report covering Problem, Solution, Market Analysis, and Value Proposition — instantly.
            </p>
          </div>
          <AIValidator />
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <div className={styles.ctaGlow}></div>
            <h2>Ready to Build Something <span>Extraordinary?</span></h2>
            <p>Join hundreds of student entrepreneurs who are turning ideas into impact with IgniteZen.</p>
            <div className={styles.ctaBtns}>
              <Link to="/contact" className="btn-primary">Apply Now</Link>
              <Link to="/mentorship" className="btn-outline">Meet Our Mentors</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
