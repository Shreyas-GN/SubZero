import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Button from '../ui/Button'
import Input from '../ui/Input'

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((v) => !isNaN(parseFloat(v)) && parseFloat(v) > 0, {
      message: 'Must be a positive number',
    }),
  renewal_date: z.string().min(1, 'Renewal date is required'),
  category_id: z.string().optional(),
  billing_cycle: z.enum(['monthly', 'quarterly', 'yearly']),
  status: z.enum(['active', 'paused', 'cancelled']),
  notes: z.string().max(1000).optional(),
})

const BILLING_OPTIONS = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' },
]

const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'cancelled', label: 'Cancelled' },
]

const selectClass = [
  'h-11 w-full rounded-lg bg-zinc-900/50 border border-zinc-800 px-3 text-sm text-zinc-100',
  'outline-none transition-all duration-200',
  'shadow-[inset_0_2px_4px_rgba(0,0,0,0.35)]',
  'focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500',
].join(' ')

const labelClass = 'text-sm font-medium text-zinc-300 tracking-tight'
const errorClass = 'text-xs text-red-400'

const SubscriptionForm = ({
  initialData = null,
  categories = [],
  onSubmit,
  loading = false,
  submitLabel = 'Save',
}) => {
  const isEditMode = initialData !== null
  const formRef = useRef(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      amount: '',
      renewal_date: '',
      category_id: '',
      billing_cycle: 'monthly',
      status: 'active',
      notes: '',
    },
  })

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name ?? '',
        amount: String(initialData.amount ?? ''),
        renewal_date: initialData.renewal_date ?? '',
        category_id: initialData.category_id ?? '',
        billing_cycle: initialData.billing_cycle ?? 'monthly',
        status: initialData.status ?? 'active',
        notes: initialData.notes ?? '',
      })
    }
  }, [initialData, reset])

  const handleFormSubmit = (data) => {
    onSubmit({ ...data, amount: parseFloat(data.amount) })
  }

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      formRef.current?.requestSubmit()
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit(handleFormSubmit)} onKeyDown={handleKeyDown} className="space-y-5">
      <Input
        label="Name"
        placeholder="e.g. Spotify, Netflix"
        error={errors.name?.message}
        {...register('name')}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Amount"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="0.00"
          error={errors.amount?.message}
          hint="Amount in account currency"
          {...register('amount')}
        />

        <Input
          label="Renewal Date"
          type="date"
          error={errors.renewal_date?.message}
          {...register('renewal_date')}
        />
      </div>

      <div className={`grid gap-4 ${isEditMode ? 'grid-cols-2' : 'grid-cols-1'}`}>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Billing Cycle</label>
          <select className={selectClass} {...register('billing_cycle')}>
            {BILLING_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {errors.billing_cycle && (
            <p className={errorClass}>{errors.billing_cycle.message}</p>
          )}
        </div>

        {isEditMode && (
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Status</label>
            <select className={selectClass} {...register('status')}>
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            {errors.status && (
              <p className={errorClass}>{errors.status.message}</p>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>Category</label>
        <select className={selectClass} {...register('category_id')}>
          <option value="">No category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>
          Notes <span className="text-zinc-600 font-normal">(optional)</span>
        </label>
        <textarea
          rows={3}
          placeholder="Any notes about this subscription…"
          className={[
            'w-full rounded-lg bg-zinc-900/50 border border-zinc-800 px-3 py-2.5 text-sm text-zinc-100',
            'placeholder:text-zinc-500 outline-none resize-none',
            'shadow-[inset_0_2px_4px_rgba(0,0,0,0.35)]',
            'transition-all duration-200',
            'focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500',
            errors.notes ? 'border-red-500/70' : '',
          ].join(' ')}
          {...register('notes')}
        />
        {errors.notes && <p className={errorClass}>{errors.notes.message}</p>}
      </div>

      <div className="pt-1 flex items-center justify-between gap-4">
        <span className="text-xs text-zinc-600 select-none hidden sm:block">
          <kbd className="font-mono bg-zinc-800 border border-zinc-700 rounded px-1 py-0.5 text-zinc-400">
            {navigator.platform?.includes('Mac') ? '⌘' : 'Ctrl'}
          </kbd>
          {' + '}
          <kbd className="font-mono bg-zinc-800 border border-zinc-700 rounded px-1 py-0.5 text-zinc-400">
            ↵
          </kbd>
          <span className="ml-1.5 text-zinc-600">to submit</span>
        </span>
        <Button type="submit" loading={loading} className="ml-auto">
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

export default SubscriptionForm
