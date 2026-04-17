/**
 * FalsePass Hunter AI - 模拟数据集
 * 包含所有页面所需的数据结构
 */

// ============ 工具函数：生成随机数 ============
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const randomFloat = (min, max, decimals = 1) => parseFloat((Math.random() * (max - min) + min).toFixed(decimals))

// ============ 生成趋势数据 ============
const generateTrendData = (range) => {
  if (range === '24h') {
    return [
      { date: '00:00', tests: randomInt(35, 50), falsePass: randomInt(0, 2), risks: randomInt(0, 1) },
      { date: '04:00', tests: randomInt(30, 45), falsePass: randomInt(0, 2), risks: randomInt(0, 1) },
      { date: '08:00', tests: randomInt(45, 60), falsePass: randomInt(0, 3), risks: randomInt(0, 2) },
      { date: '12:00', tests: randomInt(55, 75), falsePass: randomInt(1, 4), risks: randomInt(0, 2) },
      { date: '16:00', tests: randomInt(50, 70), falsePass: randomInt(0, 3), risks: randomInt(0, 1) },
      { date: '20:00', tests: randomInt(55, 75), falsePass: randomInt(1, 4), risks: randomInt(0, 2) },
      { date: '23:59', tests: randomInt(20, 35), falsePass: randomInt(0, 2), risks: randomInt(0, 1) },
    ]
  }
  if (range === '30d') {
    return [
      { date: 'Mar 16', tests: randomInt(1100, 1300), falsePass: randomInt(15, 25), risks: randomInt(4, 8) },
      { date: 'Mar 23', tests: randomInt(1200, 1500), falsePass: randomInt(18, 28), risks: randomInt(6, 10) },
      { date: 'Mar 30', tests: randomInt(1100, 1400), falsePass: randomInt(15, 25), risks: randomInt(5, 8) },
      { date: 'Apr 06', tests: randomInt(1300, 1600), falsePass: randomInt(20, 30), risks: randomInt(6, 10) },
      { date: 'Apr 13', tests: randomInt(1100, 1400), falsePass: randomInt(15, 25), risks: randomInt(5, 8) },
      { date: 'Apr 15', tests: randomInt(300, 400), falsePass: randomInt(3, 8), risks: randomInt(1, 3) },
    ]
  }
  // 7d (default)
  return [
    { date: 'Apr 09', tests: randomInt(150, 200), falsePass: randomInt(2, 5), risks: randomInt(1, 3) },
    { date: 'Apr 10', tests: randomInt(160, 210), falsePass: randomInt(2, 6), risks: randomInt(1, 4) },
    { date: 'Apr 11', tests: randomInt(120, 170), falsePass: randomInt(1, 4), risks: randomInt(0, 2) },
    { date: 'Apr 12', tests: randomInt(180, 240), falsePass: randomInt(3, 7), risks: randomInt(2, 4) },
    { date: 'Apr 13', tests: randomInt(170, 220), falsePass: randomInt(2, 6), risks: randomInt(1, 3) },
    { date: 'Apr 14', tests: randomInt(160, 210), falsePass: randomInt(2, 5), risks: randomInt(1, 3) },
    { date: 'Apr 15', tests: randomInt(120, 170), falsePass: randomInt(1, 4), risks: randomInt(1, 2) },
  ]
}

