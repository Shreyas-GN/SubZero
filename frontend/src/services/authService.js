import api from './api'

const authService = {
  me: () => api.get('/me'),
  login: (credentials) => api.post('/login', credentials),
  signup: (data) => api.post('/signup', data),
  logout: () => api.delete('/logout'),
  update: (data) => api.patch('/me', { user: data }),
}

export default authService
