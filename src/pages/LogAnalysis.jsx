import { Card, Row, Col, Button, Input, Upload, Table, Tag, Space } from 'antd'
import { UploadOutlined, CopyOutlined } from '@ant-design/icons'
import { useState } from 'react'

function LogAnalysis() {
  const [logContent, setLogContent] = useState('')
  const [analysisResult, setAnalysisResult] = useState(null)

  const handleAnalyze = () => {
    if (!logContent) {
      alert('Please upload or paste log content')
      return
    }
    setAnalysisResult({
      issues: [
        { key: '1', type: 'Anomaly', count: 3, severity: 'high' },
        { key: '2', type: 'Threshold Deviation', count: 2, severity: 'medium' },
      ],
      confidence: 87.5,
      recommendation: 'Recommend calibration check for ICT-01 station',
    })
  }

  const columns = [
    { title: 'Issue Type', dataIndex: 'type', key: 'type' },
    { title: 'Count', dataIndex: 'count', key: 'count' },
    {
      title: 'Severity',
      dataIndex: 'severity',
      render: (s) => <Tag color={s === 'high' ? 'red' : s === 'medium' ? 'orange' : 'green'}>{s}</Tag>,
    },
  ]

  return (
    <div>
      <div className="page-header" style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' }}>
        <h1>🔬 Log Analysis</h1>
        <p>AI-powered intelligent log analysis</p>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card title="📝 Upload Log">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Upload>
                <Button icon={<UploadOutlined />}>Choose Log File</Button>
              </Upload>
              <p style={{ color: '#999' }}>Or paste log content directly:</p>
              <Input.TextArea
                rows={8}
                value={logContent}
                onChange={(e) => setLogContent(e.target.value)}
                placeholder="Paste log content..."
              />
              <Button type="primary" block onClick={handleAnalyze}>
                🤖 Analyze
              </Button>
            </Space>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="📊 Analysis Result">
            {analysisResult ? (
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <strong>Confidence:</strong> {analysisResult.confidence}%
                </div>
                <Table dataSource={analysisResult.issues} columns={columns} pagination={false} size="small" />
                <div style={{ padding: '12px', background: '#f0f5ff', borderRadius: 4 }}>
                  <strong>Recommendation:</strong> {analysisResult.recommendation}
                </div>
                <Button icon={<CopyOutlined />} block>
                  Copy Report
                </Button>
              </Space>
            ) : (
              <p style={{ color: '#999' }}>Upload a log file to see analysis results</p>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default LogAnalysis
