import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu, Alert } from 'antd'
import {
  DashboardOutlined,
  LineChartOutlined,
  LinkOutlined,
  FileTextOutlined,
  AlertOutlined
} from '@ant-design/icons'

const { Header, Sider, Content } = Layout

const menuItems = [
  { key: '/', icon: <DashboardOutlined />, label: '总览仪表盘' },
  { key: '/drift', icon: <LineChartOutlined />, label: '漂移监控' },
  { key: '/cross-stage', icon: <LinkOutlined />, label: '跨阶段分析' },
  { key: '/risk', icon: <FileTextOutlined />, label: '风险报告' }
]

function MainLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark" width={220}>
        <div style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #333'
        }}>
          <div style={{
            textAlign: 'center',
            color: 'white'
          }}>
            <h2 style={{ margin: 0, fontSize: 18 }}>🔍 FalsePass Hunter</h2>
            <p style={{ margin: 0, fontSize: 12, opacity: 0.7, marginTop: 4 }}>隐性漏测风险预警系统</p>
          </div>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ marginTop: 16 }}
        />

        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 16,
          borderTop: '1px solid #333',
          color: '#666',
          fontSize: 12
        }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: 0 }}>Illusion-Breakers</p>
            <p style={{ margin: '4px 0 0', opacity: 0.7 }}>HackDKU 2026</p>
          </div>
        </div>
      </Sider>

      <Layout>
        <Header style={{
          background: '#fff',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          height: 64
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <AlertOutlined style={{ color: '#ff4d4f', fontSize: 20 }} />
            <span style={{ color: '#666', fontSize: 14 }}>
              当前风险告警：<strong style={{ color: '#ff4d4f' }}>3</strong> 个高风险假通过样品待处理
            </span>
          </div>
          <div style={{ color: '#999', fontSize: 13 }}>
            立讯精密 TE 赛道 | HackDKU 2026
          </div>
        </Header>

        <Content style={{ margin: 24, padding: 24, background: '#fff', borderRadius: 8 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
