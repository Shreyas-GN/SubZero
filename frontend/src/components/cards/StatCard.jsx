import { SkeletonStatCard } from '../ui/SkeletonRow'

const StatCard = ({ title, value, icon: Icon, trend, loading }) => {
  if (loading) return <SkeletonStatCard />

  return (
    <div className="group bg-zinc-950/40 backdrop-blur-md border border-zinc-900 rounded-xl p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] hover:scale-[1.01] hover:border-zinc-800 transition-all duration-300 ease-out">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5 min-w-0">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
            {title}
          </p>
          <p className="text-2xl font-semibold text-zinc-100 tracking-tight font-mono tabular-nums">
            {value ?? '—'}
          </p>
          {trend && (
            <p className="text-xs text-zinc-500 font-mono tracking-tight">{trend}</p>
          )}
        </div>
        {Icon && (
          <div className="w-9 h-9 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center shrink-0 group-hover:border-zinc-700 transition-colors duration-300">
            <Icon className="w-4 h-4 text-zinc-400" />
          </div>
        )}
      </div>
    </div>
  )
}

export default StatCard
