import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import useAuth from '../hooks/useAuth'
import authService from '../services/authService'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

const RegisterPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    try {
      await authService.signup(data)
      await login({ email: data.email, password: data.password })
      navigate('/')
    } catch (err) {
      const msg = err.response?.data?.errors?.[0] ?? err.response?.data?.error ?? 'Registration failed'
      toast.error(msg)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mb-5 shadow-[0_0_16px_rgba(99,102,241,0.35)]">
          <span className="text-white font-bold text-sm tracking-tight">S</span>
        </div>
        <h1 className="text-xl font-semibold text-zinc-100 tracking-tight">Create your account</h1>
        <p className="text-sm text-zinc-500 mt-1">Start tracking subscriptions in under a minute.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          error={errors.password?.message}
          hint="8 characters minimum"
          {...register('password')}
        />

        <div className="pt-1">
          <Button type="submit" loading={isSubmitting} className="w-full">
            Create account
          </Button>
        </div>
      </form>

      <p className="text-sm text-zinc-500 text-center mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default RegisterPage
