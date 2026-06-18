import { Link, createFileRoute } from '@tanstack/react-router'
import { getProducts, DbProduct } from '@/lib/db-products'
import { useCart } from '@/context/CartContext'
import { useState, useMemo } from 'react'
import { Search, Cpu, SlidersHorizontal, ShoppingCart, Info, Wrench, Package, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: ProductsIndex,
  loader: async () => {
    return await getProducts()
  },
})

function ProductsIndex() {
  const loadedProducts = Route.useLoaderData() as DbProduct[]
  const { addToCart } = useCart()

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')

  // Categories derived from products + ALL
  const categories = useMemo(() => {
    const unique = Array.from(new Set(loadedProducts.map((p) => p.category)))
    return ['ALL', ...unique]
  }, [loadedProducts])

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return loadedProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === 'ALL' || product.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [loadedProducts, searchQuery, selectedCategory])

  // Helper to map category name to visual icon
  const getCategoryIcon = (cat: string) => {
    switch (cat.toUpperCase()) {
      case 'SERVICES':
        return <Wrench className="w-4 h-4 text-text-gray" />
      case 'HARDWARE':
        return <Package className="w-4 h-4 text-text-gray" />
      default:
        return <Cpu className="w-4 h-4 text-text-gray" />
    }
  }

  return (
    <div className="py-6 sm:py-10">
      
      {/* Friendly Professional Hero Section */}
      <section className="relative overflow-hidden mb-12 sm:mb-16 border-b border-border-active/15 bg-gradient-to-b from-[#111317] to-[#0e1012] py-16 sm:py-24">
        {/* Subtle grid and dark grayscale lighting effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015),transparent_65%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-slate-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-active/40 bg-card-dark text-slate-300 text-xs font-mono tracking-wider uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" />
            <span>Bienvenido a Easybyte Informática</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-mono font-extrabold tracking-tight text-white uppercase mb-6 leading-tight">
            SERVICIO TÉCNICO <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-slate-500">
              & HARDWARE
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed font-sans mb-8">
            Nos dedicamos a crear y mantener espacios digitales de alto rendimiento. Desde el ensamblaje de PC a medida y la limpieza profunda hasta venta de software y componentes de hardware.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono uppercase tracking-wider">
            <span className="border border-border-active/40 bg-card-dark px-4 py-2 text-slate-400 rounded-lg">
              Artículos disponibles: <span className="text-white font-bold">{loadedProducts.length}</span>
            </span>
            {/*<span className="border border-border-active/40 bg-card-dark px-4 py-2 text-slate-400 rounded-lg">
              Estado de soporte: <span className="text-white font-bold">Online</span>
            </span>*/}
          </div>
        </div>
      </section>

      {/* Main Operations Terminal (Filters and Search) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="p-4 sm:p-6 border border-border-active/20 bg-card-dark/60 backdrop-blur-md rounded-2xl relative">
          
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-6 justify-between">
            
            {/* Elegant search */}
            <div className="relative flex-1 max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Search className="w-4 h-4 text-text-gray" />
              </div>
              <input
                type="text"
                placeholder="Buscar hardware o servicios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-bg-deep border border-border-active/40 focus:border-text-white text-slate-100 rounded-xl font-sans text-sm placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-text-white/25 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500 hover:text-white uppercase"
                >
                  [clear]
                </button>
              )}
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-mono mr-2 uppercase">
                <SlidersHorizontal className="w-3.5 h-3.5 text-text-gray" />
                <span>Categoría:</span>
              </div>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider border transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-text-white text-bg-deep border-text-white font-bold'
                      : 'bg-transparent text-slate-400 border-border-active hover:text-slate-200 hover:border-slate-600'
                  }`}
                >
                  {cat !== 'ALL' && getCategoryIcon(cat)}
                  <span>{cat === 'ALL' ? 'All Items' : cat}</span>
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Grid of Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="border border-border-active/15 bg-card-dark/40 p-16 rounded-2xl text-center flex flex-col items-center justify-center">
            <Cpu className="w-12 h-12 text-slate-600 mb-4 animate-pulse" />
            <h3 className="text-xl font-mono uppercase tracking-wider font-bold mb-2">
              No hay coincidentes
            </h3>
            <p className="text-sm text-slate-400 max-w-md">
              No pudimos encontrar ningún hardware o servicio que coincida con su consulta "{searchQuery}". Intente borrar los filtros o buscar otra cosa.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('ALL')
              }}
              className="mt-6 font-mono text-xs uppercase bg-text-white hover:bg-slate-200 text-bg-deep px-5 py-2.5 rounded-lg font-bold transition-all cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              // Parse specifications if possible
              let specsObj: Record<string, string> = {}
              try {
                specsObj = JSON.parse(product.specs)
              } catch (e) {}

              const mainSpecKey = Object.keys(specsObj)[0]
              const mainSpecValue = specsObj[mainSpecKey]
              const secSpecKey = Object.keys(specsObj)[1]
              const secSpecValue = specsObj[secSpecKey]

              return (
                <div
                  key={product.id}
                  className="tech-card rounded-2xl overflow-hidden flex flex-col justify-between group"
                >
                  {/* Category overlay */}
                  <div className="absolute top-4 left-4 z-10 font-mono text-[9px] uppercase tracking-widest bg-black/80 border border-border-active/50 text-slate-300 px-2.5 py-1 rounded-md backdrop-blur-md flex items-center gap-1.5">
                    {getCategoryIcon(product.category)}
                    <span>{product.category}</span>
                  </div>

                  {/* Stock level indicators */}
                  <div className="absolute top-4 right-4 z-10 font-mono text-[9px] uppercase tracking-widest bg-black/80 border border-border-active/30 text-slate-400 px-2.5 py-1 rounded-md backdrop-blur-md">
                    {product.category === 'Services' ? (
                      <span className="text-slate-300 font-bold">Servicio disponible</span>
                    ) : (
                      <span>Stock: <span className={product.stock <= 5 ? 'text-rose-450 font-bold' : 'text-slate-300 font-bold'}>{product.stock} unidades</span></span>
                    )}
                  </div>

                  {/* Link to Details wrapper for Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/40 border-b border-border-active/10">
                    <Link
                      to="/products/$productId"
                      params={{
                        productId: product.id.toString(),
                      }}
                      className="block w-full h-full"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      {/* Dark overlay that fades on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-transparent to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />
                    </Link>
                  </div>

                  {/* Card Body Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <Link
                        to="/products/$productId"
                        params={{
                          productId: product.id.toString(),
                        }}
                        className="block focus:outline-none"
                      >
                        <h3 className="text-lg font-mono font-bold uppercase text-white group-hover:text-slate-300 transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <p className="text-xs text-slate-450 mt-2 line-clamp-2 leading-relaxed h-8">
                        {product.shortDescription}
                      </p>
                    </div>

                    {/* Specifications preview display */}
                    {mainSpecValue && (
                      <div className="p-3 bg-bg-deep border border-border-active/20 rounded-xl font-mono text-[10px] space-y-1 text-slate-500">
                        <div className="flex justify-between">
                          <span className="uppercase text-[9px]">{mainSpecKey}:</span>
                          <span className="text-slate-300 font-medium truncate max-w-[150px]">{mainSpecValue}</span>
                        </div>
                        {secSpecValue && (
                          <div className="flex justify-between border-t border-border-active/10 pt-1 mt-1">
                            <span className="uppercase text-[9px]">{secSpecKey}:</span>
                            <span className="text-slate-300 font-medium truncate max-w-[150px]">{secSpecValue}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Pricing and purchase buttons */}
                    <div className="flex items-center justify-between pt-2 border-t border-border-active/10 mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">
                          {product.category === 'Services' ? 'SERVICE FEE' : 'UNIT PRICE'}
                        </span>
                        <span className="text-xl font-mono font-extrabold text-white">
                          ${product.price.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          to="/products/$productId"
                          params={{
                            productId: product.id.toString(),
                          }}
                          className="p-2.5 rounded-lg border border-border-active/40 text-slate-400 hover:text-white hover:border-slate-400 transition-all"
                          title="View details"
                        >
                          <Info className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => addToCart({
                            id: product.id,
                            name: product.name,
                            image: product.image,
                            price: product.price,
                          })}
                          className="px-4 py-2.5 bg-white hover:bg-slate-200 text-bg-deep font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Services Information Section */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="border border-border-active/15 bg-card-dark/40 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-32 h-[1px] bg-border-active/40" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-text-gray mb-4 bg-[#14171a] border border-border-active/40 px-3 py-1 rounded">
                Nuestros servicios // Atención y soporte
              </div>
              <h2 className="text-2xl sm:text-3xl font-mono uppercase font-bold text-white mb-6">
                SERVICIOS TÉCNICOS PROFESIONALES REALIZADOS CON ESMERO
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans mb-6">
                Easybyte Informática es más que una tienda. Somos su socio informático de confianza. Cada ensamblaje de computadora a medida, limpieza profunda, mantenimiento y activación de sistema es realizado por técnicos certificados que utilizan diagnósticos profesionales para garantizar una fiabilidad total.
              </p>
              
              <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                <div className="p-3 border border-border-active/30 bg-bg-deep rounded-lg">
                  <span className="block text-white font-bold text-xs mb-1">Diagnosis</span>
                  Testing completo de componentes
                </div>
                <div className="p-3 border border-border-active/30 bg-bg-deep rounded-lg">
                  <span className="block text-white font-bold text-xs mb-1">Entrega rápida</span>
                  La mayoría de los servicios se realizan en 24-48 horas
                </div>
              </div>
            </div>

            <div className="relative aspect-video lg:aspect-square overflow-hidden rounded-2xl border border-border-active/20 bg-black/40">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
                alt="Tech Workbench"
                className="w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 tech-grid-dots opacity-40" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-center text-xs uppercase tracking-wider">
          <div className="border border-border-active/20 bg-card-dark/60 rounded-2xl p-6 relative">
            <span className="block text-slate-300 font-extrabold text-lg mb-2">01 // HARDWARE</span>
            <span className="block text-white text-xs font-bold mb-1">DE CALIDAD SELECCIONADOS</span>
            <p className="text-[10px] text-slate-450 normal-case tracking-normal">Todos los módulos de hardware se seleccionan con durabilidad en mente.</p>
          </div>
          <div className="border border-border-active/20 bg-card-dark/60 rounded-2xl p-6 relative">
            <span className="block text-slate-300 font-extrabold text-lg mb-2">02 // ATENCIÓN CERTIFICADA</span>
            <span className="block text-white text-xs font-bold mb-1">Y ASESORAMIENTO PERSONALIZADO</span>
            <p className="text-[10px] text-slate-450 normal-case tracking-normal">Obtén asesoramiento experto sobre hardware a medida para que nunca gastes de más en lo que no necesitas.</p>
          </div>
          <div className="border border-border-active/20 bg-card-dark/60 rounded-2xl p-6 relative">
            <span className="block text-slate-300 font-extrabold text-lg mb-2">03 // PROTECCIÓN</span>
            <span className="block text-white text-xs font-bold mb-1">DE GARANTÍA</span>
            <p className="text-[10px] text-slate-450 normal-case tracking-normal">Cada servicio de montaje y venta de hardware viene respaldado por una cobertura de garantía estándar propio del producto.</p>
          </div>
        </div>
      </section>

    </div>
  )
}
