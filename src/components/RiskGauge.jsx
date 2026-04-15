/**
 * RiskGauge - 风险评分仪表盘组件
 */

import React from 'react'
import { Card } from 'antd'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

/**
 * 风险评分仪表盘
 * @param {number} score - 风险评分 (0-100)
 * @param {string} level - 风险等级: 'low' | 'medium' | 'high'
 * @param {string} label - 自定义标签文字
 */
const RiskGauge = ({ score = 78, level = 'high', label = 'High Risk' }) => {
  const getLevelInfo = (lvl) => {
    const levels = {
      low: { color: '#52c41a', text: 'Low Risk' },
      medium: { color: '#faad14', text: 'Medium Risk' },
      high: { color: '#ff4d4f', text: 'High Risk' },
    }
    return levels[lvl] || levels.high
  }

  const levelInfo = getLevelInfo(level)
  const data = [
    { name: 'Risk', value: score },
    { name: 'Safe', value: 100 - score },
  ]

  return (
    <Card title="🎯 Overall Risk Score">
      <div style={{ textAlign: 'center' }}>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={50}
              outerRadius={70}
              startAngle={180}
              endAngle={0}
              dataKey="value"
            >
              <Cell fill={levelInfo.color} />
              <Cell fill="#f0f0f0" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: 36, margin: '16px 0', color: levelInfo.color }}>
            {score}/100
          </h2>
          <div
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: 4,
              backgroundColor: levelInfo.color,
              color: 'white',
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            ⚠️ {label || levelInfo.text}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default RiskGauge
