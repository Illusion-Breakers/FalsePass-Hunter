/**
 * StatCard - 统计卡片组件
 */

import React from 'react'
import { Card, Statistic } from 'antd'

/**
 * 可复用的统计卡片
 * @param {string} title - 卡片标题
 * @param {number} value - 主要数值
 * @param {React.ReactNode} prefix - 值前缀（图标或文字）
 * @param {string} suffix - 值后缀（如 "%"）
 * @param {string} color - 数值颜色
 * @param {boolean} animated - 是否启用数值动画
 */
const StatCard = ({ title, value, prefix, suffix, color = '#1890ff', animated = true }) => {
  return (
    <Card
      className="stat-card"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Statistic
        title={title}
        value={value}
        prefix={prefix}
        suffix={suffix}
        valueStyle={{ color }}
        formatter={(v) => (animated ? v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : v)}
      />
    </Card>
  )
}

export default StatCard
