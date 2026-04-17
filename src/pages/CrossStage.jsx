import { Card, Table, Tag, Progress, Row, Col, Statistic, Badge, Tooltip, Timeline } from 'antd'
import { ArrowRightOutlined, LinkOutlined, WarningOutlined, CheckCircleOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import './crossStage.css'

// 阶段卡片组件
function StageCard({ stage, name, count, passRate, issues, index, isActive }) {
  return (
    <motion.div
      className="stage-card-wrapper"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className={`stage-card ${isActive ? 'active' : ''}`}>
        <div className="stage-header">
          <div className="stage-number">{stage}</div>
          <Badge
            count={issues}
            style={{ backgroundColor: issues > 3 ? '#ff4d4f' : '#faad14' }}
            className="stage-badge"
          />
        </div>
        <div className="stage-name">{name}</div>
        <div className="stage-stats">
          <div className="stage-stat">
            <span className="stat-label">Samples</span>
            <span className="stat-value">{count}</span>
          </div>
          <div className="stage-stat">
            <span className="stat-label">Pass Rate</span>
            <span className={`stat-value ${passRate >= 95 ? 'good' : passRate >= 85 ? 'warning' : 'bad'}`}>
              {passRate}%
            </span>
          </div>
        </div>
        <Progress
          percent={passRate}
          strokeColor={passRate >= 95 ? '#52c41a' : passRate >= 85 ? '#faad14' : '#ff4d4f'}
          trailColor="rgba(0,0,0,0.05)"
          showInfo={false}
          size="small"
        />
        <div className="stage-glow" />
      </div>
    </motion.div>
  )
}

// 缺陷追溯卡片
function DefectTraceCard({ sample, index }) {
  const riskLevel = sample.risk >= 80 ? 'high' : sample.risk >= 60 ? 'medium' : 'low'
  const riskColor = { high: '#ff4d4f', medium: '#faad14', low: '#52c41a' }

  return (
    <motion.div
      className="defect-trace-card"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ x: 5, boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)' }}
    >
      <div className={`defect-card-inner ${riskLevel}`}>
        <div className="defect-header">
          <div className="defect-sample">
            <span className="sample-icon">🔍</span>
            <span className="sample-id">{sample.sampleId}</span>
          </div>
          <Badge.Ribbon
            text={riskLevel.toUpperCase()}
            color={riskLevel === 'high' ? 'red' : riskLevel === 'medium' ? 'orange' : 'green'}
          >
            <div className="defect-station">{sample.station}</div>
          </Badge.Ribbon>
        </div>

        <div className="defect-flow">
          <div className="flow-item passed">
            <CheckCircleOutlined className="flow-icon" />
            <span>Test PASS</span>
          </div>
          <ArrowRightOutlined className="flow-arrow" />
          <div className="flow-item detected">
            <WarningOutlined className="flow-icon" />
            <span>Issue Found</span>
          </div>
        </div>

        <div className="defect-details">
          <div className="detail-item">
            <span className="detail-label">Issue Type</span>
            <span className="detail-value">{sample.issue}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Risk Score</span>
            <div className="risk-progress">
              <Progress
                percent={sample.risk}
                strokeColor={riskColor[riskLevel]}
                trailColor="rgba(0,0,0,0.05)"
                showInfo={false}
                size="small"
              />
              <span className="risk-value" style={{ color: riskColor[riskLevel] }}>{sample.risk}%</span>
            </div>
          </div>
        </div>

        <div className="defect-trace-line">
          <div className="trace-dot" />
          <div className="trace-line" />
        </div>
      </div>
    </motion.div>
  )
}

// 统计卡片
function CrossStageStatCard({ title, value, icon, color, trend, delay }) {
  return (
    <motion.div
      className="cross-stage-stat-card"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.03 }}
    >
      <div className="stat-card-content" style={{ '--stat-color': color }}>
        <div className="stat-icon">{icon}</div>
        <div className="stat-value">{value}</div>
        <div className="stat-title">{title}</div>
        <div className="stat-trend" style={{ color: trend >= 0 ? '#ff4d4f' : '#52c41a' }}>
          {trend > 0 ? '+' : ''}{trend}% vs last week
        </div>
      </div>
    </motion.div>
  )
}

