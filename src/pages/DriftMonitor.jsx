import { Card, Row, Col, Table, Tag, Timeline } from 'antd'

function DriftMonitor() {
  const versionData = [
    { version: 'v2.0', date: '2026-04-01', status: 'stable' },
    { version: 'v2.1', date: '2026-04-05', status: 'stable' },
    { version: 'v2.2', date: '2026-04-10', status: 'warning' },
    { version: 'v2.3', date: '2026-04-14', status: 'current' },
  ]

  const thresholdData = [
    { key: '1', test: 'VOLT-01', standard: 10, current: 10.5, delta: '+5%' },
    { key: '2', test: 'VOLT-02', standard: 12, current: 12.1, delta: '+0.8%' },
    { key: '3', test: 'CURR-01', standard: 5, current: 5.2, delta: '+4%' },
  ]

  const columns = [
    { title: 'Test Item', dataIndex: 'test', key: 'test' },
    { title: 'Standard', dataIndex: 'standard', key: 'standard' },
    { title: 'Current', dataIndex: 'current', key: 'current' },
    { title: 'Deviation', dataIndex: 'delta', key: 'delta', render: (d) => <span style={{ color: '#ff4d4f' }}>{d}</span> },
  ]
  return (
    <div>
      <div className="page-header" style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%)' }}>
        <h1>📐 Drift Monitor</h1>
        <p>Monitor threshold changes and test script versions</p>
      </div>

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
  )
}

export default DriftMonitor
