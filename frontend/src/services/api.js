import axios from 'axios'

const api = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Prevent infinite redirect loop on initial auth check
    if (error.response?.status === 401 && error.config?.url !== '/me') {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
