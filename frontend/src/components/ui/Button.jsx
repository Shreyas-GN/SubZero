const variants = {
  primary: 'bg-indigo-600 hover:bg-indigo-500 text-white border-transparent',
  secondary: 'bg-zinc-900 hover:bg-zinc-800 text-[#FAFAFA] border-[#27272A]',
  ghost: 'bg-transparent hover:bg-zinc-900 text-[#A1A1AA] hover:text-[#FAFAFA] border-transparent',
  danger: 'bg-transparent hover:bg-red-500/10 text-red-400 hover:text-red-300 border-[#27272A] hover:border-red-500/30',
}

const sizes = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-11 px-5 text-sm gap-2',
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const isDisabled = disabled || loading

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center font-medium rounded-lg border',
        'transition-colors duration-200 outline-none',
        'focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]',
        variants[variant],
        sizes[size],
        isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        className,
      ].join(' ')}
    >
      {loading && (
        <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin shrink-0" />
      )}
      {children}
    </button>
  )
}

export default Button