function CrossStage() {
  const [sampleData, setSampleData] = useState([
    { key: '1', sampleId: 'SN001', station: 'ICT-01', result: 'PASS', issue: 'Cold Solder', risk: 92, stage: 1 },
    { key: '2', sampleId: 'SN045', station: 'FCT-02', result: 'PASS', issue: 'Short Circuit', risk: 87, stage: 2 },
    { key: '3', sampleId: 'SN089', station: 'ICT-03', result: 'PASS', issue: 'Open Circuit', risk: 75, stage: 1 },
    { key: '4', sampleId: 'SN112', station: 'AOI-01', result: 'PASS', issue: 'Component Shift', risk: 68, stage: 3 },
    { key: '5', sampleId: 'SN156', station: 'FCT-01', result: 'PASS', issue: 'Power Anomaly', risk: 82, stage: 2 },
    { key: '6', sampleId: 'SN203', station: 'ICT-02', result: 'PASS', issue: 'Resistance Drift', risk: 71, stage: 1 },
  ])

  const [stages, setStages] = useState([
    { stage: '01', name: 'ICT Stage', count: 156, passRate: 94.2, issues: 8 },
    { stage: '02', name: 'FCT Stage', count: 142, passRate: 91.5, issues: 12 },
    { stage: '03', name: 'AOI Stage', count: 138, passRate: 96.8, issues: 4 },
    { stage: '04', name: 'Final QC', count: 134, passRate: 98.1, issues: 2 },
  ])

  // 动态更新数据
  useEffect(() => {
    const interval = setInterval(() => {
      setSampleData(prev => prev.map(item => ({
        ...item,
        risk: Math.min(99, Math.max(50, item.risk + Math.floor((Math.random() - 0.5) * 10)))
      })))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const stats = [
    { title: 'Total Traced', value: '572', icon: '🔗', color: '#1890ff', trend: 12 },
    { title: 'Cross-Stage Issues', value: '26', icon: '⚠️', color: '#faad14', trend: -5 },
    { title: 'Avg Risk Score', value: '78%', icon: '📊', color: '#ff4d4f', trend: 8 },
    { title: 'Detection Rate', value: '94%', icon: '🎯', color: '#52c41a', trend: 3 },
  ]

  return (
    <div className="cross-stage-page">
      {/* Header */}
      <motion.div
        className="page-header-fancy cross-stage-header"
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
            🔗 Cross-Stage Analysis
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Correlate Defects Across <span className="text-gradient">Production Stages</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Track issues through the entire manufacturing pipeline
          </motion.p>
        </div>
        <div className="header-decoration">
          <div className="header-glow" />
          <div className="floating-icons">
            <span className="floating-icon">🏭</span>
            <span className="floating-icon">🔍</span>
            <span className="floating-icon">📊</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <section className="cross-stage-stats">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <CrossStageStatCard key={i} {...stat} />
          ))}
        </div>
      </section>

      {/* Production Stages */}
      <section className="stages-section">
        <motion.div
          className="section-title-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h2 className="section-title">
            <span className="title-icon">🏭</span>
            Production Stages Overview
          </h2>
        </motion.div>

        <div className="stages-grid">
          {stages.map((stage, i) => (
            <StageCard
              key={stage.stage}
              stage={stage.stage}
              name={stage.name}
              count={stage.count}
              passRate={stage.passRate}
              issues={stage.issues}
              index={i}
              isActive={stage.issues > 5}
            />
          ))}
        </div>
      </section>

      {/* Main Content - Defect Trace Cards */}
      <section className="defect-trace-section">
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Card
                className="fancy-card trace-card"
                title={
                  <div className="card-title-fancy">
                    <span>📋 Defect Traceability</span>
                    <Tooltip title="Samples that passed testing but were later found to have issues">
                      <ThunderboltOutlined className="title-icon" />
                    </Tooltip>
                  </div>
                }
                extra={
                  <Badge count={sampleData.length} style={{ backgroundColor: '#1890ff' }} />
                }
              >
                <div className="trace-cards-container">
                  {sampleData.map((sample, i) => (
                    <DefectTraceCard key={sample.key} sample={sample} index={i} />
                  ))}
                </div>
              </Card>
            </motion.div>
          </Col>

          <Col xs={24} lg={8}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Card
                className="fancy-card correlation-card"
                title={
                  <div className="card-title-fancy">
                    <span>🔬 Correlation Analysis</span>
                  </div>
                }
              >
                <div className="correlation-content">
                  <Timeline
                    items={[
                      {
                        color: '#1890ff',
                        children: (
                          <div className="timeline-item">
                            <div className="timeline-title">ICT Stage Detection</div>
                            <div className="timeline-desc">Initial electrical test catches 78% of issues</div>
                          </div>
                        ),
                      },
                      {
                        color: '#722ed1',
                        children: (
                          <div className="timeline-item">
                            <div className="timeline-title">FCT Correlation</div>
                            <div className="timeline-desc">Functional tests reveal hidden patterns</div>
                          </div>
                        ),
                      },
                      {
                        color: '#faad14',
                        children: (
                          <div className="timeline-item">
                            <div className="timeline-title">AOI Visual Check</div>
                            <div className="timeline-desc">Visual defects mapped to electrical issues</div>
                          </div>
                        ),
                      },
                      {
                        color: '#52c41a',
                        children: (
                          <div className="timeline-item">
                            <div className="timeline-title">Final QC Integration</div>
                            <div className="timeline-desc">All data sources combined for final assessment</div>
                          </div>
                        ),
                      },
                    ]}
                  />

                  <div className="correlation-stats">
                    <div className="corr-stat">
                      <span className="corr-label">Correlation Strength</span>
                      <div className="corr-value">
                        <Statistic value={87} suffix="%" valueStyle={{ fontSize: 24, fontWeight: 700 }} />
                      </div>
                    </div>
                    <div className="corr-stat">
                      <span className="corr-label">Pattern Matches</span>
                      <div className="corr-value">
                        <Statistic value={23} valueStyle={{ fontSize: 24, fontWeight: 700 }} />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </section>

      {/* Stage Flow Visualization */}
      <section className="stage-flow-section">
        <motion.div
          className="flow-visualization"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Card className="fancy-card flow-card">
            <div className="card-title-fancy" style={{ marginBottom: 24 }}>
              <span>🌊 Production Flow Analysis</span>
            </div>
            <div className="flow-diagram">
              <motion.div
                className="flow-node"
                whileHover={{ scale: 1.1 }}
              >
                <div className="node-icon">📐</div>
                <div className="node-label">ICT</div>
                <div className="node-value">156</div>
              </motion.div>
              <ArrowRightOutlined className="flow-connector" />
              <motion.div
                className="flow-node"
                whileHover={{ scale: 1.1 }}
              >
                <div className="node-icon">⚡</div>
                <div className="node-label">FCT</div>
                <div className="node-value">142</div>
              </motion.div>
              <ArrowRightOutlined className="flow-connector" />
              <motion.div
                className="flow-node"
                whileHover={{ scale: 1.1 }}
              >
                <div className="node-icon">👁️</div>
                <div className="node-label">AOI</div>
                <div className="node-value">138</div>
              </motion.div>
              <ArrowRightOutlined className="flow-connector" />
              <motion.div
                className="flow-node final"
                whileHover={{ scale: 1.1 }}
              >
                <div className="node-icon">✅</div>
                <div className="node-label">QC</div>
                <div className="node-value">134</div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </section>
    </div>
  )
}

export default CrossStage
