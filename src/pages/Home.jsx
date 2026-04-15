import { Link } from 'react-router-dom'
import { Button, Row, Col, Card, Statistic, Space, Alert, Table, Progress } from 'antd'
import { ArrowRightOutlined, FastForwardOutlined, AlertOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import '../styles/home.css'

function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Problem data
  const problems = [
    {
      emoji: '📉',
      title: 'Incomplete Coverage',
      desc: 'Test scripts may have gaps where boundary conditions are never truly validated, allowing defective products to pass unnoticed.',
      color: '#ff4d4f'
    },
    {
      emoji: '⚙️',
      title: 'Threshold Drift',
      desc: 'Threshold settings that are too wide allow anomalies to pass. Small drifts accumulate into significant quality issues.',
      color: '#ff7a45'
    },
    {
      emoji: '🔧',
      title: 'Fixture Degradation',
      desc: 'Aging fixtures and worn probes cause contact instability, leading to readings that appear normal but mask underlying defects.',
      color: '#faad14'
    },
    {
      emoji: '🔄',
      title: 'Missing Feedback Loop',
      desc: 'Issues recurring at rework stations don\'t feed back into the testing side, so the same false passes continue to slip through.',
      color: '#722ed1'
    }
  ]

  // Solution modules
  const modules = [
    {
      emoji: '📐',
      title: 'Drift Monitor',
      desc: 'Monitors deviations in test scripts, thresholds, and waveform statistics compared to historical golden baselines.'
    },
    {
      emoji: '🔗',
      title: 'Cross-Stage Validator',
      desc: 'Correlates test-passed samples with subsequent rework and downstream anomalies. Identifies patterns of false passes.'
    },
    {
      emoji: '📝',
      title: 'Log Reasoning Agent',
      desc: 'LLM-powered analysis of error logs, engineering notes, and version descriptions for intelligent insights.'
    },
    {
      emoji: '📊',
      title: 'Risk Scorer',
      desc: 'Synthesizes numerical anomalies, version changes, and historical rework information into comprehensive risk scores.'
    }
  ]

  // Innovations
  const innovations = [
    {
      num: 1,
      title: 'Focus on False Pass',
      desc: 'We target "passed but untrustworthy" - a sharper, more focused approach than traditional anomaly detection.'
    },
    {
      num: 2,
      title: 'Credibility Over Result',
      desc: 'Upgrading from "pass/fail classification" to "pass result credibility assessment" for quality assurance.'
    },
    {
      num: 3,
      title: 'Rework Knowledge Feedback',
      desc: 'Rework and downstream results feed back to train the testing side\'s risk perception continuously.'
    },
    {
      num: 4,
      title: 'Numerical + Text Reasoning',
      desc: 'Both waveform/threshold drift analysis AND engineering notes and version descriptions combined.'
    },
    {
      num: 5,
      title: 'Fixture Health Prediction',
      desc: 'Predictive maintenance based on probe usage count, contact resistance trends, and historical patterns.'
    },
    {
      num: 6,
      title: 'Threshold Optimization',
      desc: 'Data-driven threshold recommendations balancing false positive and false negative costs effectively.'
    }
  ]

  // Dashboard stats
  const stats = [
    { label: "Today's Tests", value: '1,248', color: '#1890ff' },
    { label: 'False Pass Detected', value: '17', color: '#faad14' },
    { label: 'High Risk Alerts', value: '5', color: '#ff4d4f' },
    { label: 'System Confidence', value: '94.2%', color: '#52c41a' }
  ]

  // Production line data
  const lineData = [
    { station: 'ICT-01', status: '🟢 Running', output: 1248, risk: 3, statusColor: '#52c41a' },
    { station: 'FCT-02', status: '🟢 Running', output: 986, risk: 1, statusColor: '#52c41a' },
    { station: 'ICT-03', status: '🟡 Warning', output: 756, risk: 5, statusColor: '#faad14' }
  ]

  // Fixture health
  const fixtures = [
    { name: 'ICT-01 Fixture #A01', health: 85, status: 'Good', color: '#52c41a' },
    { name: 'ICT-03 Fixture #B02', health: 58, status: 'Needs Inspection', color: '#faad14' },
    { name: 'FCT-02 Fixture #C03', health: 72, status: 'Good', color: '#52c41a' }
  ]

  const tableColumns = [
    {
      title: 'Station',
      dataIndex: 'station',
      key: 'station',
      render: (text) => <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{text}</span>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => <span style={{ color: record.statusColor }}>{text}</span>
    },
    {
      title: 'Output',
      dataIndex: 'output',
      key: 'output'
    },
    {
      title: 'Risk Count',
      dataIndex: 'risk',
      key: 'risk'
    }
  ]

  return (
    <div className="home-container" style={{ background: '#ffffff', width: '100%', pointerEvents: 'auto' }}>
      {/* Hero Section */}
      <section 
        className="hero-section" 
        style={{ 
          background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
          padding: '4rem 2rem',
          textAlign: 'center',
          minHeight: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          position: 'relative',
          zIndex: 1
        }}
      >
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'white', position: 'relative', zIndex: 10 }}>
          🔍 FalsePass Hunter AI
        </h1>
        <p style={{ fontSize: '1.5rem', opacity: 0.95, marginBottom: '2rem', maxWidth: 800, color: 'white', position: 'relative', zIndex: 10 }}>
          Hidden False Pass Detection System for Test Engineering
        </p>
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          padding: '1.5rem 2rem',
          borderRadius: 8,
          marginTop: '2rem',
          fontStyle: 'italic',
          borderLeft: '4px solid #fbbf24',
          maxWidth: 700,
          color: 'white',
          position: 'relative',
          zIndex: 10
        }}>
          "The most dangerous product in a factory is not the one that fails testing.<br/>
          It's the one that has problems but 'passed testing' anyway."
        </div>
        <Space size="large" style={{ marginTop: '2rem', pointerEvents: 'auto', position: 'relative', zIndex: 10 }}>
          <Button 
            type="primary" 
            size="large"
            icon={<FastForwardOutlined />}
            onClick={() => { window.location.href = '/dashboard' }}
            style={{ 
              borderRadius: 4, 
              height: 48, 
              fontSize: 16, 
              fontWeight: 600,
              background: '#ffd700',
              border: 'none',
              color: '#001529',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              pointerEvents: 'auto'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ffed4e'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 215, 0, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffd700'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            View Dashboard
          </Button>
          <Button 
            size="large"
            icon={<ArrowRightOutlined />}
            onClick={() => document.getElementById('problem-section').scrollIntoView({ behavior: 'smooth' })}
            style={{ 
              borderRadius: 4, 
              height: 48, 
              fontSize: 16,
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid white',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              pointerEvents: 'auto'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 255, 255, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Learn More
          </Button>
        </Space>
      </section>

      {/* Alert Banner */}
      <Alert
        message="Current Risk Alert"
        description="3 high-risk false pass samples detected on Production Line A - ICT-01 station requires immediate inspection"
        type="warning"
        icon={<AlertOutlined />}
        style={{ margin: '2rem auto', maxWidth: 1400, background: 'linear-gradient(135deg, #fff7e6 0%, #fffbe6 100%)', border: '1px solid #ffd666' }}
        closable
      />

      {/* Problem Section */}
      <section 
        id="problem-section"
        style={{ 
          padding: '5rem 2rem', 
          maxWidth: 1400, 
          margin: '0 auto',
          background: 'linear-gradient(135deg, #fff5f7 0%, #f5f8ff 100%)'
        }}
      >
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem', color: '#001529' }}>
          Why False Pass Detection Matters
        </h2>
        <p style={{ textAlign: 'center', color: '#666', fontSize: '1.2rem', marginBottom: '3rem' }}>
          Traditional testing catches failures. We catch what slips through.
        </p>
        <Row gutter={[24, 24]}>
          {problems.map((problem, idx) => (
            <Col xs={24} sm={12} lg={6} key={idx}>
              <Card
                hoverable
                style={{
                  borderLeft: `4px solid ${problem.color}`,
                  background: 'white',
                  height: '100%',
                  transition: 'all 0.3s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}
              >
                <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', color: '#001529' }}>
                  {problem.emoji} {problem.title}
                </h3>
                <p style={{ color: '#666', lineHeight: 1.8, margin: 0 }}>
                  {problem.desc}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Modules Section */}
      <section 
        style={{ 
          padding: '5rem 2rem', 
          maxWidth: 1400, 
          margin: '0 auto',
          background: 'linear-gradient(135deg, #f8f9ff 0%, #e8f4ff 100%)'
        }}
      >
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem', color: '#001529' }}>
          Our Solution Architecture
        </h2>
        <p style={{ textAlign: 'center', color: '#666', fontSize: '1.2rem', marginBottom: '3rem' }}>
          Integrated modules working together to assess test credibility
        </p>
        <Row gutter={[24, 24]}>
          {modules.map((module, idx) => (
            <Col xs={24} sm={12} lg={6} key={idx}>
              <Card
                style={{
                  textAlign: 'center',
                  borderRadius: 12,
                  height: '100%'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {module.emoji}
                </div>
                <h3 style={{ color: '#1890ff', marginBottom: '1rem', fontSize: '1.1rem' }}>
                  {module.title}
                </h3>
                <p style={{ color: '#666', lineHeight: 1.8 }}>
                  {module.desc}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Innovations Section */}
      <section 
        style={{ 
          padding: '5rem 2rem', 
          maxWidth: 1400, 
          margin: '0 auto',
          background: 'linear-gradient(135deg, #f5f8ff 0%, #f0f4ff 100%)'
        }}
      >
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem', color: '#001529' }}>
          Key Innovations
        </h2>
        <p style={{ textAlign: 'center', color: '#666', fontSize: '1.2rem', marginBottom: '3rem' }}>
          What makes FalsePass Hunter different from traditional anomaly detection
        </p>
        <Row gutter={[24, 24]}>
          {innovations.map((innovation) => (
            <Col xs={24} sm={12} key={innovation.num}>
              <div style={{ display: 'flex', gap: '1rem', padding: '1.5rem', background: 'white', borderRadius: 8, borderLeft: '4px solid #722ed1', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'all 0.3s' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #722ed1 0%, #a855f7 100%)',
                  color: 'white',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  {innovation.num}
                </div>
                <div>
                  <h4 style={{ color: '#001529', marginBottom: '0.5rem' }}>
                    {innovation.title}
                  </h4>
                  <p style={{ color: '#666', fontSize: '0.95rem', margin: 0 }}>
                    {innovation.desc}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </section>

      {/* Dashboard Preview Section */}
      <section 
        style={{ 
          padding: '5rem 2rem', 
          maxWidth: 1400, 
          margin: '0 auto',
          background: 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%)',
          color: 'white'
        }}
      >
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>
          Live Dashboard Preview
        </h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', marginBottom: '3rem' }}>
          Real-time monitoring of test credibility across all production lines
        </p>
        
        <Card style={{ borderRadius: 12, padding: '2rem', background: 'white', marginTop: '2rem' }}>
          <Row gutter={[24, 24]} style={{ marginBottom: '2rem' }}>
            {stats.map((stat, idx) => (
              <Col xs={24} sm={12} lg={6} key={idx}>
                <Card 
                  style={{ 
                    textAlign: 'center',
                    borderRadius: 8,
                    background: idx === 0 ? 'linear-gradient(135deg, #f8f9ff 0%, #e8f4ff 100%)' 
                               : idx === 1 ? 'linear-gradient(135deg, #fffbe6 0%, #ffe58f 100%)'
                               : idx === 2 ? 'linear-gradient(135deg, #fff1f0 0%, #ffccc7 100%)'
                               : 'linear-gradient(135deg, #f6ffed 0%, #d9f7be 100%)'
                  }}
                >
                  <Statistic
                    value={stat.value}
                    title={stat.label}
                    valueStyle={{ color: stat.color, fontSize: 28, fontWeight: 'bold' }}
                  />
                </Card>
              </Col>
            ))}
          </Row>

          <Row gutter={[32, 32]}>
            <Col xs={24} lg={12}>
              <h3 style={{ color: '#001529', marginBottom: '1rem' }}>🏭 Production Line Status</h3>
              <Table
                dataSource={lineData}
                columns={tableColumns}
                pagination={false}
                rowKey="station"
                size="small"
              />
            </Col>
            <Col xs={24} lg={12}>
              <h3 style={{ color: '#001529', marginBottom: '1rem' }}>🔧 Fixture Health</h3>
              {fixtures.map((fixture, idx) => (
                <div key={idx} style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#333' }}>{fixture.name}</span>
                    <span style={{ color: fixture.color, fontWeight: 600 }}>{fixture.status} ({fixture.health}%)</span>
                  </div>
                  <Progress percent={fixture.health} strokeColor={fixture.color} />
                </div>
              ))}
            </Col>
          </Row>
        </Card>
      </section>

      {/* Team Section */}
      <section 
        style={{ 
          padding: '5rem 2rem', 
          maxWidth: 1400, 
          margin: '0 auto',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>
          FalsePass Hunter Team
        </h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
          Dedicated to eliminating hidden quality issues in semiconductor testing
        </p>
        <p style={{ fontSize: '1.2rem' }}>
          ✨ Combining AI, data science, and <span style={{ color: '#faad14', fontWeight: 'bold' }}>deep domain expertise</span> for test engineering excellence
        </p>
      </section>

      {/* Footer */}
      <footer style={{ background: '#001529', color: 'white', textAlign: 'center', padding: '2rem' }}>
        <p style={{ margin: 0 }}>
          © 2024 FalsePass Hunter AI | Powered by Advanced Quality Testing Intelligence
        </p>
      </footer>
    </div>
  )
}

export default Home
