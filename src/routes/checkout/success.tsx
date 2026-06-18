import { Link, createFileRoute } from '@tanstack/react-router'
import { ShieldCheck, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/checkout/success')({
  component: CheckoutSuccess,
})

function CheckoutSuccess() {
  return (
    <div className="py-24 flex items-center justify-center p-5">
      <div className="tech-card rounded-2xl p-12 text-center max-w-lg relative">
        <div className="w-16 h-16 rounded-full bg-slate-500/10 border border-slate-400 flex items-center justify-center mb-6 mx-auto tech-glow-subtle-strong">
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-3xl font-mono uppercase font-bold text-white mb-4">
          Payment Successful
        </h1>
        
        <p className="text-slate-450 text-sm leading-relaxed mb-8 font-sans">
          Thank you for your order! Your payment has been securely processed. We are preparing your hardware components or scheduling your technical service.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider bg-white hover:bg-slate-200 text-bg-deep px-6 py-3 rounded-lg font-bold transition-all cursor-pointer group"
        >
          <span>Return to Catalog</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-bg-deep" />
        </Link>
        
        <div className="mt-8 text-[9px] font-mono text-slate-500 uppercase tracking-wider">
          ORDER STATUS: SUCCESS_CONFIRMED
        </div>
      </div>
    </div>
  )
}
