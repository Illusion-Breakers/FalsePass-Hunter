/**
 * FalsePass Hunter AI - 模拟数据集
 * 包含所有页面所需的数据结构
 */

// ============ Dashboard 数据 ============
export const dashboardData = {
  metrics: {
    totalTests: 1248,
    falsePassDetected: 17,
    highRiskAlerts: 5,
    systemConfidence: 94.2,
  },
  trendData: [
    { date: '4/9', count: 12 },
    { date: '4/10', count: 15 },
    { date: '4/11', count: 8 },
    { date: '4/12', count: 22 },
    { date: '4/13', count: 17 },
    { date: '4/14', count: 19 },
    { date: '4/15', count: 14 },
  ],
  stations: [
    { id: '1', line: 'A', station: 'ICT-01', status: 'running', output: 1248, risks: 3 },
    { id: '2', line: 'A', station: 'FCT-02', status: 'running', output: 986, risks: 1 },
    { id: '3', line: 'B', station: 'ICT-03', status: 'warning', output: 756, risks: 5 },
  ],
  fixtures: [
    { id: 'A01', station: 'ICT-01', health: 85, status: 'good', usageCount: 3245 },
    { id: 'B02', station: 'ICT-03', health: 58, status: 'warning', usageCount: 4521 },
    { id: 'C03', station: 'FCT-02', health: 72, status: 'good', usageCount: 2156 },
  ],
  alerts: [
    { id: '1', level: 'high', message: 'ICT-01 detected 3 high-risk false pass samples', station: 'ICT-01', timestamp: '10:23' },
    { id: '2', level: 'medium', message: 'Fixture #B02 requires inspection', station: 'ICT-03', timestamp: '09:45' },
  ],
}

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
