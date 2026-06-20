import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { BarChart3, Bell, Globe, ShieldCheck, Zap, LineChart, ArrowRight } from 'lucide-react'

const bentoFeatures = [
  {
    icon: BarChart3,
    title: 'Spending Analytics',
    description: 'Visualize where your money goes with interactive charts and category breakdowns.',
    colSpan: 'md:col-span-2',
  },
  {
    icon: Bell,
    title: 'Renewal Alerts',
    description: 'Never miss a renewal. Get notified before every billing cycle hits.',
    colSpan: 'md:col-span-1',
  },
  {
    icon: Globe,
    title: 'Multi-Currency',
    description: 'Track subscriptions in INR, USD, EUR, GBP, and more.',
    colSpan: 'md:col-span-1',
  },
  {
    icon: Zap,
    title: 'Instant Insights',
    description: 'See your monthly and yearly totals calculated in real time as you add services.',
    colSpan: 'md:col-span-1',
  },
  {
    icon: LineChart,
    title: 'Trend Tracking',
    description: 'Monitor how your spend changes month over month and catch subscription creep early.',
    colSpan: 'md:col-span-1',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Private',
    description: 'Your data stays yours. No ads, no selling, no third-party tracking.',
    colSpan: 'md:col-span-2',
  },
]

// Fires once when the observed element enters the viewport
const useInView = (threshold = 0.1) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}

const LogoMark = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="8" height="8" rx="1.5" stroke="url(#logoGrad)" strokeWidth="1.5" />
    <rect x="11" y="1" width="8" height="8" rx="1.5" stroke="url(#logoGrad)" strokeWidth="1.5" />
    <rect x="1" y="11" width="8" height="8" rx="1.5" stroke="url(#logoGrad)" strokeWidth="1.5" />
    <rect x="11" y="11" width="8" height="8" rx="1.5" fill="url(#logoGrad)" opacity="0.5" />
    <defs>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#818CF8" />
        <stop offset="1" stopColor="#5E6AD2" />
      </linearGradient>
    </defs>
  </svg>
)

const MockStatCard = ({ label, value, accent }) => (
  <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-lg p-3">
    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-base font-semibold font-mono tabular-nums ${accent ?? 'text-zinc-100'}`}>{value}</p>
  </div>
)

const MockBar = ({ pct, opacity }) => (
  <div className="flex-1 flex flex-col justify-end">
    <div
      className="w-full rounded-sm bg-indigo-500"
      style={{ height: `${pct}%`, opacity }}
    />
  </div>
)

const ProductMockup = () => (
  <div className="mt-16 sm:mt-24 w-full max-w-4xl mx-auto" style={{ perspective: '2000px' }}>
    <div
      className="relative rounded-xl overflow-hidden border border-zinc-800/80 bg-zinc-950/50 shadow-2xl shadow-indigo-500/10"
      style={{ transform: 'rotateX(12deg) scale(1.02)', transformOrigin: 'center top' }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/60 bg-zinc-950/80">
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        <div className="flex-1 mx-3 bg-zinc-900 rounded-md h-5 flex items-center px-2">
          <span className="text-[10px] text-zinc-600 font-mono">app.subzero.io/dashboard</span>
        </div>
      </div>

      {/* Dashboard content */}
      <div className="p-5 space-y-4 bg-[#09090B]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-zinc-500">Good morning</p>
            <p className="text-sm font-semibold text-zinc-200">Your Dashboard</p>
          </div>
          <div className="w-7 h-7 rounded-full bg-indigo-500/20 border border-indigo-500/30" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <MockStatCard label="Monthly" value="$124.50" />
          <MockStatCard label="Active Subs" value="12" accent="text-indigo-400" />
          <MockStatCard label="Yearly" value="$1,494" />
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-lg p-4">
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-3">Spending Trend</p>
          <div className="flex items-end gap-1.5 h-20">
            <MockBar pct={40} opacity={0.3} />
            <MockBar pct={55} opacity={0.35} />
            <MockBar pct={45} opacity={0.35} />
            <MockBar pct={70} opacity={0.45} />
            <MockBar pct={60} opacity={0.5} />
            <MockBar pct={80} opacity={0.6} />
            <MockBar pct={65} opacity={0.7} />
            <MockBar pct={90} opacity={0.9} />
          </div>
          <div className="flex justify-between mt-2">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map((m) => (
              <span key={m} className="text-[9px] text-zinc-600">{m}</span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {[
            { name: 'Netflix', amount: '$15.99', dot: 'bg-red-500/40' },
            { name: 'Spotify', amount: '$9.99', dot: 'bg-green-500/40' },
            { name: 'GitHub Pro', amount: '$4.00', dot: 'bg-zinc-600' },
          ].map((sub) => (
            <div
              key={sub.name}
              className="flex items-center justify-between py-2 border-b border-zinc-800/40 last:border-0"
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-5 h-5 rounded-md ${sub.dot}`} />
                <span className="text-xs text-zinc-300">{sub.name}</span>
              </div>
              <span className="text-xs font-mono text-zinc-500">{sub.amount}/mo</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade into page background */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 inset-x-0 h-32"
        style={{ background: 'linear-gradient(to top, #09090B 0%, transparent 100%)' }}
      />
    </div>
  </div>
)

