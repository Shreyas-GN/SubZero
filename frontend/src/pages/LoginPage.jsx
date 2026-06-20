import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import useAuth from '../hooks/useAuth'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    try {
      await login(data)
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.error ?? 'Invalid email or password')
    }
  }

  return (
    <div>
      <div className="mb-8">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mb-5 shadow-[0_0_16px_rgba(99,102,241,0.35)]">
          <span className="text-white font-bold text-sm tracking-tight">S</span>
        </div>
        <h1 className="text-xl font-semibold text-zinc-100 tracking-tight">Sign in to SubZero</h1>
        <p className="text-sm text-zinc-500 mt-1">Track every subscription, cancel nothing you love.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          placeholder="••••••••"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="pt-1">
          <Button type="submit" loading={isSubmitting} className="w-full">
            Sign in
          </Button>
        </div>
      </form>

      <p className="text-sm text-zinc-500 text-center mt-6">
        Don't have an account?{' '}
        <Link to="/register" className="text-indigo-400 hover:text-indigo-300 transition-colors">
          Sign up
        </Link>
      </p>
    </div>
  )
}

export default LoginPage
