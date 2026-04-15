import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { ConfigProvider, Layout, Menu } from 'antd'
import { HomeOutlined, DashboardOutlined, LineChartOutlined, LinkOutlined, FileTextOutlined, DesktopOutlined } from '@ant-design/icons'
import './styles/variables.css'
import './styles/global.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import DriftMonitor from './pages/DriftMonitor'
import CrossStage from './pages/CrossStage'
import RiskReport from './pages/RiskReport'
import LogAnalysis from './pages/LogAnalysis'

const { Sider, Content, Header } = Layout

function AppLayout({ children }) {
  const location = useLocation()
  const isHome = location.pathname === '/' || location.pathname === '/home'

  const menuItems = [
    { key: '/', icon: <HomeOutlined />, label: <Link to="/">Home</Link> },
    { key: '/dashboard', icon: <DashboardOutlined />, label: <Link to="/dashboard">Dashboard</Link> },
    { key: '/drift', icon: <LineChartOutlined />, label: <Link to="/drift">Drift Monitor</Link> },
    { key: '/cross-stage', icon: <LinkOutlined />, label: <Link to="/cross-stage">Cross-Stage</Link> },
    { key: '/risk', icon: <DesktopOutlined />, label: <Link to="/risk">Risk Analysis</Link> },
    { key: '/log', icon: <FileTextOutlined />, label: <Link to="/log">Log Analysis</Link> },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark" width={240} style={{ background: 'linear-gradient(180deg, #001529 0%, #0a2540 100%)', overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0 }}>
        <div style={{ height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 'bold', color: '#1890ff' }}>🔍</div>
            <h2 style={{ margin: 0, fontSize: 14, color: 'white', marginTop: 4 }}>FalsePass Hunter</h2>
          </div>
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems} style={{ marginTop: 16, border: 'none' }} />
      </Sider>
      <Layout style={{ marginLeft: 240 }}>
        <Header style={{ background: 'linear-gradient(90deg, #ffffff 0%, #f5f5f5 100%)', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', height: 70, position: 'sticky', top: 0, zIndex: 999 }}>
          <span style={{ fontSize: 18, fontWeight: 600, color: '#001529' }}>AI-Powered Quality Testing System</span>
          <span style={{ fontSize: 12, color: '#999' }}>v2.3 | 2026-04-15</span>
        </Header>
        <Content style={{ margin: isHome ? 0 : 32, padding: isHome ? 0 : 32, background: isHome ? '#ffffff' : '#f0f2f5', borderRadius: isHome ? 0 : 8, overflowY: 'auto', minHeight: 'calc(100vh - 134px)', pointerEvents: 'auto' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

function App() {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<AppLayout><Home /></AppLayout>} />
          <Route path="/" element={<AppLayout><Home /></AppLayout>} />
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/drift" element={<AppLayout><DriftMonitor /></AppLayout>} />
          <Route path="/cross-stage" element={<AppLayout><CrossStage /></AppLayout>} />
          <Route path="/risk" element={<AppLayout><RiskReport /></AppLayout>} />
          <Route path="/log" element={<AppLayout><LogAnalysis /></AppLayout>} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
