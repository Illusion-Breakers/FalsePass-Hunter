import { Card, Row, Col, Table, Tag, Statistic, Button, Space, Select, Spin, Modal, Alert, Tooltip, message } from 'antd'
import { TeamOutlined, WarningOutlined, ThunderboltOutlined, CheckCircleOutlined, ReloadOutlined, DownloadOutlined, ArrowUpOutlined, ArrowDownOutlined, FilePdfOutlined, FileExcelOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
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

  if (!dashboardData) return <Spin size="large" />

  const metrics = [
    { title: 'Total Tests', value: dashboardData.metrics.totalTests, icon: TeamOutlined, color: '#1890ff', trend: 12, up: true },
    { title: 'False Pass Detected', value: dashboardData.metrics.falsePassDetected, icon: WarningOutlined, color: '#ff7a45', trend: 5, up: false },
    { title: 'High Risk Alerts', value: dashboardData.metrics.highRiskAlerts, icon: ThunderboltOutlined, color: '#faad14', trend: 2, up: false },
    { title: 'System Confidence', value: dashboardData.metrics.systemConfidence + '%', icon: CheckCircleOutlined, color: '#52c41a', trend: 3, up: true },
  ]

  const columns = [
    { title: 'Station', dataIndex: 'station', key: 'station', width: 120, render: (text) => <span style={{ fontWeight: 600 }}>{text}</span> },
    { title: 'Status', dataIndex: 'status', render: (s) => <Tag color={s === 'running' ? '#52c41a' : '#faad14'}>{s.toUpperCase()}</Tag>, width: 100 },
    { title: 'Output', dataIndex: 'output', key: 'output', width: 100, align: 'right' },
    { title: 'Risks', dataIndex: 'risks', width: 70, align: 'center', render: (r) => <Tag color={r > 3 ? '#ff4d4f' : '#faad14'}>{r}</Tag> },
  ]

  const riskPie = [{ name: 'Low Risk', value: 65 }, { name: 'Medium Risk', value: 25 }, { name: 'High Risk', value: 10 }]
  const colors = ['#52c41a', '#faad14', '#ff4d4f']

  // Refresh Handler
  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => {
      refreshData()
      message.success('Data refreshed successfully!')
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
    message.success('Exported as CSV successfully!')
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
    message.success('Exported as PDF successfully!')
  }

  // Show export options
  const showExportOptions = () => {
    Modal.confirm({
      title: 'Export Dashboard',
      content: 'Choose export format:',
      footer: [
        <Button key="cancel" onClick={() => Modal.destroyAll()}>Cancel</Button>,
        <Button key="csv" type="primary" icon={<FileExcelOutlined />} onClick={() => {
          handleExportCSV()
          Modal.destroyAll()
        }}>Export CSV</Button>,
        <Button key="pdf" icon={<FilePdfOutlined />} onClick={() => {
          handleExportPDF()
          Modal.destroyAll()
        }}>Export PDF</Button>,
      ],
    })
  }

  return (
    <Spin spinning={loading}>
      <div>
        {/* Header */}
        <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>📊 Dashboard</h2>
            <p style={{ margin: '8px 0 0', color: '#999', fontSize: 14 }}>Real-time monitoring and quality metrics</p>
          </div>
          <Space size="middle">
            <Tooltip title="Filter by station">
              <Select 
                value={station} 
                onChange={setStation}
                style={{ width: 150 }} 
                options={[
                  { label: 'All Stations', value: 'all' },
                  { label: 'ICT-01', value: 'ict01' },
                  { label: 'FCT-02', value: 'fct02' },
                ]} 
              />
            </Tooltip>
            <Tooltip title="Select time range for trends">
              <Select 
                value={dateRange} 
                onChange={setDateRange}
                style={{ width: 140 }} 
                options={[
                  { label: 'Last 24h', value: '24h' },
                  { label: 'Last 7d', value: '7d' },
                  { label: 'Last 30d', value: '30d' },
                ]} 
              />
            </Tooltip>
            <Tooltip title="Refresh dashboard data">
              <Button 
                icon={<ReloadOutlined />} 
                onClick={handleRefresh}
                size="large"
                style={{ borderRadius: 4, fontWeight: 600 }}
              >
                Refresh
              </Button>
            </Tooltip>
            <Tooltip title="Export dashboard">
              <Button 
                icon={<DownloadOutlined />}
                onClick={showExportOptions}
                size="large"
                style={{ borderRadius: 4, fontWeight: 600 }}
              >
                Export
              </Button>
            </Tooltip>
          </Space>
        </div>

        {/* Active Filters Alert */}
        {(dateRange !== '7d' || station !== 'all') && (
          <Alert 
            message="Active Filters" 
            description={`Time Range: ${dateRange === '24h' ? 'Last 24 Hours' : dateRange === '7d' ? 'Last 7 Days' : 'Last 30 Days'} | Station: ${station === 'all' ? 'All Stations' : station.toUpperCase()}`}
            type="info"
            showIcon
            closable
            style={{ marginBottom: 24 }}
          />
        )}

        {/* Metrics Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
          {metrics.map((m, i) => {
            const Icon = m.icon
            return (
              <Col xs={24} sm={12} lg={6} key={i}>
                <Card 
                  style={{ 
                    borderTop: `4px solid ${m.color}`, 
                    cursor: 'pointer', 
                    transition: 'all 0.3s',
                    borderRadius: 8,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }} 
                  hoverable
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ margin: 0, color: '#666', fontSize: 12, fontWeight: 500 }}>{m.title}</p>
                      <h3 style={{ margin: '8px 0 0 0', fontSize: 28, fontWeight: 800, color: m.color }}>{m.value}</h3>
                      <p style={{ margin: '4px 0 0 0', fontSize: 12, color: m.up ? '#52c41a' : '#ff4d4f' }}>
                        {m.up ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {m.trend}% vs last period
                      </p>
                    </div>
                    <div style={{ fontSize: 32, color: m.color, opacity: 0.2 }}><Icon /></div>
                  </div>
                </Card>
              </Col>
            )
          })}
        </Row>

        {/* Charts */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} lg={16}>
            <Card title="📈 Test Trend Analysis" style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#999" />
                  <YAxis stroke="#999" />
                  <RechartTooltip contentStyle={{ borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }} />
                  <Legend />
                  <Line type="monotone" dataKey="tests" stroke="#1890ff" strokeWidth={3} name="Total Tests" dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="falsePass" stroke="#ff7a45" strokeWidth={3} name="False Pass" dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="🎯 Risk Distribution" style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={riskPie} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name} ${value}%`} outerRadius={80} dataKey="value">
                    {riskPie.map((_, index) => <Cell key={`cell-${index}`} fill={colors[index]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>

        {/* Station Status Table */}
        <Card
          title="🏭 Test Station Status"
          style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
          extra={
            <Tooltip title={`Showing ${filteredStations.length} stations`}>
              <span style={{ fontSize: 12, color: '#999' }}>{filteredStations.length} stations</span>
            </Tooltip>
          }
        >
          <Table 
            dataSource={filteredStations} 
            columns={columns} 
            pagination={false} 
            rowKey="id"
            bordered
            style={{ borderRadius: 8 }}
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
                  <td>{m.value}</td>
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
                <th>Yield</th>
              </tr>
            </thead>
            <tbody>
              {filteredStations.map(s => (
                <tr key={s.id}>
                  <td>{s.station}</td>
                  <td>{s.status}</td>
                  <td>{s.output}</td>
                  <td>{s.risks}</td>
                  <td>{s.yield}%</td>
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
