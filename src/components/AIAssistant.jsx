import { useState } from 'react'
import { Drawer, Button, Input, Message, Spin, Card, Divider } from 'antd'
import { RobotOutlined, SendOutlined, CloseOutlined } from '@ant-design/icons'

const { TextArea } = Input

// 预定义的知识库（离线回答，不需要 API）
const knowledgeBase = {
  '风险评分': '风险评分基于 4 个维度：测试数据异常、脚本版本漂移、治具健康度、历史返工记录。78 分表示高风险，建议立即关注。',
  '78 分': '78 分属于高风险范围（60-80 分）。这意味着该产品有多个参数偏离正常基线，建议复测或拦截。',
  '高风险': '高风险表示该产品可能是 False Pass（虚假通过）。虽然测试显示 PASS，但参数已经偏离健康状态。',
  'Z-score': 'Z-score 表示参数偏离健康基线的程度。Z>3 表示超过 3 倍标准差，属于异常。',
  '漂移': '漂移指测试参数随时间逐渐偏离初始值。可能原因包括：仪器老化、阈值放宽、环境变化。',
  'False Pass': 'False Pass（虚假通过）指测试显示通过，但实际有隐患的产品。传统测试抓不到这类问题。',
  '健康基线': '健康基线是从历史正常产品学习来的参数范围（均值±3 倍标准差），比规格限更严格。',
  'cohen': 'Cohen\'s d 是效应量指标，用于衡量参数的区分度。d>0.8 表示高度敏感参数。',
  '特征': '特征筛选从 592 个参数中选出 23 个敏感参数，加速检测 26 倍。',
  '建议': '系统根据风险分析生成优先级建议：立即行动（红色）、24 小时内（橙色）、3 天内（蓝色）、本周（绿色）。',
  '阈值': '阈值是判断参数是否正常的边界值。v2.2 版本放宽了阈值，可能引入 False Pass 风险。',
  '治具': '治具健康度基于使用次数、接触电阻趋势、历史故障率预测。低于 60% 建议检查。',
  '召回': '召回率 = 检出的 False Pass / 实际 False Pass 总数。我们的目标是不漏掉任何风险产品。',
  '误报': '误报率 = 正常产品被误判为风险的比例。Z-score 阈值可调，平衡灵敏度和准确性。',
  '你好': '你好！我是 FalsePass Hunter AI 助手，可以帮你解释分析结果、回答技术问题。试试问我："78 分代表什么？"',
  '介绍': 'FalsePass Hunter 是一个面向智能制造的质量分析平台，基于 Kaggle UCI SECOM 数据集，帮助工程师识别虚假通过产品。',
}

// 简单关键词匹配
function findAnswer(question) {
  const q = question.toLowerCase()
  for (const [keyword, answer] of Object.entries(knowledgeBase)) {
    if (q.includes(keyword.toLowerCase())) {
      return answer
    }
  }
  return null
}

// 生成上下文相关回答
function generateAnswer(question, context = {}) {
  // 先尝试知识库匹配
  const kbAnswer = findAnswer(question)
  if (kbAnswer) {
    return kbAnswer
  }

  // 默认回答
  return '这个问题我需要更多信息。你可以问我：\n\n- 风险评分怎么计算的？\n- 什么是 False Pass？\n- Z-score 是什么？\n- 如何解读分析结果？'
}

function AIAssistant({ visible, onClose, context = {} }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '👋 你好！我是 FalsePass Hunter AI 助手，可以帮你：\n\n• 解释分析结果和风险评分\n• 回答技术问题（Z-score、False Pass 等）\n• 提供操作建议\n\n试试问我："78 分代表什么？" 或 "什么是 False Pass？"',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // 模拟 AI 响应（离线模式）
    setTimeout(() => {
      const answer = generateAnswer(input, context)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: answer },
      ])
      setLoading(false)
    }, 800)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Drawer
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <RobotOutlined style={{ fontSize: 20, color: '#1890ff' }} />
          <span>AI Assistant</span>
        </div>
      }
      placement="right"
      width={400}
      open={visible}
      onClose={onClose}
      extra={
        <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
      }
      styles={{
        body: { padding: 0, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)' },
      }}
    >
      {/* 消息列表 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: 16,
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <Card
              size="small"
              style={{
                maxWidth: '85%',
                background: msg.role === 'user' ? '#1890ff' : '#f0f2f5',
                color: msg.role === 'user' ? '#fff' : '#000',
                border: 'none',
                borderRadius: 12,
              }}
              bodyStyle={{ padding: '12px 16px' }}
            >
              <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                {msg.content}
              </div>
            </Card>
          </div>
        ))}
        {loading && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <Spin size="small" />
            <div style={{ marginTop: 8, color: '#999', fontSize: 12 }}>AI 思考中...</div>
          </div>
        )}
      </div>

      {/* 输入区域 */}
      <div style={{ padding: 16, borderTop: '1px solid #e8e8e8', background: '#fafafa' }}>
        <TextArea
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="输入问题，按 Enter 发送..."
          style={{ resize: 'none', marginBottom: 8 }}
          disabled={loading}
        />
        <Button
          type="primary"
          block
          icon={<SendOutlined />}
          onClick={handleSend}
          loading={loading}
          style={{ borderRadius: 6 }}
        >
          发送
        </Button>
        <Divider style={{ margin: '12px 0' }} />
        <div style={{ fontSize: 12, color: '#999' }}>
          💡 常见问题：
          <div style={{ marginTop: 4, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {['78 分代表什么？', '什么是 False Pass？', 'Z-score 是什么？', '如何解读风险？'].map((q) => (
              <Button
                key={q}
                size="small"
                type="link"
                onClick={() => setInput(q)}
                style={{ padding: '0 8px', height: 24 }}
              >
                {q}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  )
}

export default AIAssistant