// ============ 生成动态 Dashboard 数据 ============
export const generateDashboardData = () => {
  const totalTests = randomInt(1100, 1400)
  const falsePassDetected = randomInt(10, 25)
  const highRiskAlerts = randomInt(2, 8)

  return {
    metrics: {
      totalTests,
      falsePassDetected,
      highRiskAlerts,
      systemConfidence: randomFloat(92, 97, 1),
    },
    trendData: {
      '24h': generateTrendData('24h'),
      '7d': generateTrendData('7d'),
      '30d': generateTrendData('30d'),
    },
    stations: [
      { id: '1', line: 'A', station: 'ICT-01', status: 'running', output: randomInt(1100, 1300), risks: randomInt(1, 5) },
      { id: '2', line: 'A', station: 'FCT-02', status: 'running', output: randomInt(800, 1100), risks: randomInt(0, 3) },
      { id: '3', line: 'B', station: 'ICT-03', status: randomInt(1, 10) > 7 ? 'warning' : 'running', output: randomInt(600, 900), risks: randomInt(3, 8) },
    ],
    fixtures: [
      { id: 'A01', station: 'ICT-01', health: randomInt(75, 98), status: 'good', usageCount: randomInt(2000, 4000) },
      { id: 'B02', station: 'ICT-03', health: randomInt(45, 70), status: 'warning', usageCount: randomInt(4000, 5500) },
      { id: 'C03', station: 'FCT-02', health: randomInt(65, 90), status: 'good', usageCount: randomInt(1500, 3000) },
    ],
    alerts: [
      { id: '1', level: 'high', message: `ICT-01 detected ${randomInt(2, 5)} high-risk false pass samples`, station: 'ICT-01', timestamp: `${randomInt(8, 11)}:${String(randomInt(10, 59)).padStart(2, '0')}` },
      { id: '2', level: 'medium', message: 'Fixture #B02 requires inspection', station: 'ICT-03', timestamp: `${randomInt(7, 10)}:${String(randomInt(10, 59)).padStart(2, '0')}` },
    ],
  }
}

// 向后兼容，导出静态数据
export const dashboardData = generateDashboardData()

// ============ DriftMonitor 数据 ============
export const driftData = {
  versions: [
    { version: 'v2.0', date: '4/1', changes: 'Initial release', status: 'stable' },
    { version: 'v2.1', date: '4/5', changes: 'Bug fixes', status: 'stable' },
    { version: 'v2.2', date: '4/10', changes: '⚠️ Threshold relaxed', status: 'warning' },
    { version: 'v2.3', date: '4/14', changes: 'Current version', status: 'current' },
  ],
  thresholds: [
    { test: 'VOLT-01', standard: 10.0, current: 10.5, unit: 'V', deviation: 5.0 },
    { test: 'VOLT-02', standard: 12.0, current: 12.1, unit: 'V', deviation: 0.8 },
    { test: 'CURR-01', standard: 5.0, current: 5.2, unit: 'A', deviation: 4.0 },
    { test: 'CURR-02', standard: 8.0, current: 8.0, unit: 'A', deviation: 0.0 },
    { test: 'TEMP-01', standard: 45.0, current: 47.0, unit: '°C', deviation: 4.4 },
  ],
  events: [
    { id: '1', time: '10:23', test: 'VOLT-01', type: 'Threshold Relaxed', delta: '+5%', confidence: 92, risk: 'high' },
    { id: '2', time: '09:45', test: 'TEMP-01', type: 'Mean Shift', delta: '+4.4%', confidence: 87, risk: 'medium' },
    { id: '3', time: '08:12', test: 'CURR-01', type: 'Std Dev Increase', delta: '+12%', confidence: 78, risk: 'low' },
  ],
  waveformStats: {
    mean: [
      { test: 'VOLT-01', baseline: 10.2, current: 10.7 },
      { test: 'CURR-01', baseline: 5.1, current: 5.3 },
      { test: 'TEMP-01', baseline: 44.5, current: 47.2 },
    ],
    stdDev: [
      { test: 'VOLT-01', baseline: 0.15, current: 0.28 },
      { test: 'CURR-01', baseline: 0.08, current: 0.12 },
      { test: 'TEMP-01', baseline: 0.5, current: 0.9 },
    ],
  },
}

// ============ CrossStage 数据 ============
export const crossStageData = {
  sankey: {
    nodes: [
      { id: 'test-passed', label: 'Test Passed', value: 100 },
      { id: 'post-normal', label: 'Post-Station Normal', value: 85 },
      { id: 'post-anomaly', label: 'Post-Station Anomaly', value: 10 },
      { id: 'rework', label: 'Rework Station', value: 5 },
    ],
    links: [
      { source: 'test-passed', target: 'post-normal', value: 85 },
      { source: 'test-passed', target: 'post-anomaly', value: 10 },
      { source: 'test-passed', target: 'rework', value: 5 },
    ],
  },
  heatmap: [
    { test: 'VOLT-01', solderVoid: 3, short: 1, open: 0, other: 1 },
    { test: 'CURR-02', solderVoid: 1, short: 4, open: 2, other: 0 },
    { test: 'TEMP-01', solderVoid: 0, short: 2, open: 1, other: 2 },
    { test: 'CONT-01', solderVoid: 2, short: 0, open: 3, other: 1 },
  ],
  samples: [
    { id: '1', sampleId: 'SN001', station: 'ICT-01', result: 'PASS', issue: 'Solder Void', risk: 92 },
    { id: '2', sampleId: 'SN045', station: 'FCT-02', result: 'PASS', issue: 'Short', risk: 87 },
    { id: '3', sampleId: 'SN089', station: 'ICT-03', result: 'PASS', issue: 'Open', risk: 75 },
    { id: '4', sampleId: 'SN102', station: 'ICT-01', result: 'PASS', issue: 'Solder Void', risk: 82 },
  ],
}

