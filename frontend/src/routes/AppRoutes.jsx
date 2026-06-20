import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import AuthLayout from '../layouts/AuthLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import DashboardPage from '../pages/DashboardPage'
import SubscriptionListPage from '../pages/SubscriptionListPage'
import CreateSubscriptionPage from '../pages/CreateSubscriptionPage'
import EditSubscriptionPage from '../pages/EditSubscriptionPage'
import SettingsPage from '../pages/SettingsPage'
import LandingPage from '../pages/LandingPage'

const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-[#27272A] border-t-[#FAFAFA] animate-spin" />
      </div>
    )
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" replace />
}

const RootRoute = () => {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-[#27272A] border-t-[#FAFAFA] animate-spin" />
      </div>
    )
  }

  return currentUser ? <Navigate to="/dashboard" replace /> : <LandingPage />
}

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<RootRoute />} />

    <Route element={<AuthLayout />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>

    <Route element={<ProtectedRoute />}>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/subscriptions" element={<SubscriptionListPage />} />
        <Route path="/subscriptions/new" element={<CreateSubscriptionPage />} />
        <Route path="/subscriptions/:id" element={<EditSubscriptionPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Route>
  </Routes>
)

export default AppRoutes
