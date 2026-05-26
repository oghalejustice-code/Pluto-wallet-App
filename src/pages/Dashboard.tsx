import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import './Dashboard.css'

interface PortfolioData {
  time: string
  value: number
}

const MOCK_CHART_DATA = [
  { time: '1D', value: 22000 },
  { time: '1D', value: 21500 },
  { time: '1D', value: 23000 },
  { time: '1D', value: 20800 },
  { time: '1D', value: 21200 },
  { time: '1D', value: 24500 },
  { time: '1D', value: 226881 },
]

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('1M')
  const [chartData] = useState<PortfolioData[]>(MOCK_CHART_DATA)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="dashboard">
      <div className="phone-frame">
        {/* Status Bar */}
        <div className="status-bar">
          <div className="status-left">08:49</div>
          <div className="status-right">
            <span className="signal">...</span>
            <span className="network">5G</span>
            <span className="battery">43%</span>
          </div>
        </div>

        {/* Header */}
        <div className="header-bar">
          <div className="header-left">
            <button className="icon-button">⟲</button>
            <span>Home</span>
          </div>
          <button className="icon-button">⋮</button>
        </div>

        {/* Top Bar with Title */}
        <div className="top-bar">
          <div className="menu-icon">☰</div>
          <h1>Pluto Wallet</h1>
          <div className="notification-icon">🔔</div>
        </div>

        {/* Balance Card */}
        <div className="balance-card">
          <div className="balance-header">
            <span className="balance-label">Total Balance</span>
            <button className="eye-icon">👁</button>
          </div>
          <div className="balance-amount">$0.00</div>
          <div className="balance-change">
            <span className="trend-up">📈 +0.00% ($0.00)</span>
            <span className="time-range">24h</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="action-btn">
            <div className="action-icon">↗</div>
            <span>Send</span>
          </button>
          <button className="action-btn">
            <div className="action-icon">↙</div>
            <span>Receive</span>
          </button>
          <button className="action-btn">
            <div className="action-icon">⇄</div>
            <span>Swap</span>
          </button>
          <button className="action-btn">
            <div className="action-icon">➕</div>
            <span>Buy</span>
          </button>
        </div>

        {/* Portfolio Performance */}
        <div className="portfolio-section">
          <div className="portfolio-header">
            <h2>Portfolio<br />Performance</h2>
            <div className="time-range-buttons">
              {['1D', '1W', '1M', '3M', '1Y'].map(range => (
                <button
                  key={range}
                  className={`time-btn ${timeRange === range ? 'active' : ''}`}
                  onClick={() => setTimeRange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(51, 65, 85, 0.2)" />
                <XAxis dataKey="time" stroke="transparent" />
                <YAxis stroke="transparent" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(51, 65, 85, 0.5)',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#cbd5e1' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="chart-value">$226,881.14</div>
          </div>
        </div>

        {/* Allocation Section */}
        <div className="allocation-label">Allocation</div>

        {/* Bottom Navigation */}
        <div className="bottom-nav">
          <button className="nav-item active">🏠 Home</button>
          <button className="nav-item">📦 Apps</button>
          <button className="nav-item">📋 Templates</button>
        </div>

        {/* Sign Out (hidden/overlaid) */}
        <button onClick={handleSignOut} className="signout-button">
          Sign Out
        </button>
      </div>
    </div>
  )
}
