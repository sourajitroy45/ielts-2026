// Shared Recharts chrome + categorical palette for the beige/deep-brown
// theme. Chart "chrome" (grid, axis, tooltip) must match the light warm
// surface — the old dark-theme hex values were illegible once the app
// went light. CHART_COLORS is a warm, earthy categorical palette so
// multi-series charts stay cohesive with the rest of the UI instead of
// falling back to default cool pastels.

export const CHART_COLORS = ['#6b4423', '#a2571d', '#7a8c4c', '#c2954a', '#8c5e3c', '#5b7065']

export const CHART_GRID_STROKE = '#d3b98c'
export const CHART_AXIS_TICK = { fill: '#8a7355', fontSize: 11 }
export const CHART_AXIS_TICK_SM = { fill: '#a89572', fontSize: 10 }
export const CHART_TOOLTIP_STYLE = { background: '#f8f1e2', border: '1px solid #d3b98c', borderRadius: 8, fontSize: 12 }
export const CHART_TOOLTIP_LABEL = { color: '#2b1d10' }
export const CHART_LEGEND_STYLE = { fontSize: 11, color: '#6b5539' }
