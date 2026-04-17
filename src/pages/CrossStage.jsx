import { Card, Table, Tag, Progress, Row, Col, Statistic, Badge, Tooltip, Timeline, Divider } from 'antd'
import { ArrowRightOutlined, LinkOutlined, WarningOutlined, CheckCircleOutlined, ThunderboltOutlined, BarChartOutlined, DashboardOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import '../styles/crossStage.css'

// 阶段卡片组件
function StageCard({ stage, name, count, passRate, issues, index, isActive }) {
  return (
    <motion.div
      className="stage-card-wrapper"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className={`stage-card ${isActive ? 'active' : ''}`}>
        <div className="stage-header">
          <div className="stage-number">STAGE {stage}</div>
          <Badge
            count={issues}
            style={{ backgroundColor: issues > 3 ? '#ef4444' : '#f59e0b' }}
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
          strokeColor={passRate >= 95 ? '#10b981' : passRate >= 85 ? '#f59e0b' : '#ef4444'}
          trailColor="rgba(255,255,255,0.1)"
          showInfo={false}
          size="small"
        />
      </div>
    </motion.div>
  )
}

// 缺陷追溯卡片
function DefectTraceCard({ sample, index }) {
  const riskLevel = sample.risk >= 80 ? 'high' : sample.risk >= 60 ? 'medium' : 'low'

  return (
    <motion.div
      className="defect-trace-card"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <div className={`defect-card-inner ${riskLevel}`}>
        <div className="defect-header">
          <div className="defect-sample">
            <BarChartOutlined className="sample-icon" />
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
                strokeColor={riskLevel === 'high' ? '#ef4444' : riskLevel === 'medium' ? '#f59e0b' : '#10b981'}
                trailColor="rgba(255,255,255,0.1)"
                showInfo={false}
                size="small"
              />
              <span className="risk-value">{sample.risk}%</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// 统计卡片
function CrossStageStatCard({ title, value, icon: Icon, color, trend, delay }) {
  return (
    <motion.div
      className="cross-stage-stat-card"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div className="stat-card-content" style={{ '--stat-color': color }}>
        <div className="stat-icon"><Icon /></div>
        <div className="stat-value">{value}</div>
        <div className="stat-title">{title}</div>
        <div className="stat-trend" style={{ color: trend >= 0 ? '#10b981' : '#ef4444' }}>
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

  useEffect(() => {
    const interval = setInterval(() => {
      setSampleData(prev => prev.map(item => ({
        ...item,
        risk: Math.min(99, Math.max(50, item.risk + Math.floor((Math.random() - 0.5) * 10)))
      })))
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const stats = [
    { title: 'Total Traced', value: '572', icon: LinkOutlined, color: '#3b82f6', trend: 12 },
    { title: 'Cross-Stage Issues', value: '26', icon: WarningOutlined, color: '#f59e0b', trend: -5 },
    { title: 'Avg Risk Score', value: '78%', icon: BarChartOutlined, color: '#ef4444', trend: 8 },
    { title: 'Detection Rate', value: '94%', icon: DashboardOutlined, color: '#10b981', trend: 3 },
  ]

  return (
    <div className="cross-stage-page">
      {/* Header */}
      <motion.div
        className="page-header-fancy cross-stage-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-content">
          <motion.div
            className="header-badge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <LinkOutlined /> CROSS-STAGE ANALYSIS
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Correlate Defects Across <span className="text-gradient">Production Stages</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Track issues through the entire manufacturing pipeline
          </motion.p>
        </div>
        <div className="header-decoration">
          <div className="header-glow" />
        </div>
      </motion.div>

      {/* Stats Section */}
      <section className="cross-stage-stats">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <CrossStageStatCard key={i} {...stat} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* Production Stages */}
      <section className="stages-section">
        <motion.div
          className="section-title-wrapper"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="section-title">
            <ThunderboltOutlined className="title-icon" />
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
        <Row gutter={[20, 20]}>
          <Col xs={24} lg={16}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Card
                className="fancy-card trace-card"
                title={
                  <div className="card-title-fancy">
                    <BarChartOutlined />
                    <span>Defect Traceability</span>
                  </div>
                }
                extra={
                  <Badge count={sampleData.length} style={{ backgroundColor: '#3b82f6' }} />
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
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              <Card
                className="fancy-card correlation-card"
                title={
                  <div className="card-title-fancy">
                    <DashboardOutlined />
                    <span>Correlation Analysis</span>
                  </div>
                }
              >
                <div className="correlation-content">
                  <Timeline
                    items={[
                      {
                        color: '#3b82f6',
                        children: (
                          <div className="timeline-item">
                            <div className="timeline-title">ICT Stage Detection</div>
                            <div className="timeline-desc">Initial electrical test catches 78% of issues</div>
                          </div>
                        ),
                      },
                      {
                        color: '#8b5cf6',
                        children: (
                          <div className="timeline-item">
                            <div className="timeline-title">FCT Correlation</div>
                            <div className="timeline-desc">Functional tests reveal hidden patterns</div>
                          </div>
                        ),
                      },
                      {
                        color: '#f59e0b',
                        children: (
                          <div className="timeline-item">
                            <div className="timeline-title">AOI Visual Check</div>
                            <div className="timeline-desc">Visual defects mapped to electrical issues</div>
                          </div>
                        ),
                      },
                      {
                        color: '#10b981',
                        children: (
                          <div className="timeline-item">
                            <div className="timeline-title">Final QC Integration</div>
                            <div className="timeline-desc">All data sources combined for final assessment</div>
                          </div>
                        ),
                      },
                    ]}
                  />

                  <Divider style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '20px 0' }} />

                  <div className="correlation-stats">
                    <div className="corr-stat">
                      <span className="corr-label">Correlation Strength</span>
                      <div className="corr-value">
                        <Statistic value={87} suffix="%" valueStyle={{ fontSize: 24, fontWeight: 700, color: '#fff' }} />
                      </div>
                    </div>
                    <div className="corr-stat">
                      <span className="corr-label">Pattern Matches</span>
                      <div className="corr-value">
                        <Statistic value={23} valueStyle={{ fontSize: 24, fontWeight: 700, color: '#fff' }} />
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card className="fancy-card flow-card">
            <div className="card-title-fancy" style={{ marginBottom: 24 }}>
              <BarChartOutlined />
              <span>Production Flow Analysis</span>
            </div>
            <div className="flow-diagram">
              <motion.div className="flow-node" whileHover={{ scale: 1.05 }}>
                <div className="node-icon">📐</div>
                <div className="node-label">ICT</div>
                <div className="node-value">156</div>
              </motion.div>
              <ArrowRightOutlined className="flow-connector" />
              <motion.div className="flow-node" whileHover={{ scale: 1.05 }}>
                <div className="node-icon">⚡</div>
                <div className="node-label">FCT</div>
                <div className="node-value">142</div>
              </motion.div>
              <ArrowRightOutlined className="flow-connector" />
              <motion.div className="flow-node" whileHover={{ scale: 1.05 }}>
                <div className="node-icon">👁️</div>
                <div className="node-label">AOI</div>
                <div className="node-value">138</div>
              </motion.div>
              <ArrowRightOutlined className="flow-connector" />
              <motion.div className="flow-node final" whileHover={{ scale: 1.05 }}>
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
