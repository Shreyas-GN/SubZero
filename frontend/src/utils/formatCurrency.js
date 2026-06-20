const formatCurrency = (amount, currency = 'INR') => {
  const num = parseFloat(amount) || 0
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num)
}

export default formatCurrency
