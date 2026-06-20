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
import subscriptionService from '../services/subscriptionService'

beforeEach(() => vi.clearAllMocks())

const mockSub = { id: 'abc', name: 'Netflix', amount: 649, billing_cycle: 'monthly' }

describe('subscriptionService.getAll', () => {
  it('calls GET /subscriptions without params when none are supplied', async () => {
    api.get.mockResolvedValue({ data: { success: true, data: [mockSub] } })

    const res = await subscriptionService.getAll()

    expect(api.get).toHaveBeenCalledWith('/subscriptions', { params: {} })
    expect(res.data.data).toHaveLength(1)
  })

  it('forwards query params to the API', async () => {
    api.get.mockResolvedValue({ data: { success: true, data: [] } })

    await subscriptionService.getAll({ search: 'netflix', category_id: '123' })

    expect(api.get).toHaveBeenCalledWith('/subscriptions', {
      params: { search: 'netflix', category_id: '123' },
    })
  })
})

describe('subscriptionService.getOne', () => {
  it('calls GET /subscriptions/:id', async () => {
    api.get.mockResolvedValue({ data: { success: true, data: mockSub } })

    const res = await subscriptionService.getOne('abc')

    expect(api.get).toHaveBeenCalledWith('/subscriptions/abc')
    expect(res.data.data.name).toBe('Netflix')
  })
})

describe('subscriptionService.create', () => {
  it('calls POST /subscriptions with data wrapped in subscription key', async () => {
    api.post.mockResolvedValue({ data: { success: true, data: mockSub } })
    const data = { name: 'Spotify', amount: 119 }

    await subscriptionService.create(data)

    expect(api.post).toHaveBeenCalledWith('/subscriptions', { subscription: data })
  })
})

describe('subscriptionService.update', () => {
  it('calls PATCH /subscriptions/:id with data wrapped in subscription key', async () => {
    api.patch.mockResolvedValue({ data: { success: true, data: mockSub } })
    const data = { name: 'Netflix Premium' }

    await subscriptionService.update('abc', data)

    expect(api.patch).toHaveBeenCalledWith('/subscriptions/abc', { subscription: data })
  })
})

describe('subscriptionService.remove', () => {
  it('calls DELETE /subscriptions/:id', async () => {
    api.delete.mockResolvedValue({ data: { success: true, data: null } })

    await subscriptionService.remove('abc')

    expect(api.delete).toHaveBeenCalledWith('/subscriptions/abc')
  })
})

describe('subscriptionService error propagation', () => {
  it('propagates API rejections to the caller', async () => {
    api.get.mockRejectedValue({ response: { status: 401 } })

    await expect(subscriptionService.getAll()).rejects.toMatchObject({ response: { status: 401 } })
  })
})
