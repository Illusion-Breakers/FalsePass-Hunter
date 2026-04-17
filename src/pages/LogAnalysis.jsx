import { Card, Row, Col, Button, Input, Upload, Table, Tag, Space, Progress, Timeline, Badge, Tooltip, Alert, Divider } from 'antd'
import { UploadOutlined, CopyOutlined, RobotOutlined, FileTextOutlined, CheckCircleOutlined, WarningOutlined, ThunderboltOutlined, SearchOutlined, ClockCircleOutlined, DashboardOutlined, BarChartOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartTooltip, ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts'
import '../styles/logAnalysis.css'

// 上传区域组件
function LogUploadArea({ onFileSelect, onPasteChange, onAnalyze, loading }) {
  return (
    <motion.div
      className="log-upload-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
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
              <UploadOutlined style={{ fontSize: 40, color: '#60a5fa' }} />
            </div>
            <p className="upload-text">Click or drag log file to this area to upload</p>
            <p className="upload-hint">Supports .txt, .log, .csv files</p>
          </Upload.Dragger>
          <Divider style={{ borderColor: 'rgba(255,255,255,0.08)' }}>OR</Divider>
          <div className="paste-section">
            <label className="paste-label">Paste log content directly:</label>
            <Input.TextArea
              className="log-textarea"
              rows={6}
              placeholder="Paste your log content here..."
              onChange={(e) => onPasteChange(e.target.value)}
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
            AI Analyze
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card className="fancy-card result-placeholder">
          <div className="empty-state">
            <div className="empty-icon"><SearchOutlined style={{ fontSize: 48, color: 'rgba(255,255,255,0.2)' }} /></div>
            <div className="empty-text">Upload a log file to see AI analysis results</div>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="analysis-result-section"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
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
              <ResponsiveContainer width="100%" height={160}>
                <RadialBarChart
                  cx="50%"
                  cy="80%"
                  innerRadius="60%"
                  outerRadius="100%"
                  barSize={18}
                  data={[{ name: 'Confidence', value: result.confidence, fill: '#10b981' }]}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar background dataKey="value" cornerRadius={8} />
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
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
              >
                <div className="issue-stat-content">
                  <div className="issue-type">{issue.type}</div>
                  <div className="issue-count">{issue.count} occurrences</div>
                  <Tag
                    color={issue.severity === 'high' ? '#ef4444' : issue.severity === 'medium' ? '#f59e0b' : '#10b981'}
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
function LogStatCard({ title, value, icon: Icon, color, delay }) {
  return (
    <motion.div
      className="log-stat-card"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div className="stat-card-content" style={{ '--stat-color': color }}>
        <div className="stat-icon"><Icon /></div>
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

  // 本地规则分析引擎 - 无需 API
  const analyzeLogWithRules = (logText) => {
    const lines = logText.split('\n').filter(line => line.trim())
    const issues = []
    let errorCount = 0
    let warningCount = 0
    let anomalyCount = 0

    // 规则 1: 检测 ERROR/FATAL
    const errorLines = lines.filter(line => /ERROR|FATAL|CRITICAL/i.test(line))
    if (errorLines.length > 0) {
      errorCount = errorLines.length
      issues.push({ key: '1', type: 'Error/Fatal Logs', count: errorLines.length, severity: 'high' })
    }

    // 规则 2: 检测 WARNING/WARN
    const warningLines = lines.filter(line => /WARN(ING)?/i.test(line))
    if (warningLines.length > 0) {
      warningCount = warningLines.length
      issues.push({ key: '2', type: 'Warning Logs', count: warningLines.length, severity: 'medium' })
    }

    // 规则 3: 检测超时
    const timeoutLines = lines.filter(line => /TIMEOUT|TIME OUT|timed out/i.test(line))
    if (timeoutLines.length > 0) {
      anomalyCount += timeoutLines.length
      issues.push({ key: '3', type: 'Communication Timeout', count: timeoutLines.length, severity: 'high' })
    }

    // 规则 4: 检测测量异常
    const measurementLines = lines.filter(line => /OUT_OF_RANGE|FAIL(ED)?|ABNORMAL/i.test(line))
    if (measurementLines.length > 0) {
      anomalyCount += measurementLines.length
      issues.push({ key: '4', type: 'Measurement Anomaly', count: measurementLines.length, severity: 'high' })
    }

    // 规则 5: 检测阈值偏差
    const driftLines = lines.filter(line => /DRIFT|DEVIATION|offset|calibration/i.test(line))
    if (driftLines.length > 0) {
      anomalyCount += driftLines.length
      issues.push({ key: '5', type: 'Threshold Drift', count: driftLines.length, severity: 'medium' })
    }

    // 规则 6: 检测连接问题
    const connectionLines = lines.filter(line => /CONNECTION|DISCONNECT|REFUSED|UNREACHABLE/i.test(line))
    if (connectionLines.length > 0) {
      anomalyCount += connectionLines.length
      issues.push({ key: '6', type: 'Connection Issue', count: connectionLines.length, severity: 'medium' })
    }

    // 计算置信度
    const confidence = Math.min(98, Math.max(65, 100 - (issues.length * 5) + (lines.length > 100 ? 10 : 0)))

    // 生成建议
    const recommendations = []
    if (errorLines.length > 0) recommendations.push('Review error logs immediately - system stability may be affected.')
    if (timeoutLines.length > 0) recommendations.push('Check network connectivity and device communication settings.')
    if (measurementLines.length > 0) recommendations.push('Verify test fixture contact and sensor calibration.')
    if (driftLines.length > 0) recommendations.push('Schedule equipment calibration - parameter drift detected.')
    if (connectionLines.length > 0) recommendations.push('Inspect cable connections and communication interfaces.')
    if (recommendations.length === 0) recommendations.push('No critical issues detected. Continue regular monitoring.')

    return {
      issues: issues.length > 0 ? issues : [{ key: '0', type: 'No Issues Found', count: 0, severity: 'low' }],
      confidence: parseFloat(confidence.toFixed(1)),
      recommendation: recommendations.join(' '),
      stats: {
        totalEntries: lines.length,
        anomalies: anomalyCount,
        warnings: warningCount,
        errors: errorCount,
      }
    }
  }

  const handleAnalyze = () => {
    if (!logContent) {
      alert('Please upload or paste log content')
      return
    }
    setLoading(true)
    setTimeout(() => {
      const result = analyzeLogWithRules(logContent)
      setAnalysisResult(result)
      setLogStats(result.stats)
      setLoading(false)
    }, 1500)
  }

  const stats = [
    { title: 'Total Entries', value: logStats.totalEntries.toLocaleString(), icon: BarChartOutlined, color: '#3b82f6', delay: 0 },
    { title: 'Anomalies', value: logStats.anomalies, icon: WarningOutlined, color: '#ef4444', delay: 0.1 },
    { title: 'Warnings', value: logStats.warnings, icon: ThunderboltOutlined, color: '#f59e0b', delay: 0.2 },
    { title: 'Errors', value: logStats.errors, icon: DashboardOutlined, color: '#8b5cf6', delay: 0.3 },
  ]

  return (
    <div className="log-analysis-page">
      {/* Header */}
      <motion.div
        className="page-header-fancy log-header"
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
            <RobotOutlined /> AI-Powered Analysis
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Intelligent <span className="text-gradient">Log Analysis</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Extract insights from test logs using advanced AI algorithms
          </motion.p>
        </div>
        <div className="header-decoration">
          <div className="header-glow" />
        </div>
      </motion.div>

      {/* Stats Section */}
      <section className="log-stats-section">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <LogStatCard key={i} {...stat} />
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="log-content-section">
        <Row gutter={[20, 20]}>
          <Col xs={24} lg={12}>
            <LogUploadArea
              onFileSelect={handleFileSelect}
              onPasteChange={(value) => setLogContent(value)}
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card className="fancy-card timeline-card">
            <div className="card-title-fancy">
              <ClockCircleOutlined /> Analysis Process
            </div>
            <Timeline className="fancy-timeline">
              <Timeline.Item color="#3b82f6" className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-header">
                    <strong>Log Ingestion</strong>
                    <span className="timeline-time">0.2s</span>
                  </div>
                  <p className="timeline-desc">Parse and normalize log entries from multiple formats</p>
                </div>
              </Timeline.Item>
              <Timeline.Item color="#8b5cf6" className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-header">
                    <strong>Pattern Recognition</strong>
                    <span className="timeline-time">1.5s</span>
                  </div>
                  <p className="timeline-desc">AI identifies anomalies and deviations from normal patterns</p>
                </div>
              </Timeline.Item>
              <Timeline.Item color="#f59e0b" className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-header">
                    <strong>Risk Assessment</strong>
                    <span className="timeline-time">0.8s</span>
                  </div>
                  <p className="timeline-desc">Calculate severity scores and confidence levels</p>
                </div>
              </Timeline.Item>
              <Timeline.Item color="#10b981" className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-header">
                    <strong>Recommendation Generation</strong>
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
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
                { pattern: 'MEASUREMENT_*_OUT_OF_RANGE', desc: 'Measurement exceeds specified limits', count: 15, color: '#ef4444' },
                { pattern: 'CALIBRATION_DRIFT_DETECTED', desc: 'Gradual parameter drift from baseline', count: 8, color: '#f59e0b' },
                { pattern: 'COMMUNICATION_TIMEOUT', desc: 'Station communication interrupted', count: 5, color: '#3b82f6' },
                { pattern: 'FIXTURE_CONTACT_ISSUE', desc: 'Poor contact detected during test', count: 3, color: '#8b5cf6' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="pattern-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
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
