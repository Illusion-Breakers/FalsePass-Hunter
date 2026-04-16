/**
 * FalsePass Hunter AI - API 集成文件
 * 处理后端通信，当前使用模拟数据
 */

import axios from 'axios'
import {
  dashboardData,
  driftData,
  crossStageData,
  riskReportData,
  logAnalysisData,
} from './mockData'

// API 基础配置
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api'

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ============ Dashboard API ============
export const getDashboardData = async () => {
  try {
    // 未来改为真实 API: return await apiClient.get('/dashboard')
    return { data: dashboardData }
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
    return { data: dashboardData } // 降级到模拟数据
  }
}

export const refreshDashboardData = async () => {
  // 模拟数据刷新
  const updatedData = {
    ...dashboardData,
    metrics: {
      ...dashboardData.metrics,
      totalTests: Math.floor(Math.random() * 1000) + 1000,
      falsePassDetected: Math.floor(Math.random() * 30),
      highRiskAlerts: Math.floor(Math.random() * 10),
      systemConfidence: (Math.random() * 10 + 90).toFixed(1),
    },
  }
  return { data: updatedData }
}

// ============ DriftMonitor API ============
export const getDriftData = async (station = 'ICT-01', timeRange = '7d') => {
  try {
    // 未来改为: return await apiClient.get('/drift', { params: { station, timeRange } })
    return { data: driftData }
  } catch (error) {
    console.error('Failed to fetch drift data:', error)
    return { data: driftData }
  }
}

export const analyzeDrift = async (station, timeRange) => {
  try {
    // 未来改为: return await apiClient.post('/drift/analyze', { station, timeRange })
    return { data: driftData.events }
  } catch (error) {
    console.error('Failed to analyze drift:', error)
    return { data: driftData.events }
  }
}

// ============ CrossStage API ============
export const getCrossStageData = async (productLine = 'all', timeRange = '7d') => {
  try {
    // 未来改为: return await apiClient.get('/cross-stage', { params: { productLine, timeRange } })
    return { data: crossStageData }
  } catch (error) {
    console.error('Failed to fetch cross-stage data:', error)
    return { data: crossStageData }
  }
}

export const getSampleDetails = async (sampleId) => {
  try {
    // 未来改为: return await apiClient.get(`/samples/${sampleId}`)
    const sample = crossStageData.samples.find((s) => s.sampleId === sampleId)
    return { data: sample }
  } catch (error) {
    console.error('Failed to fetch sample details:', error)
    return { data: null }
  }
}

// ============ RiskReport API ============
export const getRiskReport = async (sampleId = 'SN001') => {
  try {
    // 未来改为: return await apiClient.post('/risk-report', { sampleId })
    return { data: riskReportData }
  } catch (error) {
    console.error('Failed to fetch risk report:', error)
    return { data: riskReportData }
  }
}

export const exportRiskReportPDF = async (sampleId) => {
  try {
    // 未来改为: return await apiClient.post('/risk-report/export-pdf', { sampleId })
    return { data: { success: true, message: 'PDF exported successfully' } }
  } catch (error) {
    console.error('Failed to export PDF:', error)
    return { data: { success: false, error: error.message } }
  }
}

// ============ LogAnalysis API ============
export const analyzeLog = async (logContent) => {
  try {
    // 未来改为: return await apiClient.post('/ai/analyze-log', { log: logContent })
    // 这里模拟 AI 分析延迟
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: logAnalysisData.aiAnalysis })
      }, 2000)
    })
  } catch (error) {
    console.error('Failed to analyze log:', error)
    return { data: logAnalysisData.aiAnalysis }
  }
}

export const uploadLogFile = async (file) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    // 未来改为: return await apiClient.post('/ai/upload-log', formData)
    return { data: { success: true, fileName: file.name } }
  } catch (error) {
    console.error('Failed to upload log file:', error)
    return { data: { success: false, error: error.message } }
  }
}

// ============ 实时数据更新 ============
export const subscribeToRealtimeUpdates = (callback) => {
  // 未来可以实现 WebSocket 连接
  const interval = setInterval(() => {
    callback({
      timestamp: new Date(),
      totalTests: dashboardData.metrics.totalTests,
      falsePassDetected: dashboardData.metrics.falsePassDetected,
    })
  }, 30000) // 每 30 秒更新

  return () => clearInterval(interval)
}

// ============ 错误处理 ============
export const handleAPIError = (error) => {
  if (error.response) {
    // 服务器响应错误
    const { status, data } = error.response
    console.error(`API Error ${status}:`, data.message || data)
    return {
      code: status,
      message: data.message || 'An error occurred',
    }
  } else if (error.request) {
    // 网络错误
    console.error('Network Error:', error.message)
    return {
      code: 'NETWORK_ERROR',
      message: 'Network error. Please check your connection.',
    }
  } else {
    console.error('Error:', error.message)
    return {
      code: 'UNKNOWN_ERROR',
      message: error.message || 'An unknown error occurred',
    }
  }
}

export default {
  // Dashboard
  getDashboardData,
  refreshDashboardData,

  // Drift Monitor
  getDriftData,
  analyzeDrift,

  // Cross Stage
  getCrossStageData,
  getSampleDetails,

  // Risk Report
  getRiskReport,
  exportRiskReportPDF,

  // Log Analysis
  analyzeLog,
  uploadLogFile,

  // Real-time
  subscribeToRealtimeUpdates,

  // Error handling
  handleAPIError,
}
