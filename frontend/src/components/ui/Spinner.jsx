const sizes = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-[3px]',
}

const Spinner = ({ size = 'md', className = '' }) => (
  <div
    className={[
      'rounded-full border-[#27272A] border-t-[#FAFAFA] animate-spin',
      sizes[size],
      className,
    ].join(' ')}
    role="status"
    aria-label="Loading"
  />
)

export const FullPageSpinner = () => (
  <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
    <Spinner size="lg" />
  </div>
)

export default Spinner
