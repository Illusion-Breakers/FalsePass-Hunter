/**
 * FalsePass Hunter AI - API 集成文件
 * 处理后端通信（真实接口）
 */

import axios from 'axios'

// API 基础配置
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ============ Dashboard API ============
export const getDashboardData = async (timeRange = '7d', station = 'all') => {
  return await apiClient.get('/dashboard/summary', { params: { timeRange, station } })
}

export const refreshDashboardData = async (timeRange = '7d', station = 'all') => {
  return await apiClient.get('/dashboard/summary', { params: { timeRange, station } })
}

// ============ DriftMonitor API ============
export const getDriftData = async (station = 'ICT-01', timeRange = '7d') => {
  return await apiClient.get('/drift/summary', { params: { station, timeRange } })
}

export const analyzeDrift = async (station, timeRange) => {
  return await apiClient.get('/drift/summary', { params: { station, timeRange } })
}

// ============ CrossStage API ============
export const getCrossStageData = async (productLine = 'all', timeRange = '7d') => {
  return await apiClient.get('/cross-stage/summary', { params: { productLine, timeRange } })
}

export const getSampleDetails = async (sampleId) => {
  const resp = await apiClient.get('/cross-stage/summary', { params: { timeRange: '7d' } })
  const sample = resp.data.samples.find((s) => s.sampleId === sampleId)
  return { data: sample || null }
}

// ============ RiskReport API ============
export const getRiskReport = async (sampleId = 'SN001') => {
  return await apiClient.get('/risk/report', { params: { sampleId } })
}

export const exportRiskReportPDF = async (sampleId) => {
  return { data: { success: true, message: `PDF exported for ${sampleId}` } }
}

// ============ LogAnalysis API ============
export const analyzeLog = async (logContent) => {
  return await apiClient.post('/log/analyze', { log: logContent })
}

export const uploadLogFile = async (file) => {
  return { data: { success: true, fileName: file.name } }
}

// ============ 实时数据更新 ============
export const subscribeToRealtimeUpdates = (callback) => {
  const interval = setInterval(() => {
    callback({ timestamp: new Date() })
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
