import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, TrendingUp, CalendarClock, LayoutGrid, Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import dashboardService from '../services/dashboardService'
import StatCard from '../components/cards/StatCard'
import DashboardEmptyState from '../components/cards/DashboardEmptyState'
import SpendingChart from '../components/charts/SpendingChart'
import Card, { CardHeader, CardTitle } from '../components/ui/Card'
import Button from '../components/ui/Button'
import formatCurrency from '../utils/formatCurrency'
import useAuth from '../hooks/useAuth'

const DashboardPage = () => {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dashboardService
      .getMetrics()
      .then((res) => setMetrics(res.data.data))
      .catch(() => toast.error('Failed to load dashboard'))
      .finally(() => setLoading(false))
  }, [])

  const currency = currentUser?.currency ?? 'INR'

  const stats = [
    {
      title: 'Monthly Spend',
      value: metrics ? formatCurrency(metrics.monthly_spend, currency) : null,
      icon: CreditCard,
    },
    {
      title: 'Yearly Spend',
      value: metrics ? formatCurrency(metrics.yearly_spend, currency) : null,
      icon: TrendingUp,
    },
    {
      title: 'Active',
      value: metrics?.active_count ?? null,
      icon: LayoutGrid,
      trend: 'subscriptions',
    },
    {
      title: 'Upcoming Renewals',
      value: metrics?.upcoming_count ?? null,
      icon: CalendarClock,
      trend: 'next 7 days',
    },
  ]

  const chartData = (metrics?.by_category ?? []).map((item) => ({
    name: item.name ?? item.category_name,
    amount: Number(item.amount ?? item.total ?? 0),
  }))

  const isEmpty = !loading && metrics?.active_count === 0

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#FAFAFA] tracking-tight">Dashboard</h1>
          <p className="text-sm text-[#71717A] mt-0.5">Your subscription overview</p>
        </div>
        <Button size="sm" onClick={() => navigate('/subscriptions/new')}>
          <Plus className="w-3.5 h-3.5" />
          Add subscription
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} loading={loading} />
        ))}
      </div>

      {!loading && chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <p className="text-xs text-[#71717A]">Monthly</p>
          </CardHeader>
          <SpendingChart data={chartData} />
        </Card>
      )}

      {isEmpty && <DashboardEmptyState />}
    </div>
  )
}

export default DashboardPage
