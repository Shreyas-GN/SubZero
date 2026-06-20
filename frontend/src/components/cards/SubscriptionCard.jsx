import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Pencil, Trash2, X } from 'lucide-react'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import formatCurrency from '../../utils/formatCurrency'

const STATUS_VARIANT = { active: 'active', cancelled: 'cancelled', paused: 'paused' }
const CYCLE_VARIANT = { monthly: 'monthly', quarterly: 'quarterly', yearly: 'yearly' }

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

const SubscriptionCard = ({ subscription, onDelete, deleting }) => {
  const [confirming, setConfirming] = useState(false)
  const { id, name, amount, currency, renewal_date, status, billing_cycle, category } = subscription
  const isDeleting = deleting === id

  const handleConfirm = () => {
    onDelete(id)
    setConfirming(false)
  }

  return (
    <div className="bg-zinc-950/40 backdrop-blur-md border border-zinc-900 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] rounded-xl p-4 transition-colors duration-150 hover:border-zinc-800">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-zinc-100 truncate tracking-tight">{name}</p>
          {category?.name && (
            <p className="text-xs text-zinc-600 mt-0.5">{category.name}</p>
          )}
        </div>
        <Badge variant={STATUS_VARIANT[status] ?? 'default'}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-base font-semibold text-zinc-100 font-mono tabular-nums">
            {formatCurrency(amount, currency)}
          </p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <Calendar className="w-3 h-3 text-zinc-600 shrink-0" />
            <span className="text-xs text-zinc-500">{formatDate(renewal_date)}</span>
            <Badge variant={CYCLE_VARIANT[billing_cycle] ?? 'default'}>
              {billing_cycle}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {confirming ? (
            <>
              <Button variant="danger" size="sm" loading={isDeleting} onClick={handleConfirm}>
                Delete
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setConfirming(false)}>
                <X className="w-3.5 h-3.5" />
              </Button>
            </>
          ) : (
            <>
              <Link to={`/subscriptions/${id}`}>
                <Button variant="ghost" size="sm" aria-label="Edit">
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
              </Link>
              <Button
                variant="danger"
                size="sm"
                onClick={() => setConfirming(true)}
                aria-label="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SubscriptionCard
