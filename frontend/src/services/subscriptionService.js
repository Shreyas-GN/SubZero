import api from './api'

const subscriptionService = {
  getAll: (params = {}) => api.get('/subscriptions', { params }),
  getOne: (id) => api.get(`/subscriptions/${id}`),
  create: (data) => api.post('/subscriptions', { subscription: data }),
  update: (id, data) => api.patch(`/subscriptions/${id}`, { subscription: data }),
  remove: (id) => api.delete(`/subscriptions/${id}`),
}

export default subscriptionService
