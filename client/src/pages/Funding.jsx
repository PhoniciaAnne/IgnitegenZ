import { Link } from 'react-router-dom'
import styles from './Funding.module.css'

const fundingTypes = [
  { icon: '🌱', title: 'Pre-Seed Grants', range: '₹1L – ₹10L', desc: 'Non-dilutive grants for early-stage student startups to build and validate their MVP.', color: '#059669' },
  { icon: '🦄', title: 'Angel Investors', range: '₹10L – ₹1Cr', desc: 'Warm introductions to our network of 50+ angel investors actively seeking student-led startups.', color: '#6930c3' },
  { icon: '🏛️', title: 'Govt. Schemes', range: 'Various', desc: 'Guided support to apply for Startup India, BIRAC, NIDHI, and other government funding schemes.', color: '#2563eb' },
  { icon: '🌍', title: 'Impact Funds', range: '₹25L – ₹5Cr', desc: 'Connections to impact-focused investors looking for sustainable and social impact startups.', color: '#d97706' },
]

const stages = [
  { number: '01', title: 'Idea Validation', desc: 'Prove your concept works. We help you run structured experiments and collect real user feedback.' },
  { number: '02', title: 'MVP Development', desc: 'Build a minimum viable product that demonstrates core value to early adopters and investors.' },
  { number: '03', title: 'Pitch Preparation', desc: 'Craft a compelling pitch deck, financial projections, and investor narrative with our coaches.' },
  { number: '04', title: 'Investor Introductions', desc: 'Get warm introductions to the right investors through our curated network and demo days.' },
  { number: '05', title: 'Due Diligence Support', desc: 'Guided support through the due diligence process to close your round with confidence.' },
  { number: '06', title: 'Post-Funding Growth', desc: 'Ongoing mentorship and community support as you scale your funded startup.' },
]

const resources = [
  { icon: '📋', title: 'Pitch Deck Templates', desc: 'Battle-tested templates used by funded startups' },
  { icon: '💹', title: 'Financial Model Guides', desc: 'Step-by-step guides to build investor-ready models' },
  { icon: '⚖️', title: 'Term Sheet Explainer', desc: 'Plain-English breakdowns of VC term sheets' },
  { icon: '🗓️', title: 'Investor Calendar', desc: 'Monthly curated list of active investors in India' },
]

export default function Funding() {
  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-content container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>Funding Access</span>
          <h1>Fund Your <em style={{ fontStyle: 'normal', color: '#c084fc' }}>Vision</em></h1>
          <p>Navigate the funding landscape with guided support, investor introductions, and access to grants and equity funding programs.</p>
        </div>
      </div>

      {/* Funding Types */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="section-tag">Funding Options</span>
            <h2 className="section-title">Multiple Paths to <span>Capital</span></h2>
            <p className="section-subtitle">We connect you to the right type of funding for your startup stage — from early grants to institutional investors.</p>
          </div>
          <div className={styles.fundingGrid}>
            {fundingTypes.map((f, i) => (
              <div key={i} className={`card ${styles.fundingCard}`}>
                <div className={styles.fundIcon} style={{ background: `${f.color}15` }}>
                  <span>{f.icon}</span>
                </div>
                <h3>{f.title}</h3>
                <div className={styles.fundRange} style={{ color: f.color }}>{f.range}</div>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className={`${styles.section} ${styles.sectionBg}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="section-tag">Our Process</span>
            <h2 className="section-title">From Idea to <span>Funded</span></h2>
            <p className="section-subtitle">A structured 6-stage process that takes you from raw idea to secured funding with expert support at each step.</p>
          </div>
          <div className={styles.stagesGrid}>
            {stages.map((s, i) => (
              <div key={i} className={`card ${styles.stageCard}`}>
                <div className={styles.stageNum}>{s.number}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="section-tag">Free Resources</span>
            <h2 className="section-title">Funding <span>Toolkit</span></h2>
            <p className="section-subtitle">Free resources to help you prepare for fundraising — no experience required.</p>
          </div>
          <div className={styles.resourcesGrid}>
            {resources.map((r, i) => (
              <div key={i} className={`card ${styles.resourceCard}`}>
                <span className={styles.resourceIcon}>{r.icon}</span>
                <div>
                  <h4>{r.title}</h4>
                  <p>{r.desc}</p>
                </div>
                <button className="btn-outline" style={{ fontSize: 13, padding: '9px 18px', whiteSpace: 'nowrap' }}>
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Ready to Raise Your First Round?</h2>
            <p>Apply to Ignite Zen and get personalized fundraising support from day one.</p>
            <Link to="/contact" className="btn-primary">Apply for Funding Support</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
