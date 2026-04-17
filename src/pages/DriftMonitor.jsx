import { Card, Row, Col, Table, Tag, Timeline, Progress, Statistic, Tooltip, Badge } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined, InfoCircleOutlined, WarningOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import './driftMonitor.css'

// 版本卡片组件
function VersionCard({ version, date, status, index, isActive }) {
  const statusConfig = {
    stable: { color: '#52c41a', icon: <CheckCircleOutlined />, label: 'Stable' },
    warning: { color: '#faad14', icon: <WarningOutlined />, label: 'Warning' },
    current: { color: '#1890ff', icon: <InfoCircleOutlined />, label: 'Current' },
  }
  const config = statusConfig[status]

  return (
    <motion.div
      className="version-card-wrapper"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, x: 5 }}
    >
      <div className={`version-card ${isActive ? 'active' : ''}`}>
        <div className="version-header">
          <Badge color={config.color} text={<span className="version-label">{config.label}</span>} />
          <span className="version-date">{date}</span>
        </div>
        <div className="version-number">{version}</div>
        <div className="version-indicator">
          <config.icon style={{ color: config.color }} />
        </div>
      </div>
    </motion.div>
  )
}

// 阈值卡片组件
function ThresholdCard({ test, standard, current, delta, index }) {
  const isWarning = parseFloat(delta) > 3
  const deltaValue = parseFloat(Math.abs(delta))

  return (
    <motion.div
      className="threshold-card-wrapper"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)' }}
    >
      <div className={`threshold-card ${isWarning ? 'warning' : ''}`}>
        <div className="threshold-header">
          <span className="threshold-test">{test}</span>
          {isWarning && <WarningOutlined className="threshold-warning-icon" />}
        </div>
        <div className="threshold-values">
          <div className="threshold-value-item">
            <span className="value-label">Standard</span>
            <span className="value-number">{standard}V</span>
          </div>
          <div className="threshold-divider">→</div>
          <div className="threshold-value-item">
            <span className="value-label">Current</span>
            <span className={`value-number ${isWarning ? 'warning' : ''}`}>{current}V</span>
          </div>
        </div>
        <div className="threshold-delta">
          <span className="delta-label">Deviation</span>
          <span className={`delta-value ${isWarning ? 'warning' : 'normal'}`}>
            {deltaValue > 0 ? '+' : ''}{delta}
          </span>
        </div>
        <Progress
          percent={Math.min(deltaValue * 10, 100)}
          strokeColor={isWarning ? '#ff4d4f' : '#52c41a'}
          trailColor="transparent"
          showInfo={false}
          size="small"
        />
      </div>
    </motion.div>
  )
}

