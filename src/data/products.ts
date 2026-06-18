export interface Product {
  id: number
  name: string
  image: string
  description: string
  shortDescription: string
  price: number
}

const products: Array<Product> = [
  {
    id: 1,
    name: 'Product 1',
    image: '/placeholder.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do...',
    price: 3000,
  },
  {
    id: 1,
    name: 'ZOTAC GeForce® GTX 1050 MINI',
    image: 'https://www.zotac.com/download/files/styles/w1024/public/product_gallery/graphics_cards/zt-p10500a-10l_image2.jpg',
    description:
      'La ZOTAC GeForce® GTX 1050 Mini (modelo ZT-P10500A-10L) es una tarjeta gráfica compacta basada en la arquitectura NVIDIA Pascal™, diseñada para transformar PCs estándar en máquinas de gaming capaces gracias a tecnologías Game Ready. Su formato pequeño la hace ideal para gabinetes reducidos, ofreciendo rendimiento sólido para jugar los últimos títulos en una configuración accesible.',
    shortDescription: 'La ZOTAC GeForce® GTX 1050 Mini (modelo ZT-P10500A-10L) es una tarjeta gráfica compacta...',
    price: 300000,
  },
]

export default products
