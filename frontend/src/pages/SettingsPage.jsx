import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { LogOut } from 'lucide-react'
import toast from 'react-hot-toast'
import useAuth from '../hooks/useAuth'
import authService from '../services/authService'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  currency: z.string().min(1).max(10),
  notifications_enabled: z.boolean(),
})

const CURRENCIES = [
  { value: 'INR', label: 'INR — Indian Rupee (₹)' },
  { value: 'USD', label: 'USD — US Dollar ($)' },
  { value: 'EUR', label: 'EUR — Euro (€)' },
  { value: 'GBP', label: 'GBP — British Pound (£)' },
  { value: 'JPY', label: 'JPY — Japanese Yen (¥)' },
]

const selectClass =
  'h-11 w-full rounded-lg bg-zinc-900 border border-[#3F3F46] px-3 text-sm text-[#FAFAFA] outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 transition-colors'

const SettingsPage = () => {
  const { currentUser, logout } = useAuth()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', currency: 'INR', notifications_enabled: true },
  })

  useEffect(() => {
    if (currentUser) {
      reset({
        name: currentUser.name ?? '',
        currency: currentUser.currency ?? 'INR',
        notifications_enabled: currentUser.notifications_enabled ?? true,
      })
    }
  }, [currentUser, reset])

  const onSubmit = async (data) => {
    try {
      await authService.update(data)
      toast.success('Settings saved')
    } catch {
      toast.error('Failed to save settings')
    }
  }

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-[#FAFAFA] tracking-tight">Settings</h1>
        <p className="text-sm text-[#71717A] mt-0.5">Manage your account preferences</p>
      </div>

      <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-6 space-y-5">
        <h2 className="text-sm font-semibold text-[#FAFAFA]">Profile</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Name" error={errors.name?.message} {...register('name')} />

          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-[#FAFAFA]">Email</p>
            <p className="text-sm text-[#A1A1AA]">{currentUser?.email}</p>
            <p className="text-xs text-[#71717A]">Email address cannot be changed.</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#FAFAFA]">Currency</label>
            <select className={selectClass} {...register('currency')}>
              {CURRENCIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-[#27272A]">
            <div>
              <p className="text-sm font-medium text-[#FAFAFA]">Email reminders</p>
              <p className="text-xs text-[#71717A] mt-0.5">Get notified before renewals</p>
            </div>
            <label className="flex items-center cursor-pointer gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 accent-indigo-500 rounded"
                {...register('notifications_enabled')}
              />
              <span className="text-xs text-[#71717A]">Enabled</span>
            </label>
          </div>

          <Button type="submit" loading={isSubmitting}>
            Save changes
          </Button>
        </form>
      </div>

      <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-6">
        <h2 className="text-sm font-semibold text-[#FAFAFA] mb-1">Sign out</h2>
        <p className="text-xs text-[#71717A] mb-4">End your current session on this device.</p>
        <Button variant="secondary" onClick={logout}>
          <LogOut className="w-4 h-4" />
          Sign out
        </Button>
      </div>
    </div>
  )
}

export default SettingsPage