// 统计卡片组件
function DriftStatCard({ title, value, trend, icon, color, delay }) {
  return (
    <motion.div
      className="drift-stat-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="drift-stat-content" style={{ '--stat-color': color }}>
        <div className="drift-stat-icon">{icon}</div>
        <div className="drift-stat-value">{value}</div>
        <div className="drift-stat-title">{title}</div>
        <div className="drift-stat-trend" style={{ color: trend >= 0 ? '#52c41a' : '#ff4d4f' }}>
          {trend >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {Math.abs(trend)}% vs last week
        </div>
      </div>
    </motion.div>
  )
}

function DriftMonitor() {
  const [versionData, setVersionData] = useState([
    { version: 'v2.0', date: '2026-04-01', status: 'stable', changes: 0 },
    { version: 'v2.1', date: '2026-04-05', status: 'stable', changes: 2 },
    { version: 'v2.2', date: '2026-04-10', status: 'warning', changes: 5 },
    { version: 'v2.3', date: '2026-04-14', status: 'current', changes: 3 },
  ])

  const [thresholdData, setThresholdData] = useState([
    { key: '1', test: 'VOLT-01', standard: 10, current: 10.5, delta: '+5.0%' },
    { key: '2', test: 'VOLT-02', standard: 12, current: 12.1, delta: '+0.8%' },
    { key: '3', test: 'CURR-01', standard: 5, current: 5.2, delta: '+4.0%' },
    { key: '4', test: 'CURR-02', standard: 8, current: 8.05, delta: '+0.6%' },
    { key: '5', test: 'RES-01', standard: 100, current: 102, delta: '+2.0%' },
  ])

  // 动态更新数据
  useEffect(() => {
    const interval = setInterval(() => {
      setThresholdData(prev => prev.map(item => ({
        ...item,
        current: parseFloat((item.current * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2)),
        delta: `${((item.current - item.standard) / item.standard * 100).toFixed(1)}%`.replace('-', '')
      })))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const stats = [
    { title: 'Script Versions', value: versionData.length, trend: 12, icon: '📐', color: '#1890ff', delay: 0 },
    { title: 'Thresholds Tracked', value: thresholdData.length, trend: 5, icon: '⚙️', color: '#722ed1', delay: 0.1 },
    { title: 'Avg Deviation', value: '2.4%', trend: -8, icon: '📊', color: '#faad14', delay: 0.2 },
    { title: 'Drift Alerts', value: 2, trend: -15, icon: '🔔', color: '#ff4d4f', delay: 0.3 },
  ]

  return (
    <div className="drift-monitor-page">
      {/* Header */}
      <motion.div
        className="page-header-fancy drift-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <motion.div
            className="header-badge"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            📐 Drift Monitor
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Track Threshold Changes & <span className="text-gradient">Script Versions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Monitor test parameter drift and version control history
          </motion.p>
        </div>
        <div className="header-decoration">
          <div className="header-glow" />
        </div>
      </motion.div>

      {/* Stats Section */}
      <section className="drift-stats-section">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <DriftStatCard key={i} {...stat} />
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="drift-content-section">
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={10}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Card
                className="fancy-card version-timeline-card"
                title={
                  <div className="card-title-fancy">
                    <span>📊 Version Timeline</span>
                    <Tooltip title="Track script version changes over time">
                      <InfoCircleOutlined />
                    </Tooltip>
                  </div>
                }
              >
                <div className="version-timeline">
                  {versionData.map((v, i) => (
                    <VersionCard
                      key={v.version}
                      version={v.version}
                      date={v.date}
                      status={v.status}
                      index={i}
                      isActive={v.status === 'current'}
                    />
                  ))}
                </div>
              </Card>
            </motion.div>
          </Col>

          <Col xs={24} lg={14}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Card
                className="fancy-card threshold-card-large"
                title={
                  <div className="card-title-fancy">
                    <span>⚙️ Threshold Comparison</span>
                    <Tooltip title="Compare standard vs current threshold values">
                      <InfoCircleOutlined />
                    </Tooltip>
                  </div>
                }
                extra={
                  <Badge count={thresholdData.filter(t => parseFloat(t.delta) > 3).length}
                    style={{ backgroundColor: '#ff4d4f' }}
                    overflowCount={99}
                    className="threshold-alert-badge"
                  />
                }
              >
                <div className="threshold-grid">
                  {thresholdData.map((item, i) => (
                    <ThresholdCard
                      key={item.key}
                      {...item}
                      index={i}
                    />
                  ))}
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </section>

      {/* Change Log Section */}
      <section className="drift-changelog-section">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Card className="fancy-card changelog-card">
            <div className="card-title-fancy" style={{ marginBottom: 24 }}>
              <span>📝 Recent Changes</span>
            </div>
            <div className="changelog-timeline">
              {[
                { version: 'v2.3', change: 'Adjusted VOLT-01 threshold from 10.2V to 10.5V', date: '2026-04-14', type: 'modify' },
                { version: 'v2.3', change: 'Added new CURR-03 current test', date: '2026-04-14', type: 'add' },
                { version: 'v2.2', change: 'Relaxed VOLT-02 tolerance from ±0.5V to ±1V', date: '2026-04-10', type: 'warning' },
                { version: 'v2.2', change: 'Updated test sequence for better coverage', date: '2026-04-10', type: 'modify' },
                { version: 'v2.1', change: 'Fixed CURR-01 measurement calibration', date: '2026-04-05', type: 'fix' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="changelog-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  whileHover={{ x: 5, background: 'rgba(24, 144, 255, 0.05)' }}
                >
                  <div className={`changelog-dot ${item.type}`} />
                  <div className="changelog-content">
                    <div className="changelog-change">{item.change}</div>
                    <div className="changelog-meta">
                      <Tag color={item.type === 'add' ? '#52c41a' : item.type === 'warning' ? '#faad14' : item.type === 'fix' ? '#1890ff' : '#722ed1'}>
                        {item.type}
                      </Tag>
                      <span className="changelog-version">{item.version}</span>
                      <span className="changelog-date">{item.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </section>
    </div>
  )
}

export default DriftMonitor
