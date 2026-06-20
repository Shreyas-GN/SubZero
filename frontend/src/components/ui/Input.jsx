const Input = ({
  label,
  error,
  hint,
  className = '',
  containerClassName = '',
  ...props
}) => (
  <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
    {label && (
      <label className="text-sm font-medium text-zinc-300 tracking-tight">
        {label}
      </label>
    )}
    <input
      {...props}
      className={[
        'h-11 w-full rounded-lg bg-zinc-900/50 border px-3 text-sm text-zinc-100',
        'placeholder:text-zinc-500 outline-none',
        'shadow-[inset_0_2px_4px_rgba(0,0,0,0.35)]',
        'transition-all duration-200',
        'focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500',
        error ? 'border-red-500/70 focus:ring-red-500/30 focus:border-red-500' : 'border-zinc-800',
        props.disabled ? 'opacity-40 cursor-not-allowed' : '',
        className,
      ].join(' ')}
    />
    {error && <p className="text-xs text-red-400">{error}</p>}
    {!error && hint && <p className="text-xs text-zinc-500">{hint}</p>}
  </div>
)

export default Input
