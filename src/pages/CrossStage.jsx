import { Card, Table, Tag, Progress, Spin, message } from 'antd'
import { useEffect, useState } from 'react'
import { getCrossStageData } from '../data/api'

function CrossStage() {
  const [loading, setLoading] = useState(false)
  const [sampleData, setSampleData] = useState([])

  const loadData = async () => {
    setLoading(true)
    try {
      const resp = await getCrossStageData('all', '7d')
      setSampleData(resp.data.samples || [])
    } catch (error) {
      message.error('Failed to load cross-stage data from backend API')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const columns = [
    { title: 'Sample ID', dataIndex: 'sampleId', key: 'sampleId' },
    { title: 'Test Station', dataIndex: 'station', key: 'station' },
    { title: 'Result', dataIndex: 'result', render: () => <Tag color="green">✅ PASS</Tag> },
    { title: 'Issue', dataIndex: 'issue', key: 'issue' },
    { title: 'Risk', dataIndex: 'risk', render: (num) => <Progress percent={num} size="small" format={() => `${num}%`} /> },
  ]

  return (
    <Spin spinning={loading}>
      <div>
        <div className="page-header" style={{ background: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)' }}>
          <h1>🔗 Cross-Stage Analysis</h1>
          <p>Correlate pass samples with downstream risk using real SECOM signals</p>
        </div>

        <Card title="📋 Sample Traceability">
          <Table dataSource={sampleData} columns={columns} pagination={false} />
        </Card>
      </div>
    </Spin>
  )
}

export default CrossStage
