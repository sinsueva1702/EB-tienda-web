import { Link, createFileRoute } from '@tanstack/react-router'
import { XCircle, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/checkout/cancel')({
  component: CheckoutCancel,
})

function CheckoutCancel() {
  return (
    <div className="py-24 flex items-center justify-center p-5">
      <div className="tech-card rounded-2xl p-12 text-center max-w-lg relative border-rose-500/20">
        
        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-450 flex items-center justify-center mb-6 mx-auto">
          <XCircle className="w-8 h-8 text-rose-455" />
        </div>
        
        <h1 className="text-3xl font-mono uppercase font-bold text-white mb-4">
          Pango cancelado
        </h1>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-8 font-sans">
          La transacción fue cancelada y no se realizó ningún cargo. Tus productos siguen guardados en el carrito para que puedas completar tu pedido cuando estés listo.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider bg-transparent border border-border-active hover:border-white text-slate-300 hover:text-white px-6 py-3 rounded-lg font-bold transition-all cursor-pointer group"
        >
          <span>Volver al catálogo</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        
        <div className="mt-8 text-[9px] font-mono text-slate-500 uppercase tracking-wider">
          ESTADO DEL PEDIDO: TRANSACCIÓN CANCELADA
        </div>
      </div>
    </div>
  )
}
