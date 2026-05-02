import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.brand}>
              <div className={styles.logoRow}>
                <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="14" fill="url(#footerLogoGrad)"/>
                  <path d="M8 14 L14 8 L20 14 L14 20 Z" fill="white" opacity="0.9"/>
                  <circle cx="14" cy="14" r="3" fill="white"/>
                  <defs>
                    <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="28" y2="28">
                      <stop offset="0%" stopColor="#6930c3"/>
                      <stop offset="100%" stopColor="#7b2fff"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span className={styles.logoText}>IgniteZen</span>
              </div>
              <p className={styles.tagline}>Together We Thrive</p>
              <p className={styles.desc}>
                A virtual pre-incubation platform empowering ambitious student entrepreneurs to transform ideas into impactful ventures.
              </p>
            </div>

            <div className={styles.linksCol}>
              <h4>Platform</h4>
              <ul>
                <li><Link to="/learning">Learning Hub</Link></li>
                <li><Link to="/mentorship">Mentorship</Link></li>
                <li><Link to="/networking">Networking</Link></li>
                <li><Link to="/funding">Funding</Link></li>
              </ul>
            </div>

            <div className={styles.linksCol}>
              <h4>Company</h4>
              <ul>
                <li><Link to="/">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>

            <div className={styles.linksCol}>
              <h4>Connect</h4>
              <ul>
                <li><a href="#">LinkedIn</a></li>
                <li><a href="#">Twitter / X</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="mailto:hello@ignitezen.in">hello@ignitezen.in</a></li>
                <li><a href="/admin">Admin Panel</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className="container">
          <p>© {new Date().getFullYear()} IgniteZen. All rights reserved. Built for ambitious entrepreneurs.</p>
        </div>
      </div>
    </footer>
  )
}
