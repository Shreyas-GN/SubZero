import api from './api'

const dashboardService = {
  getMetrics: () => api.get('/dashboard'),
}

export default dashboardService
