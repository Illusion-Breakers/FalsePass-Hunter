import { Card, Table, Tag, Progress } from 'antd'

const sampleData = [
  { key: '1', sampleId: 'SN001', station: 'ICT-01', result: 'PASS', issue: 'Cold Solder', risk: 92 },
  { key: '2', sampleId: 'SN045', station: 'FCT-02', result: 'PASS', issue: 'Short Circuit', risk: 87 },
  { key: '3', sampleId: 'SN089', station: 'ICT-03', result: 'PASS', issue: 'Open Circuit', risk: 75 },
]

function CrossStage() {
  const columns = [
    { title: 'Sample ID', dataIndex: 'sampleId', key: 'sampleId' },
    { title: 'Test Station', dataIndex: 'station', key: 'station' },
    { title: 'Result', dataIndex: 'result', render: () => <Tag color="green">✅ PASS</Tag> },
    { title: 'Issue', dataIndex: 'issue', key: 'issue' },
    { title: 'Risk', dataIndex: 'risk', render: (num) => <Progress percent={num} size="small" format={() => `${num}%`} />, },
  ]

  return (
    <div>
      <div className="page-header" style={{ background: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)' }}>
        <h1>🔗 Cross-Stage Analysis</h1>
        <p>Correlate defects between production stages</p>
      </div>

      <Card title="📋 Sample Traceability">
        <Table dataSource={sampleData} columns={columns} pagination={false} />
      </Card>
    </div>
  )
}

export default CrossStage
