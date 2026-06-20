import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import subscriptionService from '../services/subscriptionService'
import categoryService from '../services/categoryService'
import SubscriptionForm from '../components/forms/SubscriptionForm'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const CreateSubscriptionPage = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    categoryService.getAll()
      .then((res) => setCategories(res.data.data))
      .catch(() => toast.error('Failed to load categories'))
  }, [])

  const handleSubmit = async (data) => {
    setSubmitting(true)
    try {
      await subscriptionService.create(data)
      toast.success('Subscription added')
      navigate('/subscriptions')
    } catch (err) {
      const msg = err.response?.data?.errors?.[0] ?? 'Failed to create subscription'
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
          <h1 className="text-xl font-semibold text-[#FAFAFA] tracking-tight">Add subscription</h1>
          <p className="text-sm text-[#71717A] mt-0.5">Track a new recurring expense</p>
        </div>
      </div>

      <Card>
        <SubscriptionForm
          categories={categories}
          onSubmit={handleSubmit}
          loading={submitting}
          submitLabel="Add subscription"
        />
      </Card>
    </div>
  )
}

export default CreateSubscriptionPage
