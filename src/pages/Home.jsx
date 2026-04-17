import { Link, useNavigate } from 'react-router-dom'
import { Button, Row, Col, Card, Statistic, Space, Alert, Table, Progress, Typography, Divider } from 'antd'
import { ArrowRightOutlined, FastForwardOutlined, AlertOutlined, RocketOutlined, SafetyOutlined, ThunderboltOutlined, CloudSynchronizationOutlined } from '@ant-design/icons'
import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import './home.css'

const { Title, Paragraph } = Typography

// 浮动粒子背景组件
function ParticleBackground() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="particle-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

// 渐变网格背景
function GradientGrid() {
  return (
    <div className="gradient-grid">
      <div className="gradient-cell" style={{ '--x': 0, '--y': 0 }} />
      <div className="gradient-cell" style={{ '--x': 1, '--y': 0 }} />
      <div className="gradient-cell" style={{ '--x': 2, '--y': 0 }} />
      <div className="gradient-cell" style={{ '--x': 3, '--y': 0 }} />
      <div className="gradient-cell" style={{ '--x': 0, '--y': 1 }} />
      <div className="gradient-cell" style={{ '--x': 1, '--y': 1 }} />
      <div className="gradient-cell" style={{ '--x': 2, '--y': 1 }} />
      <div className="gradient-cell" style={{ '--x': 3, '--y': 1 }} />
      <div className="gradient-cell" style={{ '--x': 0, '--y': 2 }} />
      <div className="gradient-cell" style={{ '--x': 1, '--y': 2 }} />
      <div className="gradient-cell" style={{ '--x': 2, '--y': 2 }} />
      <div className="gradient-cell" style={{ '--x': 3, '--y': 2 }} />
    </div>
  )
}

// 数据卡片组件
function StatCard({ icon, value, label, color, delay }) {
  return (
    <motion.div
      className="stat-card-wrapper"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, y: -10 }}
    >
      <div className="stat-card-inner" style={{ '--primary-color': color }}>
        <div className="stat-icon">{icon}</div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </motion.div>
  )
}

// 特性卡片组件
function FeatureCard({ emoji, title, desc, color, index }) {
  return (
    <motion.div
      className="feature-card-wrapper"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      whileHover={{ scale: 1.03, rotateY: 5 }}
    >
      <div className="feature-card" style={{ '--accent-color': color }}>
        <div className="feature-glow" />
        <div className="feature-content">
          <motion.span
            className="feature-emoji"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {emoji}
          </motion.span>
          <h3 className="feature-title">{title}</h3>
          <p className="feature-desc">{desc}</p>
          <div className="feature-line" />
        </div>
      </div>
    </motion.div>
  )
}

// 模块卡片组件
function ModuleCard({ emoji, title, desc, index }) {
  return (
    <motion.div
      className="module-card-wrapper"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -15, boxShadow: '0 25px 50px rgba(24, 144, 255, 0.3)' }}
    >
      <div className="module-card">
        <div className="module-emoji">{emoji}</div>
        <h3 className="module-title">{title}</h3>
        <p className="module-desc">{desc}</p>
        <div className="module-arrow">
          <ArrowRightOutlined />
        </div>
      </div>
    </motion.div>
  )
}

