import { createServerFn } from '@tanstack/react-start'
import { db } from '../../db/index.js'
import { products } from '../../db/schema.js'
import { eq } from 'drizzle-orm'

// Define the Product interface matching our database schema
export interface DbProduct {
  id: number
  name: string
  slug: string
  image: string
  images: string // JSON string array of gallery images
  description: string
  shortDescription: string
  price: number // USD
  category: string
  variants: string // JSON string representing variants
  specs: string // JSON string representing specs
  stock: number
}

const SEED_PRODUCTS = [
  {
    name: 'Professional Computer Assembly & Installation',
    slug: 'pc-assembly-service',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80'
    ]),
    description: 'Get your computer assembled or hardware configured with absolute care and precision. Our professional setup service handles physical parts mounting, cable routing, BIOS flashing, and memory profile tuning. Every computer undergoes a continuous 24-hour hardware stability stress test to ensure reliable daily operations and peak performance. Ideal for gaming rigs, home computers, and business workstations.',
    shortDescription: 'Expert physical assembly, cable routing, and stability configuration with stress testing.',
    price: 85,
    category: 'Services',
    variants: JSON.stringify([
      {
        name: 'System Complexity',
        options: ['Standard Office/Home Desktop', 'High-End Gaming Rig (+$30)', 'Advanced Workstation (+$75)'],
      },
      {
        name: 'Operating System Install',
        options: ['Hardware Setup Only', 'With Windows Installation & Configuration (+$25)'],
      }
    ]),
    specs: JSON.stringify({
      'Service Duration': '24 to 48 Hours',
      'Warranty Period': '1 Year on Assembly Craftsmanship',
      'Testing Included': '24-Hour Prime95 & Furmark Stress Test',
      'Expert Level': 'Certified Technicians only',
    }),
    stock: 99,
  },
  {
    name: 'Deep Cleaning & Thermal Maintenance Service',
    slug: 'deep-cleaning-thermal-service',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    ]),
    description: 'Restore your PC or laptop to its original quiet, cool, and fast operating state. Over time, internal dust accumulation and dried thermal paste cause high temperatures, loud fans, and thermal throttling. Our service includes complete dust extraction from radiators and fans, electrostatic-safe cleaning, and premium thermal paste replacement (Arctic MX-6) for your processor and graphics card.',
    shortDescription: 'Complete internal dust cleaning and premium CPU/GPU thermal paste replacement for cooler, silent operations.',
    price: 45,
    category: 'Services',
    variants: JSON.stringify([
      {
        name: 'Device Type',
        options: ['Standard Desktop Computer', 'Standard Portable Laptop', 'High-End Gaming Laptop (+$15)'],
      },
      {
        name: 'Thermal Compound',
        options: ['Premium Grade (Arctic MX-6)', 'Extreme High-Performance (+$10)'],
      }
    ]),
    specs: JSON.stringify({
      'Turnaround Time': 'Same Day / 24 Hours Max',
      'Thermal Paste Used': 'Arctic MX-6 / Noctua NT-H2',
      'Cleaning Standard': 'ESD-Safe Air Compression & Isopropyl 99%',
      'Applicable Devices': 'Desktops, Laptops, Consoles',
    }),
    stock: 99,
  },
  {
    name: 'Tech Support & Hardware Diagnostics',
    slug: 'tech-support-troubleshooting',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80'
    ]),
    description: 'Professional diagnosis and software support for crashes, blue screens, virus infections, network problems, or system slowdowns. Our expert support specialists offer both on-site diagnostics and secure remote assistance to solve conflicts and optimize your operating system settings. We specialize in system tuning, malware removal, and storage data recovery.',
    shortDescription: 'Comprehensive system diagnostics and software troubleshooting to resolve crashes, errors, and performance lags.',
    price: 35,
    category: 'Services',
    variants: JSON.stringify([
      {
        name: 'Service Location',
        options: ['1-Hour Remote Support Session', 'In-Store Full Diagnostics & Repair (+$20)'],
      }
    ]),
    specs: JSON.stringify({
      'Session Duration': '1 Hour (Extendable)',
      'Response Time': 'Within 2 Hours',
      'Format': 'Secure Remote (AnyDesk / TeamViewer)',
      'Guaranteed Solution': 'No Fix, No Fee Policy',
    }),
    stock: 99,
  },
  {
    name: 'Software Suite & Operating System Activation',
    slug: 'software-os-activation',
    image: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80'
    ]),
    description: 'Ensure your work computer is secure, legal, and fully activated. We specialize in official product activation, licensing, and security configuration for Windows operating systems and Microsoft Office suites. Avoid security vulnerabilities associated with unactivated software or unauthorized loaders, and keep your files secure.',
    shortDescription: 'Official operating system and productivity suite activation, licensing, and update setup.',
    price: 29,
    category: 'Services',
    variants: JSON.stringify([
      {
        name: 'Activation Type',
        options: ['Windows 11 Professional Activation', 'Microsoft Office Home & Business Setup (+$35)', 'Full OS & Office Activation Bundle (+$50)'],
      }
    ]),
    specs: JSON.stringify({
      'Service Type': 'Digital & Remote Activation',
      'License Origin': 'Official Authorized Distribution',
      'OS Version': 'Windows 10 / 11 Home & Pro',
      'Delivery Time': 'Within 1 Hour (Digital)',
    }),
    stock: 99,
  },
  {
    name: 'Personalized Electronic Advisory Service',
    slug: 'electronic-advisory-service',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80'
    ]),
    description: 'Confused by the sheer variety of processors, graphics cards, laptop models, and office gadgets? Avoid wasting money on specs you do not need. Partner with our hardware consultant for a custom research session. We evaluate your daily workflow (office, engineering, coding, or gaming) and deliver a balanced purchasing guide with links matching your budget.',
    shortDescription: 'Professional 1-on-1 consultation to choose the ideal computer parts, laptops, or general office electronics.',
    price: 15,
    category: 'Services',
    variants: JSON.stringify([
      {
        name: 'Delivery Format',
        options: ['Detailed PDF Report via Email', '30-Minute Live Video Call & PDF Report (+$15)'],
      }
    ]),
    specs: JSON.stringify({
      'Duration': '30 Minutes Session',
      'Consultant Profile': 'Certified Hardware Specialist',
      'Deliverable': 'Tailored purchase list with options and links',
      'Turnaround': 'Delivered in 24 Hours',
    }),
    stock: 99,
  },
  {
    name: 'AMD Ryzen 7 7800X3D Desktop Processor',
    slug: 'amd-ryzen-7800x3d',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
    ]),
    description: 'The industry-leading desktop processor for both engineering workloads and responsive gaming. Features AMD\'s advanced 3D V-Cache technology, providing massive cache capacity for ultra-smooth application frame rates and multitasking. Highly power-efficient, cool, and fully compatible with modern DDR5 memory and AM5 motherboards.',
    shortDescription: 'High-performance 8-core, 16-thread desktop CPU with 3D V-Cache, perfect for modern workstations.',
    price: 379,
    category: 'Hardware',
    variants: JSON.stringify([
      {
        name: 'Cooler Bundle',
        options: ['Processor Only (Requires Cooler)', 'With High-Performance Tower Air Cooler (+$39)', 'With Dual-Fan AIO Liquid Cooler (+$79)'],
      }
    ]),
    specs: JSON.stringify({
      'Cores / Threads': '8 Cores / 16 Threads',
      'Base / Boost Clock': '4.2 GHz / 5.0 GHz',
      'Total Cache': '104MB (L2 + L3 3D V-Cache)',
      'Socket Type': 'AM5 (600-Series Motherboards)',
      'Power TDP': '120W',
    }),
    stock: 12,
  },
  {
    name: 'NVIDIA GeForce RTX 4070 Super Graphics Card',
    slug: 'nvidia-rtx-4070-super',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&w=800&q=80'
    ]),
    description: 'Supercharge your daily 3D rendering, video editing, and graphic design pipelines. Built on NVIDIA\'s efficient Ada Lovelace architecture, this card offers incredible performance-per-watt, silent operation under load, and cutting-edge DLSS 3 hardware acceleration. Features a sleek dual-slot metal design.',
    shortDescription: 'Ultra-efficient 12GB GDDR6X graphics card for hardware acceleration, 3D design, and media editing.',
    price: 599,
    category: 'Hardware',
    variants: JSON.stringify([
      {
        name: 'Graphics Card Model',
        options: ['ASUS Dual Fan Edition', 'MSI Ventus 3X Triple Fan (+$30)', 'GIGABYTE Gaming OC Edition (+$45)'],
      }
    ]),
    specs: JSON.stringify({
      'Video Memory': '12GB GDDR6X',
      'Memory Bus Width': '192-bit',
      'Output Ports': '3x DisplayPort 1.4a, 1x HDMI 2.1a',
      'Recommended Power Supply': '650W or higher',
      'Form Factor': '267 mm (Dual Slot)',
    }),
    stock: 8,
  },
  {
    name: 'ProWrite 65% Silent Mechanical Keyboard',
    slug: 'prowrite-silent-keyboard',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80'
    ]),
    description: 'Designed specifically for professional office spaces where quiet operations and comfort are essential. This compact mechanical keyboard features factory-lubricated silent switches that offer a soft, cushioned feel with virtually zero typing noise. Encased in a solid CNC-milled aluminum top plate and equipped with dual-mode wireless connectivity.',
    shortDescription: 'Ultra-quiet, ergonomic 65% compact wireless mechanical keyboard with long battery life.',
    price: 119,
    category: 'Hardware',
    variants: JSON.stringify([
      {
        name: 'Case Color',
        options: ['Charcoal Gray', 'Chalk White', 'Anodized Silver (+$20)'],
      },
      {
        name: 'Switch Type',
        options: ['Silent Linear (Quiet & Smooth)', 'Silent Tactile (Quiet with Gentle Bump)'],
      }
    ]),
    specs: JSON.stringify({
      'Form Factor': '65% Compact Layout',
      'Connectivity': 'Bluetooth 5.1 / 2.4 GHz Wireless / USB-C',
      'Battery Life': 'Up to 250 Hours (Backlight Off)',
      'Keycaps': 'Double-shot PBT (Never fades)',
      'Weight': '820 grams',
    }),
    stock: 15,
  },
  {
    name: 'Horizon Pro 27" 4K IPS Office Monitor',
    slug: 'horizon-pro-27-monitor',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551645121-d1034da75057?auto=format&fit=crop&w=800&q=80'
    ]),
    description: 'Unlock stunning details and vivid, professional colors for coding, spreadsheets, or graphic design. This 27-inch 4K monitor features an advanced IPS panel with 100% sRGB color accuracy. Includes a full ergonomic stand that tilts, swivels, pivots, and adjusts in height to protect your neck and shoulders during long working hours.',
    shortDescription: 'Sleek 27-inch 4K UHD monitor with professional-grade color accuracy, ultra-slim bezels, and eye protection.',
    price: 329,
    category: 'Hardware',
    variants: JSON.stringify([
      {
        name: 'Mounting Style',
        options: ['Standard Ergonomic Desk Stand', 'With Gas-Spring Desktop Monitor Arm (+$45)'],
      }
    ]),
    specs: JSON.stringify({
      'Resolution': '3840 x 2160 (4K UHD) at 60Hz',
      'Panel Type': 'IPS (In-Plane Switching)',
      'Color Gamut': '100% sRGB / 95% DCI-P3 (dE < 2)',
      'Video Inputs': '1x DisplayPort 1.4, 2x HDMI 2.0, 1x USB-C with 65W Power Delivery',
      'Eye Care': 'TÜV Rheinland Certified Flicker-Free & Low Blue Light',
    }),
    stock: 7,
  },
  {
    name: 'ApexSpeed 2TB NVMe PCIe 4.0 M.2 SSD',
    slug: 'apexspeed-2tb-nvme-ssd',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80'
    ]),
    description: 'Annihilate transfer delays and slow load times. The ApexSpeed NVMe SSD delivers blistering performance with sequential read speeds up to 7400 MB/s. Perfect for laptop storage upgrades or high-speed system drives in professional desktops. Equipped with an ultra-thin graphene thermal pad for heat dissipation, making it fully compatible with slim laptop slots and PS5 consoles.',
    shortDescription: 'Blistering-fast 2TB M.2 PCIe Gen 4x4 SSD for notebooks, laptops, and desktop computers.',
    price: 139,
    category: 'Hardware',
    variants: JSON.stringify([
      {
        name: 'Heatsink Style',
        options: ['Slim Graphene Pad (Universal/Laptop)', 'Alloy Fins Desktop Heatsink (+$15)'],
      }
    ]),
    specs: JSON.stringify({
      'Storage Capacity': '2 TB (2,000 GB)',
      'Read / Write Speeds': 'Up to 7,400 MB/s / 6,500 MB/s',
      'Form Factor': 'M.2 2280 NVMe PCIe Gen 4 x4',
      'Endurance (TBW)': '1,200 Terabytes Written',
      'Compatibility': 'Laptops, Desktops, PlayStation 5',
    }),
    stock: 24,
  }
]

