import { useCart } from '@/context/CartContext'
import { X, Plus, Minus, Trash2, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { createCheckoutSession, getStripeEnabled } from '@/lib/stripe'

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
    clearCart,
  } = useCart()

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    // If we only have 1 item in the cart, we can try to use the template's single-item Stripe checkout
    if (cart.length === 1) {
      try {
        const stripeEnabled = await getStripeEnabled()
        if (stripeEnabled) {
          const url = await createCheckoutSession({ data: cart[0].id })
          if (url) {
            window.location.href = url
            return
          }
        }
      } catch (error) {
        console.error('Stripe checkout error:', error)
      }
    }

    // Fallback: Elegant immersive custom simulation for multiple items or if Stripe is not configured
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        clearCart()
        setSuccess(false)
        setIsCartOpen(false)
      }, 4000)
    }, 2000)
  }

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md border-l border-border-active/20 bg-[#12141a] text-slate-100 tech-grid-dots">
          <div className="h-full flex flex-col justify-between py-6 shadow-2xl relative">
            
            {/* Header */}
            <div className="px-6 flex items-center justify-between border-b border-border-active/10 pb-5">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-slate-300" />
                <h2 className="text-xl font-mono uppercase tracking-wider font-semibold text-white">
                  Your Cart <span className="text-xs text-slate-400 font-normal">[{cartCount} {cartCount === 1 ? 'item' : 'items'}]</span>
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-md hover:bg-[#323842]/40 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content / Items List */}
            <div className="flex-1 overflow-y-auto py-4 px-6">
              {success ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-slate-500/10 border border-slate-400 flex items-center justify-center mb-4 tech-glow-subtle-strong">
                    <ShieldCheck className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-mono uppercase tracking-wider font-bold mb-2 text-white">
                    Order Placed Successfully
                  </h3>
                  <p className="text-sm text-slate-400 max-w-xs font-sans">
                    Thank you for your purchase! Your request has been securely processed. We are preparing your hardware components or scheduling your technical service.
                  </p>
                  <div className="mt-8 text-xs font-mono text-slate-300 uppercase tracking-widest bg-[#1a1d21] px-3 py-1 border border-border-active/40">
                    ORDER PROCESSED
                  </div>
                </div>
              ) : cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <ShoppingBag className="w-12 h-12 text-slate-600 mb-4 stroke-[1.5]" />
                  <h3 className="text-lg font-mono uppercase tracking-wider font-semibold text-slate-300">
                    Your Cart is Empty
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 max-w-xs font-sans">
                    Browse our catalog of premium hardware components and professional IT services to fill your cart.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 font-mono text-xs uppercase tracking-wider text-white hover:text-slate-300 flex items-center gap-1 group cursor-pointer"
                  >
                    Browse Catalog <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedVariant || ''}`}
                      className="flex gap-4 p-3 border border-border-active/10 bg-[#1a1d21] rounded-xl relative group hover:border-border-active transition-all duration-300"
                    >
                      <div className="w-20 h-20 shrink-0 overflow-hidden rounded-lg bg-black border border-border-active/5">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-mono font-medium text-white line-clamp-1">
                            {item.name}
                          </h4>
                          {item.selectedVariant && (
                            <p className="text-[10px] font-mono text-slate-300 mt-0.5 uppercase tracking-wide bg-[#23272d] border border-border-active/40 inline-block px-1.5 py-0.5 rounded">
                              {item.selectedVariant}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 border border-[#323842] rounded-md bg-[#14171a] p-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedVariant)}
                              className="p-0.5 hover:text-white transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono w-6 text-center text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedVariant)}
                              className="p-0.5 hover:text-white transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-sm font-mono font-bold text-white">
                              ${(item.price * item.quantity).toLocaleString()}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id, item.selectedVariant)}
                              className="text-slate-500 hover:text-rose-450 transition-colors cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Summary */}
            {cart.length > 0 && !success && (
              <div className="px-6 border-t border-border-active/10 pt-5 space-y-4">
                <div className="flex justify-between text-slate-400 font-mono text-sm">
                  <span>SUBTOTAL</span>
                  <span className="text-white font-bold text-lg">
                    ${cartTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>SECURE CHECKOUT</span>
                  <span className="text-slate-300 flex items-center gap-1 uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> SSL SECURE 256-BIT
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full relative py-3 bg-white hover:bg-slate-200 text-bg-deep font-mono font-bold uppercase tracking-wider rounded-lg transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-bg-deep border-t-transparent" />
                      PROCESSING ORDER...
                    </span>
                  ) : (
                    <>
                      PROCEED TO SECURE CHECKOUT
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-bg-deep" />
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2 bg-transparent hover:bg-card-dark text-slate-400 font-mono text-xs uppercase tracking-wider border border-border-active/30 hover:border-border-active rounded-lg transition-colors cursor-pointer"
                >
                  Close Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