function Home() {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scaleProgress = useTransform(scrollYProgress, [0, 0.3], [1, 1.1])

  const problems = [
    { emoji: '📉', title: 'Incomplete Coverage', desc: 'Test scripts may have gaps where boundary conditions are never truly validated.', color: '#ff4d4f' },
    { emoji: '⚙️', title: 'Threshold Drift', desc: 'Threshold settings that are too wide allow anomalies to pass through.', color: '#ff7a45' },
    { emoji: '🔧', title: 'Fixture Degradation', desc: 'Aging fixtures and worn probes cause contact instability.', color: '#faad14' },
    { emoji: '🔄', title: 'Missing Feedback Loop', desc: 'Issues recurring at rework stations do not feed back into testing.', color: '#722ed1' },
  ]

  const modules = [
    { emoji: '📐', title: 'Drift Monitor', desc: 'Monitor test script deviations and threshold changes' },
    { emoji: '🔗', title: 'Cross-Stage', desc: 'Correlate defects between production stages' },
    { emoji: '📝', title: 'Log Analysis', desc: 'AI-powered intelligent log analysis' },
    { emoji: '📊', title: 'Risk Report', desc: 'Comprehensive risk assessment reports' },
  ]

  const stats = [
    { value: '1,567', label: 'Samples Analyzed', color: '#1890ff' },
    { value: '592', label: 'Parameters Tracked', color: '#722ed1' },
    { value: '94%', label: 'Detection Rate', color: '#52c41a' },
    { value: '<1s', label: 'Response Time', color: '#faad14' },
  ]

  return (
    <div className="home-page" ref={containerRef}>
      {/* Hero Section */}
      <section className="hero-section-fancy">
        <ParticleBackground />
        <GradientGrid />

        <motion.div
          className="hero-content"
          style={{ y: heroY, opacity: heroOpacity, scale: scaleProgress }}
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <RocketOutlined /> AI-Powered Quality Testing
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="title-gradient">FalsePass</span>
            <br />
            <span className="title-secondary">Hunter AI</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Detecting the undetectable — Finding false passes before they escape
          </motion.p>

          <motion.div
            className="hero-quote"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <span className="quote-icon">"</span>
            The most dangerous product is not the one that fails testing.
            <br />
            It is the one that has problems but passed testing anyway.
          </motion.div>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <Button
              type="primary"
              size="large"
              className="hero-btn-fancy"
              icon={<FastForwardOutlined />}
              onClick={() => navigate('/dashboard')}
            >
              Explore Dashboard
            </Button>
            <Button
              size="large"
              className="hero-btn-outline"
              icon={<ArrowRightOutlined />}
              onClick={() => {
                document.getElementById('problems-section').scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Learn More
            </Button>
          </motion.div>

          <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <div className="mouse" />
            <span>Scroll to explore</span>
          </motion.div>
        </motion.div>

        <div className="hero-wave">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,64 C288,120 576,0 864,64 C1152,128 1440,32 1440,32 L1440,120 L0,120 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section-fancy">
        <div className="stats-container">
          <Row gutter={[32, 32]} justify="center">
            {stats.map((stat, i) => (
              <Col xs={24} sm={12} lg={6} key={i}>
                <StatCard {...stat} index={i} delay={i * 0.1} />
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Problems Section */}
      <section id="problems-section" className="problems-section-fancy">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-tag">Why It Matters</span>
            <Title className="section-title">
              The Hidden Challenge in <span className="text-gradient">Quality Testing</span>
            </Title>
            <Paragraph className="section-desc">
              Traditional testing catches failures. We catch what slips through.
            </Paragraph>
          </motion.div>

          <Row gutter={[24, 24]}>
            {problems.map((problem, i) => (
              <Col xs={24} sm={12} lg={6} key={i}>
                <FeatureCard {...problem} index={i} />
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Modules Section */}
      <section className="modules-section-fancy">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-tag">Our Solution</span>
            <Title className="section-title">
              Integrated <span className="text-gradient">Architecture</span>
            </Title>
            <Paragraph className="section-desc">
              Four powerful modules working together to assess test credibility
            </Paragraph>
          </motion.div>

          <Row gutter={[32, 32]}>
            {modules.map((module, i) => (
              <Col xs={24} sm={12} lg={6} key={i}>
                <ModuleCard {...module} index={i} />
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section-fancy">
        <div className="cta-background">
          <div className="cta-glow-1" />
          <div className="cta-glow-2" />
        </div>
        <div className="cta-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ThunderboltOutlined className="cta-icon" />
            <Title className="cta-title">Ready to Transform Your Testing?</Title>
            <Paragraph className="cta-desc">
              Join the future of quality assurance with AI-powered false pass detection
            </Paragraph>
            <Button
              type="primary"
              size="large"
              className="cta-button"
              icon={<CloudSynchronizationOutlined />}
              onClick={() => navigate('/dashboard')}
            >
              Launch Dashboard
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer-fancy">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="footer-logo">🔍</span>
              <span className="footer-name">FalsePass Hunter AI</span>
            </div>
            <Divider type="vertical" className="footer-divider" />
            <div className="footer-tagline">
              Combining AI, data science, and deep domain expertise
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Illusion-Breakers Team. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
