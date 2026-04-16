import { Card, Row, Col, Table, Timeline, Select, Spin, message } from 'antd'
import { useEffect, useState } from 'react'
import { getDriftData } from '../data/api'

function DriftMonitor() {
  const [loading, setLoading] = useState(false)
  const [station, setStation] = useState('ICT-01')
  const [timeRange, setTimeRange] = useState('7d')
  const [versionData, setVersionData] = useState([])
  const [thresholdData, setThresholdData] = useState([])

  const loadData = async () => {
    setLoading(true)
    try {
      const resp = await getDriftData(station, timeRange)
      setVersionData(resp.data.versions || [])
      setThresholdData(resp.data.thresholds || [])
    } catch (error) {
      message.error('Failed to load drift data from backend API')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [station, timeRange])

  const columns = [
    { title: 'Test Item', dataIndex: 'test', key: 'test' },
    { title: 'Baseline', dataIndex: 'standard', key: 'standard' },
    { title: 'Current', dataIndex: 'current', key: 'current' },
    { title: 'Deviation', dataIndex: 'delta', key: 'delta', render: (d) => <span style={{ color: '#ff4d4f' }}>{d}</span> },
  ]

  return (
    <Spin spinning={loading}>
      <div>
        <div className="page-header" style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%)' }}>
          <h1>📐 Drift Monitor</h1>
          <p>Monitor threshold changes and test script versions from real SECOM data</p>
          <div style={{ marginTop: 8 }}>
            <Select
              value={station}
              onChange={setStation}
              style={{ width: 140, marginRight: 12 }}
              options={[
                { label: 'ICT-01', value: 'ICT-01' },
                { label: 'FCT-02', value: 'FCT-02' },
                { label: 'ICT-03', value: 'ICT-03' },
                { label: 'All', value: 'all' },
              ]}
            />
            <Select
              value={timeRange}
              onChange={setTimeRange}
              style={{ width: 140 }}
              options={[
                { label: 'Last 24h', value: '24h' },
                { label: 'Last 7d', value: '7d' },
                { label: 'Last 30d', value: '30d' },
              ]}
            />
          </div>
          <div style={{ marginTop: 8 }}>
            <span style={{ color: '#fff', fontSize: 12, opacity: 0.9 }}>Data Source: Kaggle UCI SECOM</span>
          </div>
        </div>

        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col span={24}>
            <Card size="small" style={{ background: '#f8fbff' }}>
              <strong>Current Selection:</strong> {station} / {timeRange}
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col span={12}>
            <Card title="📊 Version Timeline">
              <Timeline
                items={versionData.map((v) => ({
                  color: v.status === 'current' ? 'blue' : v.status === 'warning' ? 'orange' : 'green',
                  children: (
                    <div>
                      <strong>{v.version}</strong>
                      <span style={{ marginLeft: 12, color: '#999' }}>{v.date}</span>
                    </div>
                  ),
                }))}
              />
            </Card>
          </Col>

          <Col span={12}>
            <Card title="⚙️ Threshold Comparison">
              <Table dataSource={thresholdData} columns={columns} pagination={false} />
            </Card>
          </Col>
        </Row>
      </div>
    </Spin>
  )
}

export default DriftMonitor