// ============ RiskReport 数据 ============
export const riskReportData = {
  overallScore: {
    score: 78,
    level: 'high',
    label: 'High Risk',
    color: '#ff4d4f',
  },
  breakdown: [
    { factor: 'Test Data Anomaly', value: 78, weight: 0.35 },
    { factor: 'Script Version Drift', value: 45, weight: 0.20 },
    { factor: 'Fixture Health', value: 89, weight: 0.25 },
    { factor: 'Historical Rework', value: 67, weight: 0.20 },
  ],
  topRiskyItems: [
    { rank: 1, test: 'VOLT-01', contribution: 32, confidence: 94, action: 'Retest' },
    { rank: 2, test: 'CURR-02', contribution: 25, confidence: 87, action: 'Inspection' },
    { rank: 3, test: 'TEMP-01', contribution: 18, confidence: 82, action: 'Verify Threshold' },
  ],
  actions: [
    { priority: 'immediate', items: ['Retest samples SN001, SN045', 'Lock ICT-01 station pending inspection'] },
    { priority: 'short-term', time: '24h', items: ['Inspect ICT-01 fixture #A01', 'Verify VOLT-01 threshold'] },
    { priority: 'long-term', time: 'This week', items: ['Review v2.3 threshold change', 'Update Golden Baseline'] },
  ],
}

// ============ LogAnalysis 数据 ============
export const logAnalysisData = {
  sampleLog: `[2026-04-15 10:23:45] INFO: Test started for SN001
[2026-04-15 10:23:46] WARN: Voltage slightly high (10.48V vs 10.5V limit)
[2026-04-15 10:23:47] INFO: Current within range (4.98A)
[2026-04-15 10:23:48] WARN: Fixture contact shaky, contact resistance ±12%
[2026-04-15 10:23:49] INFO: Temperature OK (46.8°C)
[2026-04-15 10:23:50] PASS: All tests completed
[2026-04-15 10:23:51] NOTE: High rework rate for this test item in past 30 days
[2026-04-15 10:23:52] NOTE: Version v2.2 threshold relaxation applied`,
  aiAnalysis: {
    suspiciousPoints: [
      'Voltage reading near upper limit but still in range',
      'Fixture contact instability may affect readings',
      'This test item has high historical rework rate (23% vs 5% baseline)',
      'Version v2.2 relaxed threshold by 5% - adds 2% more false pass risk',
    ],
    recommendations: [
      'Retest this sample to confirm',
      'Inspect fixture contact status',
      'Consider reverting threshold to v2.0 baseline',
      'Flag this sample for post-station monitoring',
    ],
    confidence: 87,
  },
}

// ============ 颜色配置 ============
export const COLORS = {
  // Primary
  primary: '#1890ff',
  primaryDark: '#096dd9',
  primaryLight: '#e6f7ff',

  // Status
  success: '#52c41a',
  warning: '#faad14',
  danger: '#ff4d4f',
  info: '#13c2c2',

  // Advanced
  purple: '#722ed1',
  orange: '#ff7a45',
  teal: '#08979c',

  // Neutrals
  dark: '#001529',
  text: '#333333',
  textSecondary: '#666666',
  textMuted: '#999999',
  border: '#e8e8e8',
  background: '#f0f2f5',
  cardBg: '#ffffff',
}

// ============ 数据导出 ============
export default {
  dashboardData,
  driftData,
  crossStageData,
  riskReportData,
  logAnalysisData,
  COLORS,
}
