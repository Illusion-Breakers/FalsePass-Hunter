import { Card, Row, Col, Table, Tag, Statistic, Button, Space, Select, Spin, Modal, Alert, Tooltip, message } from 'antd'
import { TeamOutlined, WarningOutlined, ThunderboltOutlined, CheckCircleOutlined, ReloadOutlined, DownloadOutlined, ArrowUpOutlined, ArrowDownOutlined, FilePdfOutlined, FileExcelOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import html2pdf from 'html2pdf.js'
import { generateDashboardData } from '../data/mockData'

function Dashboard() {
  const [dateRange, setDateRange] = useState('7d')
  const [station, setStation] = useState('all')
  const [loading, setLoading] = useState(false)
  const [trendData, setTrendData] = useState([])
  const [filteredStations, setFilteredStations] = useState([])
  const [dashboardData, setDashboardData] = useState(null)

  // 生成动态数据
  const refreshData = () => {
    const data = generateDashboardData()
    setDashboardData(data)
  }

  // Update trend data when dateRange changes
  useEffect(() => {
    if (dashboardData) {
      setTrendData(dashboardData.trendData[dateRange])
      setFilteredStations(dashboardData.stations)
    }
  }, [dateRange, dashboardData])

  // Initialize data on mount
  useEffect(() => {
    refreshData()
  }, [])

  if (!dashboardData) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center' }}>
        <Spin size="large" style={{ marginBottom: 16 }} />
        <div style={{ color: '#1890ff', fontSize: 16, fontWeight: 600 }}>Loading Dashboard...</div>
      </div>
    </div>
  )

  const metrics = [
    { title: 'Total Tests', value: dashboardData.metrics.totalTests, icon: TeamOutlined, color: '#1890ff', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', trend: 12, up: true },
    { title: 'False Pass Detected', value: dashboardData.metrics.falsePassDetected, icon: WarningOutlined, color: '#ff7a45', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', trend: 5, up: false },
    { title: 'High Risk Alerts', value: dashboardData.metrics.highRiskAlerts, icon: ThunderboltOutlined, color: '#faad14', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', trend: 2, up: false },
    { title: 'System Confidence', value: dashboardData.metrics.systemConfidence + '%', icon: CheckCircleOutlined, color: '#52c41a', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', trend: 3, up: true },
  ]

  const columns = [
    { title: 'Station', dataIndex: 'station', key: 'station', width: 120, render: (text) => <span style={{ fontWeight: 700, color: '#001529' }}>{text}</span> },
    { title: 'Status', dataIndex: 'status', render: (s) => (
      <Tag color={s === 'running' ? '#52c41a' : '#faad14'} style={{ borderRadius: 4, fontWeight: 600, padding: '4px 12px' }}>
        {s === 'running' ? '✓' : '⚠'} {s.toUpperCase()}
      </Tag>
    ), width: 120 },
    { title: 'Output', dataIndex: 'output', key: 'output', width: 100, align: 'right', render: (v) => <span style={{ fontWeight: 600 }}>{v.toLocaleString()}</span> },
    { title: 'Risks', dataIndex: 'risks', width: 100, align: 'center', render: (r) => (
      <Tag color={r > 3 ? '#ff4d4f' : '#faad14'} style={{ borderRadius: 12, padding: '2px 10px', fontWeight: 600 }}>
        {r > 3 ? '🔴' : '🟡'} {r}
      </Tag>
    ) },
  ]

  const riskPie = [{ name: 'Low Risk', value: 65 }, { name: 'Medium Risk', value: 25 }, { name: 'High Risk', value: 10 }]
  const colors = ['#52c41a', '#faad14', '#ff4d4f']

  // Refresh Handler
  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => {
      refreshData()
      message.success('✨ Data refreshed successfully!')
      setLoading(false)
    }, 800)
  }

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Station', 'Status', 'Output', 'Risks']
    const rows = filteredStations.map(s => [s.station, s.status, s.output, s.risks])

    let csv = headers.join(',') + '\n'
    rows.forEach(row => {
      csv += row.join(',') + '\n'
    })

    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv))
    element.setAttribute('download', `dashboard-${new Date().getTime()}.csv`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    message.success('📊 Exported as CSV successfully!')
  }

  // Export to PDF
  const handleExportPDF = () => {
    const element = document.getElementById('dashboard-export')
    if (!element) return

    const opt = {
      margin: 10,
      filename: `dashboard-${new Date().getTime()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    }

    html2pdf().set(opt).from(element).save()
    message.success('📄 Exported as PDF successfully!')
  }

  // Show export options
  const showExportOptions = () => {
    Modal.confirm({
      title: '📤 Export Dashboard',
      content: 'Choose your preferred export format:',
      footer: [
        <Button key="cancel" onClick={() => Modal.destroyAll()}>Cancel</Button>,
        <Button key="csv" type="primary" icon={<FileExcelOutlined />} onClick={() => {
          handleExportCSV()
          Modal.destroyAll()
        }} style={{ background: '#52c41a' }}>Export CSV</Button>,
        <Button key="pdf" icon={<FilePdfOutlined />} onClick={() => {
          handleExportPDF()
          Modal.destroyAll()
        }} style={{ background: '#ff4d4f' }}>Export PDF</Button>,
      ],
    })
  }

  return (
    <Spin spinning={loading} indicator={<Spin size="large" style={{ color: '#1890ff' }} />}>
      <div style={{ animation: 'slideInUp 0.5s ease' }}>
        {/* Header */}
        <div className="page-header" style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 32, fontWeight: 800, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                📊 Dashboard
              </h2>
              <p style={{ margin: '8px 0 0', opacity: 0.95, fontSize: 15 }}>
                Real-time monitoring and quality metrics
              </p>
            </div>
            <Space size="middle">
              <Tooltip title="Filter by station">
                <Select
                  value={station}
                  onChange={setStation}
                  style={{ width: 160, borderRadius: 8 }}
                  options={[
                    { label: ' All Stations', value: 'all' },
                    { label: ' ICT-01', value: 'ict01' },
                    { label: '🔵 FCT-02', value: 'fct02' },
                  ]}
                />
              </Tooltip>
              <Tooltip title="Select time range for trends">
                <Select
                  value={dateRange}
                  onChange={setDateRange}
                  style={{ width: 150, borderRadius: 8 }}
                  options={[
                    { label: '🕐 Last 24h', value: '24h' },
                    { label: '📅 Last 7d', value: '7d' },
                    { label: '📆 Last 30d', value: '30d' },
                  ]}
                />
              </Tooltip>
              <Tooltip title="Refresh dashboard data">
                <Button
                  icon={<ReloadOutlined />}
                  onClick={handleRefresh}
                  size="large"
                  type="primary"
                  style={{ borderRadius: 8, fontWeight: 600 }}
                >
                  Refresh
                </Button>
              </Tooltip>
              <Tooltip title="Export dashboard">
                <Button
                  icon={<DownloadOutlined />}
                  onClick={showExportOptions}
                  size="large"
                  style={{ borderRadius: 8, fontWeight: 600 }}
                >
                  Export
                </Button>
              </Tooltip>
            </Space>
          </div>
        </div>

        {/* Active Filters Alert */}
        {(dateRange !== '7d' || station !== 'all') && (
          <Alert
            message="🔍 Active Filters"
            description={`Time Range: ${dateRange === '24h' ? 'Last 24 Hours' : dateRange === '7d' ? 'Last 7 Days' : 'Last 30 Days'} | Station: ${station === 'all' ? 'All Stations' : station.toUpperCase()}`}
            type="info"
            showIcon
            closable
            style={{ marginBottom: 24, borderRadius: 8, border: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
          />
        )}

        {/* Metrics Cards */}
        <Row gutter={[20, 20]} style={{ marginBottom: 32 }}>
          {metrics.map((m, i) => {
            const Icon = m.icon
            return (
              <Col xs={24} sm={12} lg={6} key={i}>
                <Card
                  className="stat-card"
                  style={{
                    borderTop: `5px solid ${m.color}`,
                    borderRadius: 12,
                    height: '100%',
                    background: m.gradient,
                    position: 'relative',
                    overflow: 'hidden',
                    animation: `scaleIn 0.5s ease ${i * 0.1}s backwards`,
                  }}
                  hoverable
                  bodyStyle={{ padding: '24px' }}
                >
                  {/* 背景装饰 */}
                  <div style={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    fontSize: 100,
                    opacity: 0.1,
                    transform: 'rotate(15deg)',
                  }}>
                    <Icon />
                  </div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {m.title}
                        </p>
                        <h3 style={{ margin: '12px 0 0 0', fontSize: 36, fontWeight: 800, color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
                          {typeof m.value === 'number' ? m.value.toLocaleString() : m.value}
                        </h3>
                        <p style={{ margin: '12px 0 0 0', fontSize: 13, color: 'rgba(255,255,255,0.95)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: 12 }}>
                          {m.up ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {m.trend}% vs last period
                        </p>
                      </div>
                      <div style={{ fontSize: 40, color: 'rgba(255,255,255,0.3)' }}>
                        <Icon />
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            )
          })}
        </Row>

        {/* Charts */}
        <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
          <Col xs={24} lg={16}>
            <Card
              title={
                <span style={{ fontSize: 17, fontWeight: 700 }}>
                  📈 Test Trend Analysis
                </span>
              }
              style={{ borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: 'none', animation: 'slideInUp 0.5s ease 0.2s backwards' }}
              headStyle={{ borderBottom: '2px solid rgba(24,144,255,0.1)', padding: '20px 24px' }}
              bodyStyle={{ padding: '20px' }}
            >
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTests" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1890ff" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#1890ff" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorFalsePass" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff7a45" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ff7a45" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="date" stroke="#999" style={{ fontSize: 12 }} tick={{ fill: '#666' }} />
                  <YAxis stroke="#999" style={{ fontSize: 12 }} tick={{ fill: '#666' }} />
                  <RechartTooltip
                    contentStyle={{ borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.15)', border: 'none', background: 'rgba(255,255,255,0.98)' }}
                    labelStyle={{ fontWeight: 600, color: '#001529' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: 10 }} />
                  <Area type="monotone" dataKey="tests" stroke="#1890ff" strokeWidth={3} fillOpacity={1} fill="url(#colorTests)" name="Total Tests" />
                  <Area type="monotone" dataKey="falsePass" stroke="#ff7a45" strokeWidth={3} fillOpacity={1} fill="url(#colorFalsePass)" name="False Pass" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card
              title={
                <span style={{ fontSize: 17, fontWeight: 700 }}>
                  🎯 Risk Distribution
                </span>
              }
              style={{ borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: 'none', animation: 'slideInUp 0.5s ease 0.3s backwards' }}
              headStyle={{ borderBottom: '2px solid rgba(24,144,255,0.1)', padding: '20px 24px' }}
              bodyStyle={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={riskPie}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1000}
                    label={({ name, value }) => `${name} (${value}%)`}
                    labelLine={false}
                  >
                    {riskPie.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index]}
                        style={{ outline: 'none' }}
                      />
                    ))}
                  </Pie>
                  <RechartTooltip />
                </PieChart>
              </ResponsiveContainer>
              {/* 中心文字 */}
              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#001529' }}>100%</div>
                <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>Total</div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Station Status Table */}
        <Card
          title={
            <span style={{ fontSize: 17, fontWeight: 700 }}>
              🏭 Test Station Status
            </span>
          }
          style={{ borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: 'none', animation: 'slideInUp 0.5s ease 0.4s backwards' }}
          headStyle={{ borderBottom: '2px solid rgba(24,144,255,0.1)', padding: '20px 24px' }}
          bodyStyle={{ padding: '20px' }}
          extra={
            <Tooltip title={`Showing ${filteredStations.length} stations`}>
              <Tag color="blue" style={{ borderRadius: 4, fontWeight: 600 }}>
                {filteredStations.length} Active
              </Tag>
            </Tooltip>
          }
        >
          <Table
            dataSource={filteredStations}
            columns={columns}
            pagination={false}
            rowKey="id"
            size="middle"
            scroll={{ x: 500 }}
          />
        </Card>

        {/* Hidden export content */}
        <div id="dashboard-export" style={{ display: 'none' }}>
          <h1>Dashboard Report</h1>
          <p>Generated: {new Date().toLocaleString()}</p>
          <h2>Key Metrics</h2>
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((m, i) => (
                <tr key={i}>
                  <td>{m.title}</td>
                  <td>{typeof m.value === 'number' ? m.value.toLocaleString() : m.value}</td>
                  <td>{m.up ? '↑' : '↓'} {m.trend}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Station Status</h2>
          <table>
            <thead>
              <tr>
                <th>Station</th>
                <th>Status</th>
                <th>Output</th>
                <th>Risks</th>
              </tr>
            </thead>
            <tbody>
              {filteredStations.map(s => (
                <tr key={s.id}>
                  <td>{s.station}</td>
                  <td>{s.status}</td>
                  <td>{s.output.toLocaleString()}</td>
                  <td>{s.risks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Spin>
  )
}

export default Dashboard
