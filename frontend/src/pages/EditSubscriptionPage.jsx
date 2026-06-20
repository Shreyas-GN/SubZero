import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import subscriptionService from '../services/subscriptionService'
import categoryService from '../services/categoryService'
import SubscriptionForm from '../components/forms/SubscriptionForm'
import Button from '../components/ui/Button'
import Spinner from '../components/ui/Spinner'

const EditSubscriptionPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [subscription, setSubscription] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    Promise.all([
      subscriptionService.getOne(id),
      categoryService.getAll(),
    ])
      .then(([subRes, catRes]) => {
        setSubscription(subRes.data.data)
        setCategories(catRes.data.data)
      })
      .catch(() => {
        toast.error('Failed to load subscription')
        navigate('/subscriptions')
      })
      .finally(() => setLoading(false))
  }, [id, navigate])

  const handleSubmit = async (data) => {
    setSubmitting(true)
    try {
      await subscriptionService.update(id, data)
      toast.success('Subscription updated')
      navigate('/subscriptions')
    } catch (err) {
      const msg = err.response?.data?.errors?.[0] ?? 'Failed to update subscription'
      toast.error(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-3 mb-8">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} aria-label="Go back">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-[#FAFAFA] tracking-tight">Edit subscription</h1>
          <p className="text-sm text-[#71717A] mt-0.5">
            {subscription?.name ?? 'Loading…'}
          </p>
        </div>
      </div>

      <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : (
          <SubscriptionForm
            initialData={subscription}
            categories={categories}
            onSubmit={handleSubmit}
            loading={submitting}
            submitLabel="Save changes"
          />
        )}
      </div>
    </div>
  )
}

export default EditSubscriptionPage
