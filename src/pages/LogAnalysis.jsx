import { Card, Row, Col, Button, Input, Upload, Table, Tag, Space, Progress, Statistic, Timeline, Badge, Tooltip, Alert, Divider } from 'antd'
import { UploadOutlined, CopyOutlined, RobotOutlined, FileTextOutlined, CheckCircleOutlined, WarningOutlined, ThunderboltOutlined, SearchOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartTooltip, ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts'
import './logAnalysis.css'

// 上传区域组件
function LogUploadArea({ onFileSelect, onAnalyze, loading }) {
  return (
    <motion.div
      className="log-upload-section"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <Card className="fancy-card upload-card">
        <div className="card-title-fancy">
          <FileTextOutlined /> Upload Log File
        </div>
        <div className="upload-content">
          <Upload.Dragger
            className="log-upload-dragger"
            multiple={false}
            beforeUpload={(file) => {
              const reader = new FileReader()
              reader.onload = (e) => onFileSelect(e.target.result)
              reader.readAsText(file)
              return false
            }}
          >
            <div className="upload-icon">
              <UploadOutlined style={{ fontSize: 48, color: '#1890ff' }} />
            </div>
            <p className="upload-text">Click or drag log file to this area to upload</p>
            <p className="upload-hint">Supports .txt, .log, .csv files</p>
          </Upload.Dragger>
          <Divider>OR</Divider>
          <div className="paste-section">
            <label className="paste-label">Paste log content directly:</label>
            <Input.TextArea
              className="log-textarea"
              rows={6}
              placeholder="Paste your log content here..."
            />
          </div>
          <Button
            type="primary"
            size="large"
            block
            className="analyze-button"
            onClick={onAnalyze}
            loading={loading}
            icon={<RobotOutlined />}
          >
            🤖 AI Analyze
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

// 分析结果卡片
function AnalysisResultCard({ result, loading }) {
  if (!result && !loading) {
    return (
      <motion.div
        className="empty-result-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Card className="fancy-card result-placeholder">
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <div className="empty-text">Upload a log file to see AI analysis results</div>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="analysis-result-section"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <Card
        className="fancy-card result-card"
        title={
          <div className="card-title-fancy">
            <RobotOutlined /> AI Analysis Result
          </div>
        }
        extra={
          <Badge.Ribbon text="AI POWERED" color="cyan" />
        }
      >
        <div className="result-content">
          {/* 置信度仪表 */}
          <div className="confidence-section">
            <div className="confidence-title">Analysis Confidence</div>
            <div className="confidence-gauge">
              <ResponsiveContainer width="100%" height={180}>
                <RadialBarChart
                  cx="50%"
                  cy="80%"
                  innerRadius="60%"
                  outerRadius="100%"
                  barSize={20}
                  data={[{ name: 'Confidence', value: result.confidence, fill: '#52c41a' }]}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar background dataKey="value" cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="confidence-value">{result.confidence}%</div>
            </div>
          </div>

          {/* 问题统计 */}
          <div className="issues-stats">
            {result.issues.map((issue, i) => (
              <motion.div
                key={i}
                className="issue-stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="issue-stat-content">
                  <div className="issue-type">{issue.type}</div>
                  <div className="issue-count">{issue.count} occurrences</div>
                  <Tag
                    color={issue.severity === 'high' ? '#ff4d4f' : issue.severity === 'medium' ? '#faad14' : '#52c41a'}
                    className="issue-severity"
                  >
                    {issue.severity.toUpperCase()}
                  </Tag>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 推荐建议 */}
          <div className="recommendation-section">
            <div className="recommendation-title">
              <ThunderboltOutlined /> AI Recommendation
            </div>
            <Alert
              type="success"
              message={result.recommendation}
              icon={<CheckCircleOutlined />}
              showIcon
              className="recommendation-alert"
            />
          </div>

          {/* 操作按钮 */}
          <div className="result-actions">
            <Button icon={<CopyOutlined />} block size="large">
              Copy Report
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

// 日志统计卡片
function LogStatCard({ title, value, icon, color, delay }) {
  return (
    <motion.div
      className="log-stat-card"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.03 }}
    >
      <div className="stat-card-content" style={{ '--stat-color': color }}>
        <div className="stat-icon">{icon}</div>
        <div className="stat-value">{value}</div>
        <div className="stat-title">{title}</div>
      </div>
    </motion.div>
  )
}

function LogAnalysis() {
  const [logContent, setLogContent] = useState('')
  const [analysisResult, setAnalysisResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [logStats, setLogStats] = useState({
    totalEntries: 1247,
    anomalies: 23,
    warnings: 56,
    errors: 8,
  })

  const handleFileSelect = (content) => {
    setLogContent(content)
  }

  const handleAnalyze = () => {
    if (!logContent) {
      alert('Please upload or paste log content')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setAnalysisResult({
        issues: [
          { key: '1', type: 'Measurement Anomaly', count: 3, severity: 'high' },
          { key: '2', type: 'Threshold Deviation', count: 5, severity: 'medium' },
          { key: '3', type: 'Communication Timeout', count: 2, severity: 'low' },
        ],
        confidence: 91.5,
        recommendation: 'Recommend immediate calibration check for ICT-01 station. Test parameters show consistent drift pattern.',
      })
      setLoading(false)
    }, 2000)
  }

  const columns = [
    { title: 'Issue Type', dataIndex: 'type', key: 'type' },
    { title: 'Count', dataIndex: 'count', key: 'count' },
    {
      title: 'Severity',
      dataIndex: 'severity',
      render: (s) => (
        <Tag color={s === 'high' ? '#ff4d4f' : s === 'medium' ? '#faad14' : '#52c41a'}>
          {s.toUpperCase()}
        </Tag>
      ),
    },
  ]

  return (
    <div className="log-analysis-page">
      {/* Header */}
      <motion.div
        className="page-header-fancy log-header"
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
            <RobotOutlined /> AI-Powered Analysis
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Intelligent <span className="text-gradient">Log Analysis</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Extract insights from test logs using advanced AI algorithms
          </motion.p>
        </div>
        <div className="header-decoration">
          <div className="header-glow" />
          <div className="floating-code">
            <span>&lt;log&gt;</span>
            <span>analyze()</span>
            <span>&lt;/log&gt;</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <section className="log-stats-section">
        <div className="stats-grid">
          <LogStatCard
            title="Total Entries"
            value={logStats.totalEntries.toLocaleString()}
            icon="📊"
            color="#1890ff"
            delay={0}
          />
          <LogStatCard
            title="Anomalies Detected"
            value={logStats.anomalies}
            icon="⚠️"
            color="#ff4d4f"
            delay={0.1}
          />
          <LogStatCard
            title="Warnings"
            value={logStats.warnings}
            icon="🔶"
            color="#faad14"
            delay={0.2}
          />
          <LogStatCard
            title="Errors"
            value={logStats.errors}
            icon="❌"
            color="#722ed1"
            delay={0.3}
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="log-content-section">
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <LogUploadArea
              onFileSelect={handleFileSelect}
              onAnalyze={handleAnalyze}
              loading={loading}
            />
          </Col>

          <Col xs={24} lg={12}>
            <AnalysisResultCard result={analysisResult} loading={loading} />
          </Col>
        </Row>
      </section>

      {/* Analysis Timeline */}
      <section className="analysis-timeline-section">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Card className="fancy-card timeline-card">
            <div className="card-title-fancy">
              <ClockCircleOutlined /> Analysis Process
            </div>
            <Timeline className="fancy-timeline">
              <Timeline.Item color="#1890ff" className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-header">
                    <strong>📥 Log Ingestion</strong>
                    <span className="timeline-time">0.2s</span>
                  </div>
                  <p className="timeline-desc">Parse and normalize log entries from multiple formats</p>
                </div>
              </Timeline.Item>
              <Timeline.Item color="#722ed1" className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-header">
                    <strong>🔍 Pattern Recognition</strong>
                    <span className="timeline-time">1.5s</span>
                  </div>
                  <p className="timeline-desc">AI identifies anomalies and deviations from normal patterns</p>
                </div>
              </Timeline.Item>
              <Timeline.Item color="#faad14" className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-header">
                    <strong>📊 Risk Assessment</strong>
                    <span className="timeline-time">0.8s</span>
                  </div>
                  <p className="timeline-desc">Calculate severity scores and confidence levels</p>
                </div>
              </Timeline.Item>
              <Timeline.Item color="#52c41a" className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-header">
                    <strong>💡 Recommendation Generation</strong>
                    <span className="timeline-time">0.5s</span>
                  </div>
                  <p className="timeline-desc">Generate actionable insights based on analysis</p>
                </div>
              </Timeline.Item>
            </Timeline>
          </Card>
        </motion.div>
      </section>

      {/* Sample Log Patterns */}
      <section className="patterns-section">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Card
            className="fancy-card"
            title={
              <div className="card-title-fancy">
                <SearchOutlined /> Common Log Patterns
              </div>
            }
          >
            <div className="patterns-grid">
              {[
                { pattern: 'MEASUREMENT_*_OUT_OF_RANGE', desc: 'Measurement exceeds specified limits', count: 15, color: '#ff4d4f' },
                { pattern: 'CALIBRATION_DRIFT_DETECTED', desc: 'Gradual parameter drift from baseline', count: 8, color: '#faad14' },
                { pattern: 'COMMUNICATION_TIMEOUT', desc: 'Station communication interrupted', count: 5, color: '#1890ff' },
                { pattern: 'FIXTURE_CONTACT_ISSUE', desc: 'Poor contact detected during test', count: 3, color: '#722ed1' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="pattern-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="pattern-content">
                    <code className="pattern-code">{item.pattern}</code>
                    <p className="pattern-desc">{item.desc}</p>
                    <Badge count={item.count} style={{ backgroundColor: item.color }} className="pattern-count" />
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

export default LogAnalysis
