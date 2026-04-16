/**
 * TrendChart - 趋势图表组件
 */

import React from 'react'
import { Card } from 'antd'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

/**
 * 时间序列趋势图表
 * @param {array} data - 数据数组，包含 {date, count} 等字段
 * @param {string} dataKey - 要渲染的数据键名
 * @param {string} title - 卡片标题
 * @param {string} color - 线条颜色
 * @param {boolean} fill - 是否填充区域
 * @param {function} onPointClick - 点击数据点的回调
 */
const TrendChart = ({
  data = [],
  dataKey = 'count',
  title = 'Trend Chart',
  color = '#faad14',
  fill = true,
  onPointClick,
}) => {
  const handleClick = (data) => {
    if (onPointClick) {
      onPointClick(data)
    }
  }

  return (
    <Card title={title}>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, r: 4 }}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
            onClick={(data) => handleClick(data)}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default TrendChart
