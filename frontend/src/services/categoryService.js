import api from './api'

const categoryService = {
  getAll: () => api.get('/categories'),
}

export default categoryService
