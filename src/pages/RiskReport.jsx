import { Card, Row, Col, Table, Tag, Button, Select, Progress, Alert, Timeline, Modal, Spin, Space, Tooltip, Statistic, Divider, Badge } from 'antd'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartTooltip, Legend, LineChart, Line, CartesianGrid, AreaChart, Area, RadialBarChart, RadialBar } from 'recharts'
import { FileTextOutlined, DownloadOutlined, PrinterOutlined, ReloadOutlined, CheckCircleOutlined, WarningOutlined, ThunderboltOutlined, TrophyOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import html2pdf from 'html2pdf.js'
import './riskReport.css'

// 风险等级卡片
function RiskLevelCard({ title, value, suffix, color, icon, trend, delay, isMain = false }) {
  return (
    <motion.div
      className="risk-level-card-wrapper"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className={`risk-level-card ${isMain ? 'main' : ''}`} style={{ '--card-color': color }}>
        <div className="card-background-icon">{icon}</div>
        <div className="card-header">
          <span className="card-icon">{icon}</span>
          {isMain && <Badge count="LIVE" className="live-badge" />}
        </div>
        <div className="card-title">{title}</div>
        <div className="card-value" style={{ color }}>
          {value}<span className="card-suffix">{suffix}</span>
        </div>
        {trend && (
          <div className="card-trend" style={{ color: trend > 0 ? '#ff4d4f' : '#52c41a' }}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% vs yesterday
          </div>
        )}
        <div className="card-glow" />
      </div>
    </motion.div>
  )
}

// 进度条卡片
function ProgressCard({ name, value, index }) {
  const color = value >= 80 ? '#ff4d4f' : value >= 60 ? '#faad14' : '#52c41a'

  return (
    <motion.div
      className="progress-card-item"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ x: 5 }}
    >
      <div className="progress-card-content">
        <div className="progress-header">
          <span className="progress-name">{name}</span>
          <span className="progress-value" style={{ color }}>{value}%</span>
        </div>
        <Progress
          percent={value}
          strokeColor={color}
          trailColor="rgba(0,0,0,0.05)"
          showInfo={false}
          size={{ height: 8 }}
        />
        <div className="progress-dot" style={{ background: color }} />
      </div>
    </motion.div>
  )
}

// 风险项卡片
function RiskItemCard({ item, index }) {
  const medals = ['🥇', '🥈', '🥉']
  const medalColors = { Critical: '#ff4d4f', High: '#faad14', Medium: '#ffd666', Low: '#52c41a' }

  return (
    <motion.div
      className="risk-item-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -5, boxShadow: '0 10px 40px rgba(255, 77, 79, 0.2)' }}
    >
      <div className="risk-item-inner">
        <div className="risk-rank">
          <span className="rank-emoji">{item.rank <= 3 ? medals[item.rank - 1] : `#${item.rank}`}</span>
        </div>
        <div className="risk-info">
          <div className="risk-test-name">{item.test}</div>
          <div className="risk-metrics">
            <div className="metric">
              <span className="metric-label">Contribution</span>
              <Progress
                percent={item.contribution}
                strokeColor="#ff4d4f"
                trailColor="rgba(0,0,0,0.05)"
                showInfo={false}
                size={{ height: 6 }}
                style={{ width: 80 }}
              />
            </div>
            <div className="metric">
              <span className="metric-label">Confidence</span>
              <span className="metric-value">{item.confidence}%</span>
            </div>
          </div>
        </div>
        <div className="risk-tags">
          <Tag color={medalColors[item.impact]} className="impact-tag">{item.impact}</Tag>
          <Tag color={item.action === 'Retest' ? '#ff4d4f' : item.action === 'Inspect' ? '#faad14' : '#1890ff'}>
            {item.action}
          </Tag>
        </div>
      </div>
    </motion.div>
  )
}