const BentoCard = ({ icon: Icon, title, description, colSpan, style }) => (
  <div
    className={`relative rounded-xl border border-white/[0.06] bg-[#18181B] p-6 flex flex-col gap-3
      shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]
      hover:border-white/[0.12] hover:bg-[#1F1F23]
      transition-[opacity,transform,border-color,background-color] duration-700 ease-out ${colSpan}`}
    style={style}
  >
    <div className="w-9 h-9 rounded-lg bg-[#5E6AD2]/10 border border-[#5E6AD2]/20 flex items-center justify-center">
      <Icon size={18} className="text-[#818CF8]" />
    </div>
    <h3 className="text-[#FAFAFA] font-semibold text-sm tracking-tight">{title}</h3>
    <p className="text-[#71717A] text-sm leading-relaxed">{description}</p>
  </div>
)

const LandingPage = () => {
  const [gridRef, gridInView] = useInView()

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4
        border-b border-zinc-900 backdrop-blur-xl bg-zinc-950/60">
        <div className="flex items-center gap-2">
          <LogoMark />
          <span className="font-semibold text-sm tracking-tight text-[#FAFAFA]">SubZero</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm bg-transparent border border-zinc-800 hover:bg-zinc-900/50
              text-zinc-300 hover:text-zinc-100 transition-all duration-200 px-3 py-1.5 rounded-lg"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="group text-sm bg-[#5E6AD2] hover:bg-[#7C87F8] text-white px-4 py-1.5 rounded-lg
              transition-all duration-200 flex items-center gap-1.5
              shadow-[0_0_16px_rgba(94,106,210,0.35)] hover:shadow-[0_0_24px_rgba(94,106,210,0.5)]"
          >
            Get Started
            <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center pt-40 pb-16 px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(94,106,210,0.22) 0%, transparent 70%),' +
              'radial-gradient(ellipse 50% 40% at 80% 60%, rgba(99,102,241,0.10) 0%, transparent 60%),' +
              'radial-gradient(ellipse 40% 30% at 20% 70%, rgba(129,140,248,0.08) 0%, transparent 60%)',
          }}
        />

        <div className="relative max-w-3xl mx-auto flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08]
            bg-white/[0.03] text-xs text-[#A1A1AA] tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5E6AD2] animate-pulse" />
            Subscription Intelligence
          </div>

          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1]">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #FAFAFA 40%, #A1A1AA 70%, #71717A 100%)' }}
            >
              Track Every Sub.
            </span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #818CF8 0%, #A5B4FC 50%, #C7D2FE 100%)' }}
            >
              Never Overpay.
            </span>
          </h1>

          <p className="text-[#A1A1AA] text-lg leading-relaxed max-w-2xl mx-auto">
            One dashboard for every recurring charge. Visualize spend, catch renewals early,
            and stop paying for things you forgot about.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <Link
              to="/register"
              className="group px-6 py-3 rounded-xl bg-[#5E6AD2] hover:bg-[#7C87F8] text-white text-sm font-medium
                transition-all duration-200 flex items-center gap-2
                shadow-[0_0_30px_rgba(94,106,210,0.45)] hover:shadow-[0_0_45px_rgba(94,106,210,0.65)]
                hover:scale-[1.02]"
            >
              Get Started — it's free
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 rounded-xl bg-transparent border border-zinc-800 hover:bg-zinc-900/50
                text-zinc-300 hover:text-zinc-100 text-sm font-medium transition-all duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>

        <ProductMockup />
      </section>

      {/* Bento grid */}
      <section className="max-w-5xl mx-auto px-6 pb-28">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold tracking-tight text-[#FAFAFA]">
            Everything you need, nothing you don't
          </h2>
          <p className="text-[#71717A] text-sm mt-2">Built for people who care where their money goes.</p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {bentoFeatures.map((f, i) => (
            <BentoCard
              key={f.title}
              {...f}
              style={{
                opacity: gridInView ? 1 : 0,
                transform: gridInView ? 'translateY(0)' : 'translateY(2rem)',
                transitionDelay: `${i * 80}ms`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] px-6 py-6 text-center text-xs text-[#3F3F46]">
        © {new Date().getFullYear()} SubZero · Built to kill subscription creep.
      </footer>
    </div>
  )
}

export default LandingPage
