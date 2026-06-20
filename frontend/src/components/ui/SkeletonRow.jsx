const SkeletonCell = ({ className = '' }) => (
  <div className={`h-4 bg-zinc-800/50 rounded animate-pulse ${className}`} />
)

const SkeletonRow = ({ cols = 4 }) => (
  <tr className="border-b border-zinc-900">
    {Array.from({ length: cols }).map((_, i) => (
      <td key={i} className="py-4 px-4">
        <SkeletonCell className={i === 0 ? 'w-32' : i === cols - 1 ? 'w-16' : 'w-24'} />
      </td>
    ))}
  </tr>
)

export const SkeletonCard = () => (
  <div className="bg-zinc-950/40 backdrop-blur-md border border-zinc-900 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] rounded-xl p-4 space-y-3">
    <div className="flex items-center justify-between">
      <SkeletonCell className="w-28 h-4" />
      <SkeletonCell className="w-16 h-5 rounded-full" />
    </div>
    <SkeletonCell className="w-20 h-6" />
    <SkeletonCell className="w-36 h-3" />
  </div>
)

export const SkeletonStatCard = () => (
  <div className="bg-zinc-950/40 backdrop-blur-md border border-zinc-900 rounded-xl p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] space-y-3">
    <SkeletonCell className="w-24 h-3" />
    <SkeletonCell className="w-32 h-7" />
    <SkeletonCell className="w-20 h-3" />
  </div>
)

export default SkeletonRow
