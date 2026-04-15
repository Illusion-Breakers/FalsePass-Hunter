import { Card, Row, Col, Table, Tag, Button, Select, Progress, Alert, Timeline, Modal, Spin, Space, Tooltip, Statistic, Divider } from 'antd'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartTooltip, Legend, LineChart, Line, CartesianGrid } from 'recharts'
import { FileTextOutlined, DownloadOutlined, PrinterOutlined, ReloadOutlined, CheckCircleOutlined, WarningOutlined } from '@ant-design/icons'
import { useState } from 'react'
import html2pdf from 'html2pdf.js'

const riskData = [
  { name: 'Risk', value: 78 },
  { name: 'Safe', value: 22 }
]

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

const historicalTrend = [
  { date: '2026-04-11', riskScore: 65, failureRate: 1.2 },
  { date: '2026-04-12', riskScore: 72, failureRate: 2.1 },
  { date: '2026-04-13', riskScore: 75, failureRate: 2.8 },
  { date: '2026-04-14', riskScore: 76, failureRate: 3.2 },
  { date: '2026-04-15', riskScore: 78, failureRate: 3.5 },
]

function RiskReport() {
  const [selectedSN, setSelectedSN] = useState('SN001')
  const [reportVisible, setReportVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [reportData, setReportData] = useState(null)

  const handleGenerateReport = () => {
    setLoading(true)
    setTimeout(() => {
      setReportData({
        sampleId: selectedSN,
        timestamp: new Date().toLocaleString(),
        riskScore: 78,
        status: 'High Risk',
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
    <div>
      {/* Header Section */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>📊 Risk Analysis</h2>
        <p style={{ margin: '8px 0 0', color: '#999', fontSize: 14 }}>Comprehensive risk assessment with actionable insights</p>
      </div>

      {/* Control Panel */}
      <Card style={{ marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderRadius: 8 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} lg={6}>
            <div>
              <label style={{ color: '#666', fontSize: 12, fontWeight: 500, display: 'block', marginBottom: 8 }}>Sample ID</label>
              <Select 
                value={selectedSN} 
                onChange={setSelectedSN}
                style={{ width: '100%' }} 
                options={[
                  { value: 'SN001', label: 'SN001' },
                  { value: 'SN045', label: 'SN045' },
                  { value: 'BATCH-20260415', label: 'BATCH-20260415' }
                ]} 
              />
            </div>
          </Col>
          <Col xs={24} sm={12} lg={18}>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Tooltip title="Generate a comprehensive risk report">
                <Button 
                  type="primary" 
                  size="large"
                  loading={loading}
                  onClick={handleGenerateReport}
                  style={{ borderRadius: 4, fontWeight: 600 }}
                >
                  📋 Generate Report
                </Button>
              </Tooltip>
              <Tooltip title="Export report as PDF file">
                <Button 
                  icon={<DownloadOutlined />}
                  size="large"
                  onClick={handleExportPDF}
                  style={{ borderRadius: 4, fontWeight: 600 }}
                >
                  Export PDF
                </Button>
              </Tooltip>
              <Tooltip title="Print report">
                <Button 
                  icon={<PrinterOutlined />}
                  size="large"
                  onClick={() => window.print()}
                  style={{ borderRadius: 4 }}
                />
              </Tooltip>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Main Report Content */}
      <div id="report-content">
        {/* Risk Score Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ borderTop: '4px solid #ff4d4f', borderRadius: 8, textAlign: 'center' }} hoverable>
              <Statistic 
                title="Current Risk Score" 
                value={78} 
                suffix="/100"
                valueStyle={{ color: '#ff4d4f', fontSize: 36, fontWeight: 'bold' }}
              />
              <Tag color="red" style={{ marginTop: 12, fontSize: 12 }}>⚠️ HIGH RISK</Tag>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ borderTop: '4px solid #faad14', borderRadius: 8, textAlign: 'center' }} hoverable>
              <Statistic 
                title="Failure Rate" 
                value={3.5} 
                suffix="%"
                valueStyle={{ color: '#faad14', fontSize: 36, fontWeight: 'bold' }}
              />
              <p style={{ margin: '12px 0 0', color: '#999', fontSize: 12 }}>↑ 0.3% vs yesterday</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ borderTop: '4px solid #1890ff', borderRadius: 8, textAlign: 'center' }} hoverable>
              <Statistic 
                title="Suspicious Items" 
                value={8}
                valueStyle={{ color: '#1890ff', fontSize: 36, fontWeight: 'bold' }}
              />
              <p style={{ margin: '12px 0 0', color: '#999', fontSize: 12 }}>Requires attention</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ borderTop: '4px solid #52c41a', borderRadius: 8, textAlign: 'center' }} hoverable>
              <Statistic 
                title="Confidence Level" 
                value={94} 
                suffix="%"
                valueStyle={{ color: '#52c41a', fontSize: 36, fontWeight: 'bold' }}
              />
              <p style={{ margin: '12px 0 0', color: '#999', fontSize: 12 }}>Analysis confidence</p>
            </Card>
          </Col>
        </Row>

        {/* Charts Section */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} lg={8}>
            <Card title="🎯 Overall Risk Score" style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ textAlign: 'center' }}>
                <ResponsiveContainer width="100%" height={250}>
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
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={16}>
            <Card title="📈 7-Day Trend" style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={historicalTrend} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#999" style={{ fontSize: 12 }} />
                  <YAxis stroke="#999" />
                  <RechartTooltip contentStyle={{ borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }} />
                  <Legend />
                  <Line type="monotone" dataKey="riskScore" stroke="#ff4d4f" strokeWidth={3} name="Risk Score" dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="failureRate" stroke="#faad14" strokeWidth={3} name="Failure Rate (%)" dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>

        {/* Risk Breakdown */}
        <Card title="📊 Risk Breakdown Analysis" style={{ marginBottom: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <Row gutter={32}>
            <Col xs={24} lg={12}>
              <div style={{ padding: '20px 0' }}>
                {breakdownData.map((item, i) => (
                  <div key={i} style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontWeight: 500 }}>{item.name}</span>
                      <span style={{ fontWeight: 700, color: '#ff4d4f' }}>{item.value}%</span>
                    </div>
                    <Progress
                      percent={item.value}
                      strokeColor={item.value >= 80 ? '#ff4d4f' : item.value >= 60 ? '#faad14' : '#52c41a'}
                      format={() => ''}
                      size="large"
                    />
                  </div>
                ))}
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <Alert
                message="Risk Analysis Summary"
                description={
                  <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
                    <li><strong>Critical Issues:</strong> 1 item requires immediate attention</li>
                    <li><strong>High Priority:</strong> 2 items need inspection within 24 hours</li>
                    <li><strong>Medium Priority:</strong> 3 items require review</li>
                    <li><strong>Overall Status:</strong> System is in HIGH RISK state</li>
                  </ul>
                }
                type="error"
                showIcon
                style={{ marginTop: 12 }}
              />
            </Col>
          </Row>
        </Card>

        {/* Top Risk Items Table */}
        <Card title="🔴 Top Risk Items" style={{ marginBottom: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <Table
            columns={topColumns}
            dataSource={topRiskItems}
            pagination={false}
            size="middle"
            rowKey="rank"
            bordered
          />
        </Card>

        {/* Recommended Actions */}
        <Card title="💡 Recommended Actions & Timeline" style={{ marginBottom: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <Timeline
            items={[
              {
                color: 'red',
                children: (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <strong style={{ fontSize: 16 }}>🔴 Immediate Actions (Now)</strong>
                      <Tag color="red">CRITICAL</Tag>
                    </div>
                    <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
                      <li>Retest samples SN001, SN045 immediately</li>
                      <li>Lock ICT-01 station pending manual inspection</li>
                      <li>Alert quality team lead and shift supervisor</li>
                      <li>Preserve test logs for root cause analysis</li>
                    </ul>
                  </div>
                )
              },
              {
                color: 'orange',
                children: (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <strong style={{ fontSize: 16 }}>🟡 Short-term Actions (24 hours)</strong>
                      <Tag color="orange">HIGH</Tag>
                    </div>
                    <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
                      <li>Inspect ICT-01 fixture #A01 contact status</li>
                      <li>Review VOLT-01 threshold settings vs v2.3 specs</li>
                      <li>Perform cable continuity check on test points</li>
                      <li>Compare Golden Baseline waveforms with current readings</li>
                    </ul>
                  </div>
                )
              },
              {
                color: 'blue',
                children: (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <strong style={{ fontSize: 16 }}>🔵 Medium-term Actions (3 days)</strong>
                      <Tag color="blue">MEDIUM</Tag>
                    </div>
                    <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
                      <li>Calibrate test station instruments</li>
                      <li>Update test program to v2.4 with fixes</li>
                      <li>Conduct training on new threshold parameters</li>
                    </ul>
                  </div>
                )
              },
              {
                color: 'green',
                children: (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <strong style={{ fontSize: 16 }}>🟢 Long-term Actions (this week)</strong>
                      <Tag color="green">LOW</Tag>
                    </div>
                    <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
                      <li>Review v2.3 threshold change approvals and documentation</li>
                      <li>Update Golden Baseline waveforms in database</li>
                      <li>Implement preventive maintenance schedule</li>
                      <li>Schedule quarterly station performance audit</li>
                    </ul>
                  </div>
                )
              }
            ]}
          />
        </Card>

        {/* System Status */}
        <Alert
          type="warning"
          message="System Status: HIGH RISK DETECTED"
          description={`Report generated: ${new Date().toLocaleString()} | Sample: ${selectedSN} | Next auto-analysis: ${new Date(Date.now() + 15 * 60000).toLocaleTimeString()}`}
          showIcon
          icon={<WarningOutlined />}
          style={{ marginTop: 24 }}
        />
      </div>

      {/* Report Modal */}
      <Modal
        title="Report Summary"
        open={reportVisible}
        onCancel={() => setReportVisible(false)}
        width={700}
        footer={[
          <Button key="close" onClick={() => setReportVisible(false)}>Close</Button>,
          <Button key="export" type="primary" onClick={handleExportPDF}>Export as PDF</Button>,
        ]}
      >
        {reportData && (
          <div style={{ padding: '20px 0' }}>
            <p><strong>Sample ID:</strong> {reportData.sampleId}</p>
            <p><strong>Analysis Time:</strong> {reportData.timestamp}</p>
            <Divider />
            <p><strong>Risk Score:</strong> <span style={{ color: '#ff4d4f', fontSize: 18, fontWeight: 'bold' }}>{reportData.riskScore}/100</span></p>
            <p><strong>Status:</strong> <Tag color="red">{reportData.status}</Tag></p>
            <p><strong>Total Tests:</strong> {reportData.totalTests}</p>
            <p><strong>Failed Tests:</strong> {reportData.failedTests}</p>
            <p><strong>Suspicious Tests:</strong> {reportData.suspiciousTests}</p>
            <Divider />
            <Alert type="error" message="Action Required" description="This sample requires immediate attention and retest." style={{ marginBottom: 16 }} />
          </div>
        )}
      </Modal>
    </div>
  )
}

export default RiskReport