// Server function to get products (and seed if empty or outdated)
export const getProducts = createServerFn({
  method: 'GET',
}).handler(async () => {
  try {
    // 1. Fetch current products
    const list = await db.select().from(products)

    // Check if we need to purge old cyberpunk seeding
    const hasOldProducts = list.some(p => 
      p.category === 'Custom Rigs' || 
      p.category === 'Laptops' || 
      p.category === 'Peripherals' || 
      p.category === 'Displays' ||
      p.name.includes('Nexus Vanguard')
    )

    if (hasOldProducts) {
      console.log('Detected legacy cyberpunk products. Purging and re-seeding with professional services and hardware...')
      await db.delete(products)
      await db.insert(products).values(SEED_PRODUCTS)
      return await db.select().from(products)
    }

    // 2. If list is empty, seed it!
    if (list.length === 0) {
      console.log('No products found in DB. Seeding initial Easybyte Informática products...')
      await db.insert(products).values(SEED_PRODUCTS)
      return await db.select().from(products)
    }

    return list
  } catch (error) {
    console.error('Error in getProducts server function:', error)
    // Fallback so the app doesn't crash if database is temporarily unavailable during builds
    return SEED_PRODUCTS.map((p, i) => ({ id: i + 1, ...p })) as any[]
  }
})

// Server function to get a single product by ID
export const getProductById = createServerFn({
  method: 'GET',
})
  .inputValidator((id: number) => id)
  .handler(async ({ data: id }) => {
    try {
      const [product] = await db.select().from(products).where(eq(products.id, id))
      if (!product) {
        throw new Error('Product not found in database')
      }
      return product
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error)
      const fallback = SEED_PRODUCTS[id - 1] || SEED_PRODUCTS[0]
      return { id, ...fallback } as any
    }
  })