function RiskReport() {
  const [selectedSN, setSelectedSN] = useState('SN001')
  const [reportVisible, setReportVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [reportData, setReportData] = useState(null)
  const [riskData, setRiskData] = useState([
    { name: 'Risk', value: 78 },
    { name: 'Safe', value: 22 }
  ])
  const [historicalTrend, setHistoricalTrend] = useState([
    { date: '2026-04-11', riskScore: 65, failureRate: 1.2 },
    { date: '2026-04-12', riskScore: 72, failureRate: 2.1 },
    { date: '2026-04-13', riskScore: 75, failureRate: 2.8 },
    { date: '2026-04-14', riskScore: 76, failureRate: 3.2 },
    { date: '2026-04-15', riskScore: 78, failureRate: 3.5 },
  ])

  const breakdownData = [
    { name: 'Test Data Anomaly', value: 78 },
    { name: 'Script Version Drift', value: 45 },
    { name: 'Fixture Health', value: 89 },
    { name: 'Historical Rework', value: 67 }
  ]

  const topRiskItems = [
    { rank: 1, test: 'VOLT-01', contribution: 32, confidence: 94, action: 'Retest', impact: 'Critical' },
    { rank: 2, test: 'CURR-02', contribution: 25, confidence: 87, action: 'Inspect', impact: 'High' },
    { rank: 3, test: 'TEMP-01', contribution: 18, confidence: 82, action: 'Review', impact: 'Medium' },
    { rank: 4, test: 'CONT-01', contribution: 15, confidence: 76, action: 'Clean', impact: 'Low' },
  ]

  // 动态更新数据
  useEffect(() => {
    const interval = setInterval(() => {
      setRiskData(prev => {
        const newValue = Math.min(99, Math.max(50, prev[0].value + Math.floor((Math.random() - 0.5) * 10)))
        return [{ name: 'Risk', value: newValue }, { name: 'Safe', value: 100 - newValue }]
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleGenerateReport = () => {
    setLoading(true)
    setTimeout(() => {
      setReportData({
        sampleId: selectedSN,
        timestamp: new Date().toLocaleString(),
        riskScore: riskData[0].value,
        status: riskData[0].value >= 80 ? 'CRITICAL' : riskData[0].value >= 60 ? 'HIGH RISK' : 'MEDIUM',
        totalTests: 127,
        failedTests: 5,
        suspiciousTests: 8,
      })
      setReportVisible(true)
      setLoading(false)
    }, 1200)
  }

  const handleExportPDF = () => {
    const element = document.getElementById('report-content')
    if (!element) {
      alert('Please generate a report first')
      return
    }

    const opt = {
      margin: 10,
      filename: `risk-report-${selectedSN}-${new Date().getTime()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    }

    html2pdf().set(opt).from(element).save()
  }

  const topColumns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      width: 60,
      render: (rank) => (
        <Tag color={rank === 1 ? 'red' : rank === 2 ? 'orange' : rank === 3 ? 'blue' : 'default'}>
          {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`}
        </Tag>
      )
    },
    {
      title: 'Test Item',
      dataIndex: 'test',
      key: 'test',
      render: (text) => <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{text}</span>
    },
    {
      title: 'Risk Score',
      dataIndex: 'contribution',
      key: 'contribution',
      render: (val) => <Progress percent={val} size="small" strokeColor="#ff4d4f" format={() => `${val}%`} style={{ width: 100 }} />
    },
    { title: 'Confidence', dataIndex: 'confidence', key: 'confidence', render: (val) => `${val}%` },
    {
      title: 'Impact',
      dataIndex: 'impact',
      key: 'impact',
      render: (impact) => {
        const colors = { Critical: 'red', High: 'orange', Medium: 'gold', Low: 'green' }
        return <Tag color={colors[impact]}>{impact}</Tag>
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (action) => (
        <Tag color={action === 'Retest' ? 'red' : action === 'Inspect' ? 'orange' : 'blue'}>
          {action}
        </Tag>
      )
    }
  ]

  return (
    <div className="risk-report-page">
      {/* Header */}
      <motion.div
        className="page-header-fancy risk-header"
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
            <ThunderboltOutlined /> Risk Analysis Report
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Comprehensive <span className="text-gradient">Risk Assessment</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            AI-powered risk scoring with actionable recommendations
          </motion.p>
        </div>
        <div className="header-decoration">
          <div className="header-glow" />
          <div className="floating-risk-icon">⚠️</div>
        </div>
      </motion.div>

      {/* Control Panel */}
      <motion.div
        className="control-panel-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <Card className="fancy-control-card">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} lg={6}>
              <div>
                <label className="control-label">Sample ID</label>
                <Select
                  value={selectedSN}
                  onChange={setSelectedSN}
                  className="sample-select"
                  options={[
                    { value: 'SN001', label: 'SN001' },
                    { value: 'SN045', label: 'SN045' },
                    { value: 'BATCH-20260415', label: 'BATCH-20260415' }
                  ]}
                />
              </div>
            </Col>
            <Col xs={24} sm={12} lg={18}>
              <Space className="control-actions">
                <Tooltip title="Generate a comprehensive risk report">
                  <Button
                    type="primary"
                    size="large"
                    loading={loading}
                    onClick={handleGenerateReport}
                    icon={<FileTextOutlined />}
                  >
                    Generate Report
                  </Button>
                </Tooltip>
                <Tooltip title="Export report as PDF file">
                  <Button
                    icon={<DownloadOutlined />}
                    size="large"
                    onClick={handleExportPDF}
                  >
                    Export PDF
                  </Button>
                </Tooltip>
                <Tooltip title="Print report">
                  <Button
                    icon={<PrinterOutlined />}
                    size="large"
                    onClick={() => window.print()}
                  />
                </Tooltip>
              </Space>
            </Col>
          </Row>
        </Card>
      </motion.div>

      {/* Risk Score Cards */}
      <section className="risk-cards-section">
        <div className="risk-cards-grid">
          <RiskLevelCard
            title="Current Risk Score"
            value={riskData[0].value}
            suffix="/100"
            color="#ff4d4f"
            icon={<WarningOutlined />}
            trend={5}
            delay={0}
            isMain
          />
          <RiskLevelCard
            title="Failure Rate"
            value={3.5}
            suffix="%"
            color="#faad14"
            icon={<ThunderboltOutlined />}
            trend={3}
            delay={0.1}
          />
          <RiskLevelCard
            title="Suspicious Items"
            value={8}
            suffix=""
            color="#1890ff"
            icon={<TrophyOutlined />}
            delay={0.2}
          />
          <RiskLevelCard
            title="Confidence Level"
            value={94}
            suffix="%"
            color="#52c41a"
            icon={<CheckCircleOutlined />}
            trend={-2}
            delay={0.3}
          />
        </div>
      </section>

      {/* Main Report Content */}
      <div id="report-content" className="report-content">
        {/* Charts Section */}
        <section className="charts-section">
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={8}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Card
                  className="fancy-card"
                  title={
                    <div className="card-title-fancy">
                      <span>🎯 Overall Risk Score</span>
                    </div>
                  }
                >
                  <div className="risk-pie-container">
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={riskData}
                          innerRadius={60}
                          outerRadius={85}
                          startAngle={180}
                          endAngle={0}
                          dataKey="value"
                          animationBegin={0}
                          animationDuration={800}
                        >
                          <Cell fill="#ff4d4f" />
                          <Cell fill="#f0f0f0" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="pie-center-value">
                      <span className="center-value-number">{riskData[0].value}</span>
                      <span className="center-value-label">Risk Score</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Col>

            <Col xs={24} lg={16}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <Card
                  className="fancy-card"
                  title={
                    <div className="card-title-fancy">
                      <span>📈 7-Day Risk Trend</span>
                    </div>
                  }
                >
                  <div className="trend-chart-container">
                    <ResponsiveContainer width="100%" height={220}>
                      <AreaChart data={historicalTrend} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                        <defs>
                          <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ff4d4f" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#ff4d4f" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                        <XAxis dataKey="date" stroke="#999" style={{ fontSize: 12 }} />
                        <YAxis stroke="#999" />
                        <RechartTooltip
                          contentStyle={{ borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.15)', border: 'none' }}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="riskScore"
                          stroke="#ff4d4f"
                          strokeWidth={3}
                          fill="url(#colorRisk)"
                          name="Risk Score"
                        />
                        <Line
                          type="monotone"
                          dataKey="failureRate"
                          stroke="#faad14"
                          strokeWidth={3}
                          name="Failure Rate (%)"
                          dot={{ r: 4 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </section>

        {/* Risk Breakdown */}
        <section className="breakdown-section">
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={14}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Card
                  className="fancy-card"
                  title={
                    <div className="card-title-fancy">
                      <span>📊 Risk Breakdown Analysis</span>
                    </div>
                  }
                >
                  <div className="breakdown-progress-list">
                    {breakdownData.map((item, i) => (
                      <ProgressCard key={i} name={item.name} value={item.value} index={i} />
                    ))}
                  </div>
                </Card>
              </motion.div>
            </Col>

            <Col xs={24} lg={10}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <Card
                  className="fancy-card summary-card"
                  title={
                    <div className="card-title-fancy">
                      <span>💡 Analysis Summary</span>
                    </div>
                  }
                >
                  <div className="summary-content">
                    <div className="summary-item critical">
                      <div className="summary-icon">🔴</div>
                      <div className="summary-text">
                        <strong>Critical Issues</strong>
                        <p>1 item requires immediate attention</p>
                      </div>
                    </div>
                    <div className="summary-item high">
                      <div className="summary-icon">🟠</div>
                      <div className="summary-text">
                        <strong>High Priority</strong>
                        <p>2 items need inspection within 24 hours</p>
                      </div>
                    </div>
                    <div className="summary-item medium">
                      <div className="summary-icon">🟡</div>
                      <div className="summary-text">
                        <strong>Medium Priority</strong>
                        <p>3 items require review</p>
                      </div>
                    </div>
                    <div className="summary-status">
                      <Tag color="red" className="status-tag">⚠️ HIGH RISK STATE</Tag>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </section>

        {/* Top Risk Items */}
        <section className="top-risk-section">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <Card
              className="fancy-card"
              title={
                <div className="card-title-fancy">
                  <span>🔴 Top Risk Items</span>
                  <Badge count={topRiskItems.length} style={{ backgroundColor: '#ff4d4f' }} />
                </div>
              }
            >
              <div className="risk-items-grid">
                {topRiskItems.map((item, i) => (
                  <RiskItemCard key={item.rank} item={item} index={i} />
                ))}
              </div>
            </Card>
          </motion.div>
        </section>

        {/* Recommended Actions */}
        <section className="actions-section">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <Card
              className="fancy-card"
              title={
                <div className="card-title-fancy">
                  <span>💡 Recommended Actions & Timeline</span>
                </div>
              }
            >
              <Timeline className="fancy-timeline">
                <Timeline.Item color="red" className="timeline-item">
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <strong>🔴 Immediate Actions (Now)</strong>
                      <Tag color="red" className="priority-tag">CRITICAL</Tag>
                    </div>
                    <ul className="timeline-list">
                      <li>Retest samples SN001, SN045 immediately</li>
                      <li>Lock ICT-01 station pending manual inspection</li>
                      <li>Alert quality team lead and shift supervisor</li>
                      <li>Preserve test logs for root cause analysis</li>
                    </ul>
                  </div>
                </Timeline.Item>
                <Timeline.Item color="orange" className="timeline-item">
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <strong>🟡 Short-term Actions (24 hours)</strong>
                      <Tag color="orange" className="priority-tag">HIGH</Tag>
                    </div>
                    <ul className="timeline-list">
                      <li>Inspect ICT-01 fixture #A01 contact status</li>
                      <li>Review VOLT-01 threshold settings vs v2.3 specs</li>
                      <li>Perform cable continuity check on test points</li>
                      <li>Compare Golden Baseline waveforms with current readings</li>
                    </ul>
                  </div>
                </Timeline.Item>
                <Timeline.Item color="blue" className="timeline-item">
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <strong>🔵 Medium-term Actions (3 days)</strong>
                      <Tag color="blue" className="priority-tag">MEDIUM</Tag>
                    </div>
                    <ul className="timeline-list">
                      <li>Calibrate test station instruments</li>
                      <li>Update test program to v2.4 with fixes</li>
                      <li>Conduct training on new threshold parameters</li>
                    </ul>
                  </div>
                </Timeline.Item>
                <Timeline.Item color="green" className="timeline-item">
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <strong>🟢 Long-term Actions (this week)</strong>
                      <Tag color="green" className="priority-tag">LOW</Tag>
                    </div>
                    <ul className="timeline-list">
                      <li>Review v2.3 threshold change approvals</li>
                      <li>Update Golden Baseline waveforms in database</li>
                      <li>Implement preventive maintenance schedule</li>
                      <li>Schedule quarterly station performance audit</li>
                    </ul>
                  </div>
                </Timeline.Item>
              </Timeline>
            </Card>
          </motion.div>
        </section>

        {/* System Status */}
        <motion.div
          className="system-status-alert"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <Alert
            type="warning"
            message="System Status: HIGH RISK DETECTED"
            description={`Report generated: ${new Date().toLocaleString()} | Sample: ${selectedSN} | Next auto-analysis: ${new Date(Date.now() + 15 * 60000).toLocaleTimeString()}`}
            showIcon
            icon={<WarningOutlined />}
          />
        </motion.div>
      </div>

      {/* Report Modal */}
      <Modal
        title={
          <div className="modal-title-fancy">
            <FileTextOutlined /> Report Summary
          </div>
        }
        open={reportVisible}
        onCancel={() => setReportVisible(false)}
        width={700}
        footer={[
          <Button key="close" onClick={() => setReportVisible(false)}>Close</Button>,
          <Button key="export" type="primary" onClick={handleExportPDF}>Export as PDF</Button>,
        ]}
      >
        {reportData && (
          <div className="modal-report-content">
            <div className="report-row">
              <strong>Sample ID:</strong> {reportData.sampleId}
            </div>
            <div className="report-row">
              <strong>Analysis Time:</strong> {reportData.timestamp}
            </div>
            <Divider />
            <div className="report-row highlight">
              <strong>Risk Score:</strong> <span className="risk-score-display">{reportData.riskScore}/100</span>
            </div>
            <div className="report-row">
              <strong>Status:</strong> <Tag color="red">{reportData.status}</Tag>
            </div>
            <div className="report-row">
              <strong>Total Tests:</strong> {reportData.totalTests}
            </div>
            <div className="report-row">
              <strong>Failed Tests:</strong> {reportData.failedTests}
            </div>
            <div className="report-row">
              <strong>Suspicious Tests:</strong> {reportData.suspiciousTests}
            </div>
            <Divider />
            <Alert type="error" message="Action Required" description="This sample requires immediate attention and retest." />
          </div>
        )}
      </Modal>
    </div>
  )
}

export default RiskReport
