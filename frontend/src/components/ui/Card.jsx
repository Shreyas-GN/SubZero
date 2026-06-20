const Card = ({ children, className = '', hover = false, ...props }) => (
  <div
    {...props}
    className={[
      'bg-zinc-950/40 backdrop-blur-md border border-zinc-900 rounded-xl p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]',
      hover ? 'transition-all duration-300 ease-out hover:border-zinc-800 cursor-pointer' : '',
      className,
    ].join(' ')}
  >
    {children}
  </div>
)

export const CardHeader = ({ children, className = '' }) => (
  <div className={`flex items-center justify-between mb-4 ${className}`}>
    {children}
  </div>
)

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-sm font-medium text-[#A1A1AA] tracking-tight ${className}`}>
    {children}
  </h3>
)

export default Card
