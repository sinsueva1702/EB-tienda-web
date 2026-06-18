import { Link, HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { CartProvider, useCart } from '@/context/CartContext'
import { CartDrawer } from '@/components/CartDrawer'
import { ShoppingBag, Laptop, ShieldCheck, RefreshCw, PhoneCall } from 'lucide-react'
import * as React from 'react'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Easybyte Informática | Technical Services & Premium Hardware',
      },
    ],
    links: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="tech-grid min-h-screen bg-bg-deep text-slate-100">
        <CartProvider>
          <AppLayout>{children}</AppLayout>
        </CartProvider>
        <Scripts />
      </body>
    </html>
  )
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const { setIsCartOpen, cartCount } = useCart()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Friendly Professional Top Banner */}
      <div className="bg-[#1a1d21] border-b border-[#323842] text-slate-300 py-1.5 px-4 text-center text-xs font-mono tracking-wider uppercase flex items-center justify-center gap-2 overflow-hidden">
        <span className="inline-block w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
        <span>Professional Tech Support & Premium Computer Hardware Sales</span>
        <span className="hidden md:inline-block border-l border-slate-700 pl-2 ml-2">Fast turnaround & friendly guidance</span>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-bg-deep/80 backdrop-blur-md border-b border-border-active/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative">
          
          {/* Header left brand */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="p-1 rounded-xl bg-card-dark border border-border-active/40 group-hover:border-border-active group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
              <img
                src="/easybyte-logo.png"
                alt="Easybyte Logo"
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xl font-extrabold tracking-widest text-text-white leading-none uppercase">
                Easy<span className="text-text-gray">byte</span>
              </span>
              <span className="font-mono text-[9px] text-text-gray/80 tracking-widest uppercase mt-0.5">
                Informática & Servicios
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider uppercase">
            <Link
              to="/"
              className="text-text-gray hover:text-text-white transition-colors py-2 relative group"
            >
              <span>Our Catalog</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-text-white group-hover:w-full transition-all duration-300" />
            </Link>
            <a
              href="#services"
              className="text-text-gray hover:text-text-white transition-colors py-2 relative group"
            >
              <span>Our Services</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-text-white group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#why-choose-us"
              className="text-text-gray hover:text-text-white transition-colors py-2 relative group"
            >
              <span>Why Choose Us</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-text-white group-hover:w-full transition-all duration-300" />
            </a>
          </nav>

          {/* Header Right Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl border border-border-active/30 bg-[#1a1d21]/60 hover:bg-[#323842]/40 hover:border-border-active text-slate-200 hover:text-text-white transition-all duration-300 flex items-center gap-2 font-mono text-xs uppercase"
            >
              <ShoppingBag className="w-5 h-5 shrink-0 text-text-gray" />
              <span className="hidden sm:inline font-semibold">Your Cart</span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-text-white text-bg-deep min-w-[18px] text-center font-mono">
                {cartCount}
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Page Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#0b0c0e] border-t border-border-active/25 mt-20 font-mono text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <Laptop className="w-5 h-5 text-text-gray" />
                <span className="font-bold tracking-widest text-text-white uppercase text-lg">EASYBYTE</span>
              </div>
              <p className="text-xs text-text-gray max-w-sm leading-relaxed">
                Premium computer hardware parts and professional IT support services. We build, deep-clean, diagnose, and activate systems with professional care and friendly advice to ensure peak performance for your home or business.
              </p>
              <div className="flex items-center gap-2 text-[10px] text-text-gray bg-[#1a1d21] border border-border-active/40 px-3 py-1.5 rounded w-fit">
                <ShieldCheck className="w-4 h-4 shrink-0 text-slate-400" />
                <span>Verified Secure Checkout & Friendly Support</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-text-white uppercase tracking-widest mb-4 border-l-2 border-slate-400 pl-2">
                Quick Links
              </h4>
              <ul className="space-y-2 text-[11px] text-text-gray uppercase tracking-wider">
                <li><Link to="/" className="hover:text-text-white transition-colors">Products & Services</Link></li>
                <li><a href="#services" className="hover:text-text-white transition-colors">Our Services</a></li>
                <li><a href="#why-choose-us" className="hover:text-text-white transition-colors">Why Choose Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-text-white uppercase tracking-widest mb-4 border-l-2 border-slate-400 pl-2">
                Working Hours
              </h4>
              <ul className="space-y-2 text-[11px] text-text-gray">
                <li className="flex justify-between">
                  <span>MON - FRI:</span>
                  <span className="text-text-white">08:00 - 18:00 Local</span>
                </li>
                <li className="flex justify-between">
                  <span>SATURDAY:</span>
                  <span className="text-text-white">09:00 - 13:00 Local</span>
                </li>
                <li className="flex justify-between">
                  <span>ONLINE SUPPORT:</span>
                  <span className="text-text-white font-bold">24/7 AVAILABLE</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Technical Credits */}
          <div className="border-t border-border-active/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-text-gray">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-slate-500" />
              <span>EASYBYTE INFORMÁTICA © 2026. ALL RIGHTS RESERVED.</span>
            </div>
            <div className="flex items-center gap-4">
              <span>SECURED & HOSTED BY NETLIFY</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer sliding panel */}
      <CartDrawer />
    </div>
  )
}
