import { useEffect, useState } from 'react'
import { createCheckoutSession, getStripeEnabled } from '@/lib/stripe'

export function BuyButton({
  productId,
  className = '',
}: {
  productId: number
  className?: string
}) {
  const [loading, setLoading] = useState(false)
  const [stripeEnabled, setStripeEnabled] = useState<boolean | null>(null)

  useEffect(() => {
    getStripeEnabled().then(setStripeEnabled)
  }, [])

  const handleClick = async () => {
    setLoading(true)
    try {
      const url = await createCheckoutSession({ data: productId })
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setLoading(false)
    }
  }

  if (stripeEnabled === false) {
    return (
      <button
        disabled
        className={`px-6 py-2 rounded-lg border ${className}`}
        title="Pago no está disponible"
      >
        Pago no disponible
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading || stripeEnabled === null}
      className={`px-6 py-2 rounded-lg border disabled:cursor-wait ${className}`}
    >
      {loading ? 'Procesando...' : 'Comprar ahora'}
    </button>
  )
}
