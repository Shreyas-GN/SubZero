import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, CreditCard, Settings, LogOut, Zap } from 'lucide-react'
import useAuth from '../hooks/useAuth'

const NAV_LINKS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/subscriptions', icon: CreditCard, label: 'Subscriptions' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

const navClass = ({ isActive }) =>
  [
    'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200',
    isActive
      ? 'bg-zinc-900 text-zinc-100 font-medium border-l-2 border-indigo-500'
      : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50',
  ].join(' ')

const DashboardLayout = () => {
  const { currentUser, logout } = useAuth()
  const initial = currentUser?.name?.[0]?.toUpperCase() ?? 'U'

  return (
    <div className="min-h-screen bg-[#09090B] flex">
      {/* Sidebar — desktop */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-[#27272A] bg-[#09090B]">
        <div className="h-14 flex items-center px-5 border-b border-[#27272A] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center shrink-0">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold text-[#FAFAFA] tracking-tight">SubZero</span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV_LINKS.map(({ to, icon: Icon, label, end }) => (
            <NavLink key={to} to={to} end={end} className={navClass}>
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-[#27272A] shrink-0">
          <div className="flex items-center gap-2.5 px-3 py-2 mb-0.5">
            <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-semibold text-white shrink-0">
              {initial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[#FAFAFA] truncate">{currentUser?.name}</p>
              <p className="text-[11px] text-zinc-500 truncate">{currentUser?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#A1A1AA] hover:text-red-400 hover:bg-red-500/10 transition-colors duration-200 cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="md:hidden h-14 shrink-0 border-b border-[#27272A] bg-[#09090B] flex items-center px-4 gap-3">
          <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-[#FAFAFA]">SubZero</span>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden shrink-0 border-t border-[#27272A] bg-[#09090B] flex">
          {NAV_LINKS.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors duration-200 ${
                  isActive ? 'text-[#FAFAFA]' : 'text-[#71717A]'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default DashboardLayout
