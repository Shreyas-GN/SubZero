import { describe, it, expect } from 'vitest'
import formatCurrency from '../utils/formatCurrency'

describe('formatCurrency', () => {
  describe('INR (default)', () => {
    it('formats a whole number with the rupee symbol', () => {
      const result = formatCurrency(1000, 'INR')
      expect(result).toContain('₹')
      expect(result).toContain('1,000')
    })

    it('uses INR when no currency is specified', () => {
      const result = formatCurrency(500)
      expect(result).toContain('₹')
    })

    it('formats zero as the zero-value currency string', () => {
      const result = formatCurrency(0, 'INR')
      expect(result).toContain('₹')
      expect(result).toContain('0')
    })

    it('rounds to at most 2 decimal places', () => {
      const result = formatCurrency(99.999, 'INR')
      const numeric = parseFloat(result.replace(/[^0-9.]/g, ''))
      expect(numeric).toBeLessThanOrEqual(100.0)
    })

    it('omits trailing .00 for whole numbers (minimumFractionDigits: 0)', () => {
      const result = formatCurrency(649, 'INR')
      expect(result).not.toMatch(/\.00$/)
    })

    it('shows decimals when the amount has cents', () => {
      const result = formatCurrency(99.5, 'INR')
      expect(result).toContain('99.5')
    })
  })

  describe('USD', () => {
    it('formats with a dollar sign', () => {
      const result = formatCurrency(1000, 'USD')
      expect(result).toContain('$')
      expect(result).toContain('1,000')
    })
  })

  describe('edge cases', () => {
    it('treats null as 0', () => {
      const result = formatCurrency(null, 'INR')
      expect(result).toContain('0')
    })

    it('treats undefined as 0', () => {
      const result = formatCurrency(undefined, 'INR')
      expect(result).toContain('0')
    })

    it('treats NaN as 0', () => {
      const result = formatCurrency(NaN, 'INR')
      expect(result).toContain('0')
    })

    it('treats non-numeric strings as 0', () => {
      const result = formatCurrency('abc', 'INR')
      expect(result).toContain('0')
    })

    it('parses a valid numeric string', () => {
      const result = formatCurrency('1234.56', 'INR')
      expect(result).toContain('1,234')
    })

    it('handles very large amounts', () => {
      const result = formatCurrency(1000000, 'INR')
      expect(result).toContain('₹')
    })
  })
})
