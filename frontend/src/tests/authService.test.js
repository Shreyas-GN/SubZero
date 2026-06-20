import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}))

import api from '../services/api'
import authService from '../services/authService'

beforeEach(() => vi.clearAllMocks())

describe('authService.me', () => {
  it('calls GET /me and returns the response', async () => {
    const mockData = { data: { success: true, data: { id: '1', email: 'user@test.com' } } }
    api.get.mockResolvedValue(mockData)

    const res = await authService.me()

    expect(api.get).toHaveBeenCalledWith('/me')
    expect(res.data.data.email).toBe('user@test.com')
  })
})

describe('authService.login', () => {
  it('calls POST /login with the provided credentials', async () => {
    const credentials = { email: 'user@test.com', password: 'secret' }
    const mockData = { data: { success: true, data: { id: '1' } } }
    api.post.mockResolvedValue(mockData)

    const res = await authService.login(credentials)

    expect(api.post).toHaveBeenCalledWith('/login', credentials)
    expect(res.data.success).toBe(true)
  })
})

describe('authService.signup', () => {
  it('calls POST /signup with the registration data', async () => {
    const data = { name: 'Alice', email: 'alice@test.com', password: 'password123' }
    api.post.mockResolvedValue({ data: { success: true, data: { id: '2' } } })

    await authService.signup(data)

    expect(api.post).toHaveBeenCalledWith('/signup', data)
  })
})

describe('authService.logout', () => {
  it('calls DELETE /logout', async () => {
    api.delete.mockResolvedValue({ data: { success: true, data: null } })

    await authService.logout()

    expect(api.delete).toHaveBeenCalledWith('/logout')
  })
})

describe('authService.update', () => {
  it('calls PATCH /me with the user data wrapped in a user key', async () => {
    const data = { name: 'Bob', currency: 'USD' }
    api.patch.mockResolvedValue({ data: { success: true, data: { id: '1' } } })

    await authService.update(data)

    expect(api.patch).toHaveBeenCalledWith('/me', { user: data })
  })
})

describe('authService error propagation', () => {
  it('propagates rejection from the api module', async () => {
    api.post.mockRejectedValue(new Error('Network error'))

    await expect(authService.login({ email: 'x', password: 'y' })).rejects.toThrow('Network error')
  })
})
