const variants = {
  default: 'bg-zinc-800/60 text-zinc-400 border-zinc-700/50',
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  cancelled: 'bg-zinc-800/40 text-zinc-500 border-zinc-700/30',
  paused: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  monthly: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  yearly: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  quarterly: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
}

const Badge = ({ children, variant = 'default', className = '' }) => (
  <span
    className={[
      'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border',
      variants[variant] ?? variants.default,
      className,
    ].join(' ')}
  >
    {variant === 'active' && (
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.7)] shrink-0" />
    )}
    {variant === 'cancelled' && (
      <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 shrink-0" />
    )}
    {children}
  </span>
)

export default Badge
