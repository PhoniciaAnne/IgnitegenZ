import { useState } from 'react'
import axios from 'axios'
import styles from './Contact.module.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', problem_statement: '', solution: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.problem_statement.trim()) e.problem_statement = 'Please describe the problem'
    if (!form.solution.trim()) e.solution = 'Please describe your solution'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  const submit = async e => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setStatus(null)
    try {
      const res = await axios.post('/api/leads/', form)
      setStatus({ type: 'success', msg: res.data.message })
      setForm({ name: '', email: '', problem_statement: '', solution: '' })
    } catch (err) {
      setStatus({ type: 'error', msg: 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    { icon: '📧', label: 'Email', value: 'hello@ignitezen.in' },
    { icon: '🌐', label: 'Website', value: 'www.ignitezen.in' },
    { icon: '📍', label: 'Location', value: 'India (Virtual Platform)' },
    { icon: '⏰', label: 'Response Time', value: 'Within 48 hours' },
  ]

  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-content container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>Contact Us</span>
          <h1>Share Your <em style={{ fontStyle: 'normal', color: '#c084fc' }}>Idea</em></h1>
          <p>Tell us about your startup idea and how we can help. Our team reviews every submission personally.</p>
        </div>
      </div>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.layout}>
            {/* Info */}
            <div className={styles.infoCol}>
              <h2>Let's Build Something Together</h2>
              <p className={styles.infoDesc}>
                Whether you have a fully-formed idea or just a hunch that something needs to change — we want to hear from you. Ignite Zen is built for ambitious thinkers like you.
              </p>

              <div className={styles.contactInfo}>
                {contactInfo.map((c, i) => (
                  <div key={i} className={styles.contactItem}>
                    <div className={styles.contactIcon}>{c.icon}</div>
                    <div>
                      <span className={styles.contactLabel}>{c.label}</span>
                      <span className={styles.contactValue}>{c.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.coaches}>
                <h4>Our Coaches</h4>
                <div className={styles.coachesList}>
                  {[
                    { name: 'Vasudeva Vangara', role: 'Startup Coach, VDC-GITAM' },
                    { name: 'Dr. Tinoo Ubale', role: 'Entrepreneurship Program Manager' },
                    { name: 'Abhay Prajapati', role: 'Startup Coach, AVC @ VDC, GITAM' },
                  ].map((c, i) => (
                    <div key={i} className={styles.coachItem}>
                      <div className={styles.coachAvatar}>
                        {c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className={styles.coachName}>{c.name}</p>
                        <p className={styles.coachRole}>{c.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className={styles.formCol}>
              <div className={styles.formCard}>
                <h3>Share Your Startup Idea</h3>
                <p className={styles.formNote}>Fill in this form and our team will reach out within 48 hours.</p>

                {status && (
                  <div className={`${styles.alert} ${status.type === 'success' ? styles.alertSuccess : styles.alertError}`}>
                    {status.type === 'success' ? '✅ ' : '❌ '}{status.msg}
                  </div>
                )}

                <form onSubmit={submit} className={styles.form} noValidate>
                  <div className={styles.formGroup}>
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      className={`input-field ${errors.name ? styles.inputError : ''}`}
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                    />
                    {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      className={`input-field ${errors.email ? styles.inputError : ''}`}
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label>Problem Statement *</label>
                    <textarea
                      name="problem_statement"
                      rows={4}
                      className={`input-field ${errors.problem_statement ? styles.inputError : ''}`}
                      placeholder="What problem are you solving? Who faces this problem?"
                      value={form.problem_statement}
                      onChange={handleChange}
                    />
                    {errors.problem_statement && <span className={styles.fieldError}>{errors.problem_statement}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label>Your Solution *</label>
                    <textarea
                      name="solution"
                      rows={4}
                      className={`input-field ${errors.solution ? styles.inputError : ''}`}
                      placeholder="How does your idea solve this problem? What makes it different?"
                      value={form.solution}
                      onChange={handleChange}
                    />
                    {errors.solution && <span className={styles.fieldError}>{errors.solution}</span>}
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', padding: '16px' }} disabled={loading}>
                    {loading ? '⏳ Submitting...' : '🚀 Submit My Idea'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
