import { Outlet } from 'react-router-dom'

const AuthLayout = () => (
  <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-4">
    <div className="w-full max-w-md bg-[#18181B] border border-[#27272A] rounded-xl p-8">
      <Outlet />
    </div>
  </div>
)

export default AuthLayout
