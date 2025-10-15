import { type Product, ProductSchema } from './schemas'

// Sample products data - types are automatically inferred
export const sampleProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
    category: 'audio',
    badge: 'Best Seller',
    description:
      'Experience exceptional sound quality with our premium wireless headphones. Featuring advanced noise cancellation, 30-hour battery life, and premium materials for ultimate comfort.',
    images: [
      '/images/placeholder.svg?height=600&width=600',
      '/images/placeholder.svg?height=600&width=600',
      '/images/placeholder.svg?height=600&width=600',
      '/images/placeholder.svg?height=600&width=600',
    ],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'White', value: '#FFFFFF' },
      { name: 'Silver', value: '#C0C0C0' },
      { name: 'Rose Gold', value: '#E8B4B8' },
    ],
    sizes: ['One Size'],
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Premium leather ear cups',
      'Wireless charging case',
      'Hi-Res Audio certified',
    ],
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    image: 'https://images.pexels.com/photos/22434765/pexels-photo-22434765.jpeg',
    category: 'wearables',
    badge: 'New',
  },
  {
    id: '3',
    name: 'Minimalist Backpack',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://burst.shopifycdn.com/photos/bright-purple-t-shirt.jpg',
    category: 'accessories',
  },
  {
    id: '4',
    name: 'Wireless Charging Pad',
    price: 49.99,
    image:
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'accessories',
  },
  {
    id: '5',
    name: 'Bluetooth Speaker',
    price: 129.99,
    image:
      'https://images.unsplash.com/photo-1623998021446-45cd9b269056?q=80&w=1179&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'audio',
    badge: 'Popular',
  },
  {
    id: '6',
    name: 'USB-C Hub',
    price: 79.99,
    originalPrice: 99.99,
    image:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'accessories',
  },
  {
    id: '7',
    name: 'USB-C Hub',
    price: 79.99,
    originalPrice: 99.99,
    image:
      'https://plus.unsplash.com/premium_photo-1676914336000-f8b2f9edd56a?q=80&w=784&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'accessories',
  },
  {
    id: '8',
    name: 'USB-C Hub',
    price: 79.99,
    originalPrice: 99.99,
    image:
      'https://plus.unsplash.com/premium_photo-1680859126131-d91874d9f5e8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'accessories',
  },
  {
    id: '9',
    name: 'USB-C Hub',
    price: 79.99,
    originalPrice: 99.99,
    image:
      'https://plus.unsplash.com/premium_photo-1681711647066-ef84575c0d95?q=80&w=700&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'accessories',
  },
] as const

export const products: Product[] = sampleProducts.map((product) => ProductSchema.parse(product))

// Categories data with inferred types
export const categories = [
  {
    name: 'Audio',
    href: '/productos?categoria=audio',
    count: '120+ products',
  },
  {
    name: 'Wearables',
    href: '/productos?categoria=wearables',
    count: '85+ products',
  },
  {
    name: 'Accessories',
    href: '/productos?categoria=accessories',
    count: '200+ products',
  },
  {
    name: 'Mobile',
    href: '/productos?categoria=mobile',
    count: '95+ products',
  },
  {
    name: 'Photography',
    href: '/productos?categoria=photography',
    count: '60+ products',
  },
  {
    name: 'Gaming',
    href: '/productos?categoria=gaming',
    count: '150+ products',
  },
] as const

// Export inferred types
export type Category = (typeof categories)[number]
