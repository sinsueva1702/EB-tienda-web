import { Link, createFileRoute } from '@tanstack/react-router'
import { getProductById, DbProduct } from '@/lib/db-products'
import { useCart } from '@/context/CartContext'
import { useState, useEffect } from 'react'
import { ArrowLeft, ShoppingCart, ShieldCheck, Layers, Cpu, Award, FileText } from 'lucide-react'
import { BuyButton } from '@/components/BuyButton'

export const Route = createFileRoute('/products/$productId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const product = await getProductById({ data: +params.productId })
    if (!product) {
      throw new Error('Product not found')
    }
    return product
  },
})

function RouteComponent() {
  const product = Route.useLoaderData() as DbProduct
  const { addToCart } = useCart()

  // Parse JSON data safely
  const galleryImages = JSON.parse(product.images) as string[]
  const variantList = JSON.parse(product.variants) as Array<{ name: string; options: string[] }>
  const specsObj = JSON.parse(product.specs) as Record<string, string>

  // Gallery state
  const [activeImage, setActiveImage] = useState(product.image)

  // Sync active image if product changes
  useEffect(() => {
    setActiveImage(product.image)
  }, [product])

  // Variant choices state
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})

  // Set default variants on load
  useEffect(() => {
    if (variantList && variantList.length > 0) {
      const defaults: Record<string, string> = {}
      variantList.forEach((v) => {
        if (v.options && v.options.length > 0) {
          defaults[v.name] = v.options[0]
        }
      })
      setSelectedVariants(defaults)
    }
  }, [product])

  const handleVariantSelect = (variantName: string, option: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [variantName]: option,
    }))
  }

  // Animation visual feedback
  const [justAdded, setJustAdded] = useState(false)

  const handleAddToCart = () => {
    // Compile variant summary string
    const variantString = Object.entries(selectedVariants)
      .map(([name, value]) => `${name}: ${value}`)
      .join(' | ')

    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      selectedVariant: variantString || undefined,
    })

    setJustAdded(true)
    setTimeout(() => {
      setJustAdded(false)
    }, 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Back link breadcrumb */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Hardware & Services</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        
        {/* Left column: Image gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border-active/20 bg-card-dark p-2">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Thumbnails list */}
          {galleryImages && galleryImages.length > 1 && (
            <div className="grid grid-cols-3 gap-4">
              {galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`aspect-[16/10] rounded-xl overflow-hidden bg-bg-deep border transition-all relative ${
                    activeImage === imgUrl
                      ? 'border-white'
                      : 'border-border-active/40 hover:border-border-active'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} gallery ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {activeImage === imgUrl && (
                    <div className="absolute inset-0 bg-white/5 pointer-events-none" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right column: Buying panel and detail content */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest bg-card-dark border border-border-active/60 text-slate-300 px-3 py-1 rounded-md">
              {product.category}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest bg-bg-deep border border-border-active/30 text-slate-400 px-3 py-1 rounded-md">
              Item Code: #EB-0{product.id}0
            </span>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-mono font-extrabold uppercase tracking-tight text-white mb-3">
              {product.name}
            </h1>
            <p className="text-sm text-slate-400 font-mono tracking-wider">
              {product.category === 'Services' ? (
                '// SERVICE AVAILABLE FOR BOOKING'
              ) : product.stock > 0 ? (
                `// IN STOCK: ${product.stock} UNITS AVAILABLE`
              ) : (
                '// OUT OF STOCK'
              )}
            </p>
          </div>

          {/* Short description */}
          <p className="text-slate-400 text-sm leading-relaxed font-sans border-l-2 border-slate-600 pl-4 py-1">
            {product.shortDescription}
          </p>

          {/* Big price display */}
          <div className="p-4 rounded-2xl bg-card-dark border border-border-active/20 flex items-center justify-between">
            <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">
              {product.category === 'Services' ? 'SERVICE FEE' : 'UNIT PRICE'}
            </span>
            <span className="text-3xl font-mono font-extrabold text-white">
              ${product.price.toLocaleString()}
            </span>
          </div>

          {/* Dynamic Variant selectors */}
          {variantList && variantList.length > 0 && (
            <div className="space-y-5 pt-4 border-t border-border-active/20">
              <h3 className="font-mono text-xs uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-text-gray" />
                <span>Choose Options</span>
              </h3>
              
              {variantList.map((variant) => (
                <div key={variant.name} className="space-y-2">
                  <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    {variant.name}
                  </span>
                  <div className="flex flex-col gap-2">
                    {variant.options.map((opt) => {
                      const isSelected = selectedVariants[variant.name] === opt
                      return (
                        <button
                          key={opt}
                          onClick={() => handleVariantSelect(variant.name, opt)}
                          className={`w-full text-left px-4 py-2.5 rounded-lg font-mono text-[11px] tracking-wider transition-all border cursor-pointer ${
                            isSelected
                              ? 'bg-white text-bg-deep border-white font-bold'
                              : 'bg-bg-deep text-slate-400 border-border-active hover:border-border-active/80 hover:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{opt}</span>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-bg-deep" />}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add to cart / Actions bar */}
          <div className="space-y-4 pt-6 border-t border-border-active/20">
            <div className="flex gap-4">
              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                disabled={justAdded || (product.category !== 'Services' && product.stock === 0)}
                className={`flex-1 relative py-4 font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 overflow-hidden cursor-pointer flex items-center justify-center gap-2 ${
                  justAdded
                    ? 'bg-card-dark text-white border border-border-active'
                    : 'bg-white hover:bg-slate-200 text-bg-deep'
                }`}
              >
                {justAdded ? (
                  <>
                    <ShieldCheck className="w-4 h-4 text-white" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>{product.category === 'Services' ? 'Book Service' : 'Add Hardware to Cart'}</span>
                  </>
                )}
              </button>

              {/* Buy Now Stripe checkout */}
              <BuyButton
                productId={product.id}
                className="py-4 px-6 bg-transparent hover:bg-card-dark text-slate-300 hover:text-white border border-border-active hover:border-border-active/80 font-mono text-xs uppercase tracking-wider rounded-xl transition-colors shrink-0 flex items-center justify-center cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-center gap-2 font-mono text-[9px] text-slate-500 uppercase tracking-widest pt-2">
              <Award className="w-3.5 h-3.5 text-text-gray" />
              <span>Full service satisfaction warranty & support included</span>
            </div>
          </div>

        </div>
      </div>

      {/* Mid page product specifications and documentation */}
      <section className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-border-active/20 pt-16">
        
        {/* Full technical description */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-text-gray" />
            <h2 className="font-mono text-sm uppercase tracking-widest font-extrabold text-white">
              Detailed Description
            </h2>
          </div>
          <div className="font-sans text-slate-400 text-sm leading-relaxed space-y-4">
            {product.description.split('. ').map((paragraph, idx) => {
              if (!paragraph.trim()) return null
              return (
                <p key={idx}>
                  {paragraph.trim()}{idx === product.description.split('. ').length - 1 ? '' : '.'}
                </p>
              )
            })}
          </div>
        </div>

        {/* Specifications tabular documentation */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-text-gray" />
            <h2 className="font-mono text-sm uppercase tracking-widest font-extrabold text-white">
              Details & Specifications
            </h2>
          </div>

          <div className="border border-border-active/20 bg-bg-deep rounded-2xl overflow-hidden font-mono text-xs">
            <div className="bg-[#14171a] px-4 py-3 border-b border-border-active/20 text-slate-400 text-[10px] tracking-widest flex justify-between uppercase">
              <span>Specification</span>
              <span>Detail</span>
            </div>
            <div className="divide-y divide-border-active/10">
              {specsObj &&
                Object.entries(specsObj).map(([key, value]) => (
                  <div key={key} className="px-4 py-3 flex items-center justify-between gap-4">
                    <span className="text-slate-500 uppercase text-[10px] tracking-wider shrink-0">{key}</span>
                    <span className="text-slate-200 text-right font-medium">{value}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

      </section>

    </div>
  )
}
