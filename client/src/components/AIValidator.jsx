import { useState } from 'react'
import axios from 'axios'
import styles from './AIValidator.module.css'

export default function AIValidator() {
  const [idea, setIdea] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const validate = async () => {
    if (!idea.trim() || idea.trim().length < 10) {
      setError('Please describe your idea in at least 10 characters.')
      return
    }
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await axios.post('/api/ai/validate', { idea })
      setResult(res.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const scoreColor = result
    ? result.feasibility_score >= 70 ? '#059669'
      : result.feasibility_score >= 40 ? '#d97706' : '#dc2626'
    : '#6930c3'

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputBox}>
        <div className={styles.inputLabel}>
          <span>✨</span>
          <span>Describe your startup idea</span>
        </div>
        <textarea
          className={styles.textarea}
          placeholder="e.g. An AI-powered platform that connects rural farmers directly with urban consumers, eliminating middlemen and ensuring fair prices through blockchain-based smart contracts..."
          value={idea}
          onChange={e => setIdea(e.target.value)}
          rows={5}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button
          className={styles.validateBtn}
          onClick={validate}
          disabled={loading}
        >
          {loading ? (
            <span className={styles.loadingRow}>
              <span className={styles.spinner}></span>
              Analysing your idea...
            </span>
          ) : '🚀 Validate My Idea'}
        </button>
      </div>

      {result && (
        <div className={styles.report}>
          <div className={styles.reportHeader}>
            <h3>Validation Report</h3>
            <div className={styles.scoreBox}>
              <div className={styles.scoreFill} style={{ '--pct': `${result.feasibility_score}%`, '--clr': scoreColor }}>
                <span style={{ color: scoreColor }}>{result.feasibility_score}</span>
                <small>/100</small>
              </div>
              <p>Feasibility</p>
            </div>
          </div>

          <div className={styles.reportGrid}>
            {[
              { icon: '🎯', label: 'Problem', text: result.problem, color: '#6930c3' },
              { icon: '💡', label: 'Solution', text: result.solution, color: '#7b2fff' },
              { icon: '📊', label: 'Market Analysis', text: result.market_analysis, color: '#4c1aab' },
              { icon: '⚡', label: 'Value Proposition', text: result.value_proposition, color: '#9b5bff' },
            ].map(item => (
              <div key={item.label} className={styles.reportCard} style={{ borderTopColor: item.color }}>
                <div className={styles.reportCardHeader}>
                  <span>{item.icon}</span>
                  <h4 style={{ color: item.color }}>{item.label}</h4>
                </div>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          {result.recommendations?.length > 0 && (
            <div className={styles.recommendations}>
              <h4>📋 Recommendations</h4>
              <ul>
                {result.recommendations.map((rec, i) => (
                  <li key={i}>
                    <span className={styles.recNum}>{i + 1}</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
