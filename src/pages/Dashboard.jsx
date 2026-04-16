import { Card, Row, Col, Table, Tag, Statistic, Button, Space, Select, Spin, Modal, Alert, Tooltip, message, Timeline } from 'antd'
import { TeamOutlined, WarningOutlined, ThunderboltOutlined, CheckCircleOutlined, ReloadOutlined, DownloadOutlined, ArrowUpOutlined, ArrowDownOutlined, FilePdfOutlined, FileExcelOutlined } from '@ant-design/icons'
import { useEffect, useMemo, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import html2pdf from 'html2pdf.js'
import { getDashboardData, refreshDashboardData } from '../data/api'

function Dashboard() {
  const [dateRange, setDateRange] = useState('7d')
  const [station, setStation] = useState('all')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    metrics: { totalTests: 0, falsePassDetected: 0, highRiskAlerts: 0, systemConfidence: 0 },
    trendData: [],
    stations: [],
    riskDistribution: [
      { name: 'Low Risk', value: 0 },
      { name: 'Medium Risk', value: 0 },
      { name: 'High Risk', value: 0 },
    ],
    dataSource: 'Kaggle UCI SECOM',
    datasetDescription: 'Semiconductor manufacturing process control data, mapped into station analytics.',
    provenance: {
      datasetSource: 'Kaggle UCI SECOM',
      dataPath: '',
      rowCount: 0,
      selectedRows: 0,
      lastRefreshed: '',
      timeRange: '7d',
      station: 'all',
    },
    keyInsight: '',
    evidenceChain: [],
  })
  const [previousSnapshot, setPreviousSnapshot] = useState(null)

  const fetchDashboard = async () => {
    setLoading(true)
    try {
      const stationParam = station === 'all' ? 'all' : station
      const resp = await getDashboardData(dateRange, stationParam)
      if (data.provenance?.lastRefreshed) {
        setPreviousSnapshot({
          filters: { dateRange, station },
          metrics: data.metrics,
          keyInsight: data.keyInsight,
          timestamp: data.provenance.lastRefreshed,
        })
      }
      setData(resp.data)
    } catch (error) {
      message.error('Failed to load dashboard from backend API')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [dateRange, station])

  const metrics = useMemo(() => [
    {
      title: 'Total Tests',
      value: data.metrics.totalTests,
      icon: TeamOutlined,
      color: '#1890ff',
      trend: 8,
      up: true,
    },
    {
      title: 'False Pass Rate',
      value: data.metrics.falsePassDetected,
      icon: WarningOutlined,
      color: '#ff7a45',
      trend: 4,
      up: false,
    },
    {
      title: 'High Risk Items',
      value: data.metrics.highRiskAlerts,
      icon: ThunderboltOutlined,
      color: '#faad14',
      trend: 2,
      up: false,
    },
    {
      title: 'System Confidence',
      value: `${data.metrics.systemConfidence}%`,
      icon: CheckCircleOutlined,
      color: '#52c41a',
      trend: 3,
      up: true,
    },
  ], [data.metrics])

  const columns = [
    { title: 'Station', dataIndex: 'station', key: 'station', width: 120, render: (text) => <span style={{ fontWeight: 600 }}>{text}</span> },
    { title: 'Status', dataIndex: 'status', render: (s) => <Tag color={s === 'Running' ? '#52c41a' : '#faad14'}>{s}</Tag>, width: 100 },
    { title: 'Output', dataIndex: 'output', key: 'output', width: 100, align: 'right' },
    { title: 'Risks', dataIndex: 'risks', width: 70, align: 'center', render: (r) => <Tag color={r > 3 ? '#ff4d4f' : '#faad14'}>{r}</Tag> },
    { title: 'Yield Rate', dataIndex: 'yield', render: (v) => <span style={{ color: '#52c41a', fontWeight: 600 }}>{v}%</span>, width: 100, align: 'right' },
  ]

  const colors = ['#52c41a', '#faad14', '#ff4d4f']

  const handleRefresh = async () => {
    setLoading(true)
    try {
      const stationParam = station === 'all' ? 'all' : station
      const resp = await refreshDashboardData(dateRange, stationParam)
      if (data.provenance?.lastRefreshed) {
        setPreviousSnapshot({
          filters: { dateRange, station },
          metrics: data.metrics,
          keyInsight: data.keyInsight,
          timestamp: data.provenance.lastRefreshed,
        })
      }
      setData(resp.data)
      message.success('Data refreshed from SECOM dataset')
    } catch (error) {
      message.error('Refresh failed')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleExportCSV = () => {
    const headers = ['Station', 'Status', 'Output', 'Risks', 'Yield Rate']
    const rows = data.stations.map((s) => [s.station, s.status, s.output, s.risks, `${s.yield}%`])

    let csv = headers.join(',') + '\n'
    rows.forEach((row) => {
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

  const handleExportPDF = async () => {
    const element = document.getElementById('dashboard-export')
    if (!element) {
      return
    }

    const tempElement = element.cloneNode(true)
    tempElement.id = 'dashboard-export-clone'
    tempElement.style.position = 'fixed'
    tempElement.style.left = '0'
    tempElement.style.top = '0'
    tempElement.style.width = '900px'
    tempElement.style.maxWidth = '900px'
    tempElement.style.background = '#ffffff'
    tempElement.style.padding = '24px'
    tempElement.style.zIndex = '9999'
    tempElement.style.pointerEvents = 'none'
    tempElement.style.boxSizing = 'border-box'
    document.body.appendChild(tempElement)

    const opt = {
      margin: 10,
      filename: `falsepass-hunter-dashboard-${station}-${dateRange}-${new Date().getTime()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
    }

    try {
      await html2pdf().set(opt).from(tempElement).save()
      message.success('Exported as PDF successfully!')
    } catch (error) {
      message.error('PDF export failed')
      console.error(error)
    } finally {
      document.body.removeChild(tempElement)
    }
  }

  const previousMetrics = previousSnapshot?.metrics
  const currentMetrics = data.metrics
  const totalTestsDelta = previousMetrics ? currentMetrics.totalTests - previousMetrics.totalTests : null
  const falsePassDelta = previousMetrics ? currentMetrics.falsePassDetected - previousMetrics.falsePassDetected : null
  const highRiskDelta = previousMetrics ? currentMetrics.highRiskAlerts - previousMetrics.highRiskAlerts : null
  const confidenceDelta = previousMetrics ? currentMetrics.systemConfidence - previousMetrics.systemConfidence : null
  const filtersChanged = previousSnapshot
    ? previousSnapshot.filters.dateRange !== dateRange || previousSnapshot.filters.station !== station
    : false

  const formatDelta = (value) => {
    if (value === null) {
      return 'n/a'
    }
    if (value === 0) {
      return '0'
    }
    return value > 0 ? `+${value}` : `${value}`
  }

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
        <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>📊 Dashboard</h2>
            <p style={{ margin: '8px 0 0', color: '#999', fontSize: 14 }}>Real-time monitoring and quality metrics from SECOM</p>
            <div style={{ marginTop: 8 }}>
              <Tag color="blue">Data Source: Kaggle UCI SECOM</Tag>
              <Tag color="geekblue" style={{ marginLeft: 8 }}>{data.datasetDescription}</Tag>
              <Button
                type="link"
                href="https://www.kaggle.com/datasets/paresh2047/uci-semcom"
                target="_blank"
                rel="noreferrer"
                style={{ padding: 0, marginLeft: 8, height: 'auto' }}
              >
                Open Kaggle Dataset
              </Button>
            </div>
          </div>
          <Space size="middle">
            <Tooltip title="Filter by station">
              <Select
                value={station}
                onChange={setStation}
                style={{ width: 150 }}
                options={[
                  { label: 'All Stations', value: 'all' },
                  { label: 'ICT-01', value: 'ICT-01' },
                  { label: 'FCT-02', value: 'FCT-02' },
                  { label: 'ICT-03', value: 'ICT-03' },
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
              <Button icon={<ReloadOutlined />} onClick={handleRefresh} size="large" style={{ borderRadius: 4, fontWeight: 600 }}>
                Refresh
              </Button>
            </Tooltip>
            <Tooltip title="Export dashboard">
              <Button icon={<DownloadOutlined />} onClick={showExportOptions} size="large" style={{ borderRadius: 4, fontWeight: 600 }}>
                Export
              </Button>
            </Tooltip>
          </Space>
        </div>

        {(dateRange !== '7d' || station !== 'all') && (
          <Alert
            message="Active Filters"
            description={`Time Range: ${dateRange === '24h' ? 'Last 24 Hours' : dateRange === '7d' ? 'Last 7 Days' : 'Last 30 Days'} | Station: ${station}`}
            type="info"
            showIcon
            closable
            style={{ marginBottom: 24 }}
          />
        )}

        <Card title="📌 Data Provenance & Why This Result" style={{ marginBottom: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <Row gutter={16}>
            <Col xs={24} lg={16}>
              <p style={{ marginTop: 0, marginBottom: 12, color: '#333' }}>{data.keyInsight || 'Loading explanation from backend...'}</p>
              <Space wrap>
                <Tag color="blue">Source: {data.provenance.datasetSource}</Tag>
                <Tag color="geekblue">Rows: {data.provenance.rowCount}</Tag>
                <Tag color="cyan">Selected: {data.provenance.selectedRows}</Tag>
                <Tag color="purple">Window: {data.provenance.timeRange}</Tag>
                <Tag color="magenta">Station: {data.provenance.station}</Tag>
              </Space>
            </Col>
            <Col xs={24} lg={8}>
              <div style={{ background: '#f8fbff', border: '1px solid #e6f4ff', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>Data file</div>
                <div style={{ wordBreak: 'break-all', fontSize: 13 }}>{data.provenance.dataPath || 'Loading...'}</div>
                <div style={{ fontSize: 12, color: '#666', marginTop: 12, marginBottom: 4 }}>Last refreshed</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{data.provenance.lastRefreshed || 'Loading...'}</div>
              </div>
            </Col>
          </Row>
        </Card>

        <Card title="🔗 Evidence Chain" style={{ marginBottom: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <Timeline
            items={(data.evidenceChain || []).map((item) => ({
              color: item.stage === 'Decision' ? 'red' : item.stage === 'Risk fusion' ? 'orange' : 'blue',
              children: (
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.stage}</div>
                  <div style={{ color: '#555', lineHeight: 1.7 }}>{item.detail}</div>
                </div>
              ),
            }))}
          />
        </Card>

        <Card title="Why changed?" style={{ marginBottom: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          {previousSnapshot ? (
            <Row gutter={16} align="middle">
              <Col xs={24} lg={16}>
                <p style={{ marginTop: 0, marginBottom: 12, color: '#333', lineHeight: 1.8 }}>
                  {filtersChanged
                    ? `The view changed from ${previousSnapshot.filters.dateRange} / ${previousSnapshot.filters.station} to ${dateRange} / ${station}. Smaller windows usually reduce total tests but make short-term shifts more visible.`
                    : 'Filters are unchanged. Any movement below comes from a fresh backend refresh against the same selection.'}
                </p>
                <Space wrap>
                  <Tag color={totalTestsDelta >= 0 ? 'green' : 'red'}>Tests {formatDelta(totalTestsDelta)}</Tag>
                  <Tag color={falsePassDelta >= 0 ? 'red' : 'green'}>False passes {formatDelta(falsePassDelta)}</Tag>
                  <Tag color={highRiskDelta >= 0 ? 'red' : 'green'}>High-risk {formatDelta(highRiskDelta)}</Tag>
                  <Tag color={confidenceDelta >= 0 ? 'green' : 'red'}>Confidence {formatDelta(confidenceDelta)}%</Tag>
                </Space>
              </Col>
              <Col xs={24} lg={8}>
                <div style={{ background: '#f8fbff', border: '1px solid #e6f4ff', borderRadius: 8, padding: 16 }}>
                  <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>Previous snapshot</div>
                  <div style={{ fontSize: 13, lineHeight: 1.8 }}>
                    {previousSnapshot.filters.dateRange} / {previousSnapshot.filters.station}
                    <br />
                    Refreshed at {previousSnapshot.timestamp}
                  </div>
                  <div style={{ fontSize: 12, color: '#666', marginTop: 12, marginBottom: 4 }}>Current key insight</div>
                  <div style={{ fontSize: 13, lineHeight: 1.8 }}>{data.keyInsight || 'Loading...'}</div>
                </div>
              </Col>
            </Row>
          ) : (
            <Alert type="info" showIcon message="Change tracking starts after the first refresh or filter switch." />
          )}
        </Card>

        <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
          {metrics.map((m, i) => {
            const Icon = m.icon
            return (
              <Col xs={24} sm={12} lg={6} key={i}>
                <Card style={{ borderTop: `4px solid ${m.color}`, cursor: 'pointer', transition: 'all 0.3s', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }} hoverable>
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

        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} lg={16}>
            <Card title="📈 Test Trend Analysis" style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.trendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <ResponsiveContainer width="52%" height={240}>
                  <PieChart>
                    <Pie data={data.riskDistribution} cx="50%" cy="50%" labelLine={false} outerRadius={60} dataKey="value">
                      {data.riskDistribution.map((_, index) => <Cell key={`cell-${index}`} fill={colors[index]} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ width: '48%', fontSize: 13, lineHeight: 1.8, whiteSpace: 'normal' }}>
                  {data.riskDistribution.map((item, index) => (
                    <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: colors[index], display: 'inline-block' }} />
                      <span>{item.name}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        <Card
          title="🏭 Test Station Status"
          style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
          extra={<Tooltip title={`Showing ${data.stations.length} stations`}><span style={{ fontSize: 12, color: '#999' }}>{data.stations.length} stations</span></Tooltip>}
        >
          <Table dataSource={data.stations} columns={columns} pagination={false} rowKey="id" bordered style={{ borderRadius: 8 }} />
        </Card>

        <div id="dashboard-export" style={{ position: 'fixed', left: '-10000px', top: 0, width: '900px', background: '#ffffff', padding: '24px' }}>
          <h1>Dashboard Report</h1>
          <p>Generated: {new Date().toLocaleString()}</p>
          <p>Data Source: Kaggle UCI SECOM</p>
          <p>Dataset Path: {data.provenance.dataPath}</p>
          <p>Selected Window: {data.provenance.timeRange} | Station: {data.provenance.station}</p>
          <p>Insight: {data.keyInsight}</p>
          <p>Evidence Chain: {(data.evidenceChain || []).map((item) => `${item.stage}: ${item.detail}`).join(' | ')}</p>
          {previousSnapshot && (
              <p>
                Why changed: {previousSnapshot.filters.dateRange} / {previousSnapshot.filters.station} {'->'} {dateRange} / {station};
                Tests {formatDelta(totalTestsDelta)}, False Passes {formatDelta(falsePassDelta)}, High Risk {formatDelta(highRiskDelta)}, Confidence {formatDelta(confidenceDelta)}%
              </p>
          )}
          <h2>Key Metrics</h2>
          <table>
            <thead>
              <tr><th>Metric</th><th>Value</th></tr>
            </thead>
            <tbody>
              <tr><td>Total Tests</td><td>{data.metrics.totalTests}</td></tr>
              <tr><td>False Pass Detected</td><td>{data.metrics.falsePassDetected}</td></tr>
              <tr><td>High Risk Alerts</td><td>{data.metrics.highRiskAlerts}</td></tr>
              <tr><td>System Confidence</td><td>{data.metrics.systemConfidence}%</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </Spin>
  )
}

export default Dashboard
