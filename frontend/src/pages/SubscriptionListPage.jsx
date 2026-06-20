import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Plus, Pencil, Trash2, X } from 'lucide-react'
import toast from 'react-hot-toast'
import subscriptionService from '../services/subscriptionService'
import categoryService from '../services/categoryService'
import SubscriptionCard from '../components/cards/SubscriptionCard'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import SkeletonRow, { SkeletonCard } from '../components/ui/SkeletonRow'
import formatCurrency from '../utils/formatCurrency'

const SKELETON_COUNT = 5
const STATUS_VARIANT = { active: 'active', cancelled: 'cancelled', paused: 'paused' }
const CYCLE_VARIANT = { monthly: 'monthly', quarterly: 'quarterly', yearly: 'yearly' }
const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

const TABLE_HEADERS = ['Name', 'Amount', 'Cycle', 'Renewal Date', 'Status', '']

const SubscriptionListPage = () => {
  const navigate = useNavigate()
  const [subscriptions, setSubscriptions] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [pendingDelete, setPendingDelete] = useState(null)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    categoryService.getAll()
      .then((res) => setCategories(res.data.data))
      .catch(() => toast.error('Failed to load categories'))
  }, [])

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(async () => {
      try {
        const res = await subscriptionService.getAll({
          search: search || undefined,
          category_id: categoryId || undefined,
        })
        setSubscriptions(res.data.data)
      } catch {
        toast.error('Failed to load subscriptions')
      } finally {
        setLoading(false)
      }
    }, search ? 350 : 0)
    return () => clearTimeout(timer)
  }, [search, categoryId])

  const handleDelete = async (id) => {
    setDeleting(id)
    try {
      await subscriptionService.remove(id)
      setSubscriptions((prev) => prev.filter((s) => s.id !== id))
      toast.success('Subscription removed')
    } catch {
      toast.error('Failed to delete subscription')
    } finally {
      setDeleting(null)
      setPendingDelete(null)
    }
  }

  const isEmpty = !loading && subscriptions.length === 0

  return (
    <div className="space-y-5 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-zinc-100 tracking-tight">Subscriptions</h1>
          <p className="text-sm text-zinc-500 mt-0.5">
            {!loading && `${subscriptions.length} total`}
          </p>
        </div>
        <Button size="sm" onClick={() => navigate('/subscriptions/new')}>
          <Plus className="w-3.5 h-3.5" />
          Add
        </Button>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search subscriptions…"
            className="h-9 w-full rounded-lg bg-zinc-900/50 border border-zinc-800 pl-8 pr-8 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:ring-1 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="h-9 rounded-lg bg-zinc-900/50 border border-zinc-800 px-3 text-sm text-zinc-100 outline-none focus:ring-1 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
        >
          <option value="">All categories</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {isEmpty && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-10 h-10 bg-zinc-900/60 border border-zinc-800 rounded-xl flex items-center justify-center mb-4">
            <Search className="w-4 h-4 text-zinc-500" />
          </div>
          <p className="text-sm font-semibold text-zinc-100 mb-1">
            {search || categoryId ? 'No results found' : 'No subscriptions yet'}
          </p>
          <p className="text-xs text-zinc-500 mb-5">
            {search || categoryId
              ? 'Try adjusting your search or filter.'
              : 'Add your first subscription to start tracking.'}
          </p>
          {!search && !categoryId && (
            <Button size="sm" onClick={() => navigate('/subscriptions/new')}>
              <Plus className="w-3.5 h-3.5" />
              Add subscription
            </Button>
          )}
        </div>
      )}

      {!isEmpty && (
        <div className="hidden md:block bg-zinc-950/40 backdrop-blur-md border border-zinc-900 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-900 bg-zinc-950/60">
                {TABLE_HEADERS.map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-medium text-zinc-500 tracking-tight px-4 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: SKELETON_COUNT }).map((_, i) => <SkeletonRow key={i} cols={6} />)
                : subscriptions.map((s) => (
                    <tr
                      key={s.id}
                      className="border-b border-zinc-900 last:border-0 hover:bg-zinc-900/30 transition-colors duration-150"
                    >
                      <td className="px-4 py-3.5">
                        <p className="font-medium text-zinc-100 tracking-tight">{s.name}</p>
                        {s.category?.name && (
                          <p className="text-xs text-zinc-600 mt-0.5">{s.category.name}</p>
                        )}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-zinc-100 tabular-nums">
                        {formatCurrency(s.amount, s.currency)}
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge variant={CYCLE_VARIANT[s.billing_cycle]}>{s.billing_cycle}</Badge>
                      </td>
                      <td className="px-4 py-3.5 text-zinc-500 text-sm">{fmtDate(s.renewal_date)}</td>
                      <td className="px-4 py-3.5">
                        <Badge variant={STATUS_VARIANT[s.status]}>
                          {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1 justify-end">
                          <Link to={`/subscriptions/${s.id}`}>
                            <Button variant="ghost" size="sm" aria-label="Edit">
                              <Pencil className="w-3.5 h-3.5" />
                            </Button>
                          </Link>
                          {pendingDelete === s.id ? (
                            <>
                              <Button variant="danger" size="sm" loading={deleting === s.id} onClick={() => handleDelete(s.id)}>
                                Confirm
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => setPendingDelete(null)}>
                                <X className="w-3.5 h-3.5" />
                              </Button>
                            </>
                          ) : (
                            <Button variant="danger" size="sm" onClick={() => setPendingDelete(s.id)} aria-label="Delete">
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
      )}

      {!isEmpty && (
        <div className="md:hidden grid gap-3">
          {loading
            ? Array.from({ length: SKELETON_COUNT }).map((_, i) => <SkeletonCard key={i} />)
            : subscriptions.map((s) => (
                <SubscriptionCard key={s.id} subscription={s} onDelete={handleDelete} deleting={deleting} />
              ))
          }
        </div>
      )}
    </div>
  )
}

export default SubscriptionListPage
