import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import formatCurrency from '../../utils/formatCurrency'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-zinc-950/80 backdrop-blur-md border border-zinc-800 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] rounded-lg px-3.5 py-2.5">
      <p className="text-xs text-zinc-500 mb-1 font-mono tracking-widest uppercase">{label}</p>
      <p className="text-sm font-semibold text-zinc-100 font-mono tracking-tight">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  )
}

const yTickFormatter = (v) => {
  if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`
  if (v >= 1000) return `₹${(v / 1000).toFixed(0)}k`
  return `₹${v}`
}

const SpendingChart = ({ data = [] }) => (
  <ResponsiveContainer width="100%" height={220}>
    <AreaChart data={data} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid
        strokeDasharray="3 3"
        stroke="#18181b"
        vertical={false}
      />
      <XAxis
        dataKey="name"
        tick={{ fill: '#71717a', fontSize: 11, fontFamily: 'ui-monospace, monospace' }}
        axisLine={false}
        tickLine={false}
      />
      <YAxis
        tick={{ fill: '#71717a', fontSize: 11, fontFamily: 'ui-monospace, monospace' }}
        axisLine={false}
        tickLine={false}
        width={56}
        tickFormatter={yTickFormatter}
      />
      <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3f3f46', strokeWidth: 1 }} />
      <Area
        type="monotone"
        dataKey="amount"
        stroke="#6366f1"
        strokeWidth={2}
        fill="url(#colorSpend)"
        dot={false}
        activeDot={{ r: 4, fill: '#6366f1', stroke: '#18181b', strokeWidth: 2 }}
      />
    </AreaChart>
  </ResponsiveContainer>
)

export default SpendingChart
