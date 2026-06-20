import { useNavigate } from 'react-router-dom'
import { CreditCard, Plus } from 'lucide-react'
import Button from '../ui/Button'

const DashboardEmptyState = () => {
  const navigate = useNavigate()

  return (
    <div className="border border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-12 h-12 bg-zinc-900/50 border border-zinc-800 rounded-xl flex items-center justify-center mb-5">
        <CreditCard className="w-5 h-5 text-zinc-500" />
      </div>
      <h3 className="text-sm font-semibold text-zinc-100 mb-1.5">No subscriptions yet</h3>
      <p className="text-xs text-zinc-500 mb-6 max-w-xs leading-relaxed">
        Track all your recurring expenses in one place. Add your first subscription to unlock
        spending trends and upcoming renewal alerts.
      </p>
      <Button size="sm" onClick={() => navigate('/subscriptions/new')}>
        <Plus className="w-3.5 h-3.5" />
        Add your first subscription
      </Button>
    </div>
  )
}

export default DashboardEmptyState
