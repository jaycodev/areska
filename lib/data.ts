import { type Category, CategorySchema, type Product, ProductSchema } from './schemas'

export const sampleProducts = [
  {
    id: '1',
    name: 'Teclado Mecánico RGB Gaming',
    price: 149.99,
    originalPrice: 199.99,
    image: '/images/products/keyboards/teclado-mecanico-rgb-1.png',
    category: 'perifericos',
    badge: 'Más Vendido',
    description:
      'Teclado mecánico gaming con switches azules, iluminación RGB personalizable y reposamuñecas magnético. Diseñado para gamers profesionales con teclas anti-ghosting y construcción de aluminio premium.',
    images: [
      '/images/products/keyboards/teclado-mecanico-rgb-1.png',
      '/images/products/keyboards/teclado-mecanico-rgb-2.png',
      '/images/products/keyboards/teclado-mecanico-rgb-3.png',
      '/images/products/keyboards/teclado-mecanico-rgb-4.webp',
    ],
    colors: [
      { name: 'Negro', value: '#000000' },
      { name: 'Blanco', value: '#FFFFFF' },
      { name: 'RGB', value: '#FF00FF' },
    ],
    sizes: ['Tamaño Completo', 'TKL', '60%'],
    features: [
      'Switches mecánicos Cherry MX',
      'Iluminación RGB por tecla',
      'Anti-ghosting completo',
      'Cable trenzado desmontable',
      'Reposamuñecas magnético',
    ],
  },
  {
    id: '2',
    name: 'Mouse Gaming Inalámbrico Pro',
    price: 89.99,
    originalPrice: 119.99,
    image: '/images/products/mice/mouse-gaming-pro-1.png',
    category: 'perifericos',
    badge: 'Nuevo',
    description:
      'Mouse gaming inalámbrico de alta precisión con sensor óptico de 25,600 DPI, batería de 70 horas y peso ajustable.',
    images: [
      '/images/products/mice/mouse-gaming-pro-1.png',
      '/images/products/mice/mouse-gaming-pro-2.png',
      '/images/products/mice/mouse-gaming-pro-3.webp',
    ],
    colors: [
      { name: 'Negro', value: '#000000' },
      { name: 'Blanco', value: '#FFFFFF' },
    ],
    features: [
      'Sensor óptico 25,600 DPI',
      'Batería 70 horas',
      'Conexión inalámbrica 2.4GHz',
      '8 botones programables',
      'Peso ajustable',
    ],
  },

  {
    id: '3',
    name: 'Auriculares Gaming 7.1 Surround',
    price: 179.99,
    image: '/images/products/headsets/auriculares-71.png',
    category: 'audio',
    badge: 'Popular',
    description:
      'Auriculares gaming con sonido envolvente 7.1, micrófono retráctil con cancelación de ruido y almohadillas de gel refrigerante.',
    features: [
      'Sonido envolvente 7.1',
      'Micrófono con cancelación de ruido',
      'Almohadillas de gel refrigerante',
      'RGB personalizable',
      'Compatible multi-plataforma',
    ],
  },
  {
    id: '4',
    name: 'Monitor Gaming 27" 165Hz',
    price: 329.99,
    originalPrice: 399.99,
    image: '/images/products/monitors/monitor-27-165hz.png',
    category: 'monitores',
    badge: 'Oferta',
    description:
      'Monitor gaming QHD 27 pulgadas con panel IPS, 165Hz, 1ms de respuesta y soporte para G-Sync/FreeSync.',
    features: [
      'Resolución 2560x1440 (QHD)',
      'Tasa de refresco 165Hz',
      'Tiempo de respuesta 1ms',
      'Panel IPS con HDR400',
      'Compatible G-Sync y FreeSync',
    ],
  },
  {
    id: '5',
    name: 'Silla Gaming Ergonómica Pro',
    price: 299.99,
    image: '/images/products/chairs/silla-gaming-pro.png',
    category: 'muebles',
    badge: 'Premium',
    description:
      'Silla gaming ergonómica con soporte lumbar ajustable, reposabrazos 4D y reclinación hasta 180 grados.',
    features: [
      'Soporte lumbar ajustable',
      'Reposabrazos 4D',
      'Reclinación hasta 180°',
      'Cojín de espuma de memoria',
      'Base de acero resistente',
    ],
  },
  {
    id: '6',
    name: 'Mousepad XXL Gaming',
    price: 29.99,
    originalPrice: 39.99,
    image: '/images/products/mousepads/mousepad-xxl.png',
    category: 'accesorios',
    description:
      'Mousepad de tamaño extendido con superficie optimizada para gaming, base antideslizante y bordes cosidos.',
    features: [
      'Tamaño XXL: 90x40cm',
      'Base de goma antideslizante',
      'Superficie de control suave',
      'Bordes cosidos resistentes',
      'Fácil de limpiar',
    ],
  },
  {
    id: '7',
    name: 'Webcam 4K Streaming',
    price: 119.99,
    image: '/images/products/webcams/webcam-4k-streaming.png',
    category: 'streaming',
    badge: 'Nuevo',
    description:
      'Webcam 4K con enfoque automático, corrección de luz y micrófono estéreo integrado, ideal para streaming profesional.',
    features: [
      'Resolución 4K a 30fps',
      'Enfoque automático',
      'Corrección automática de luz',
      'Micrófono estéreo dual',
      'Compatible con OBS/Streamlabs',
    ],
  },
  {
    id: '8',
    name: 'Micrófono Condensador USB',
    price: 89.99,
    originalPrice: 129.99,
    image: '/images/products/microphones/microfono-condensador-usb.png',
    category: 'streaming',
    description:
      'Micrófono condensador profesional con patrón cardioide, monitoreo en tiempo real y filtro anti-pop incluido.',
    features: [
      'Patrón cardioide profesional',
      'Conexión USB plug-and-play',
      'Monitoreo sin latencia',
      'Filtro anti-pop incluido',
      'Brazo articulado ajustable',
    ],
  },
  {
    id: '9',
    name: 'Hub USB-C Gaming 7 en 1',
    price: 69.99,
    image: '/images/products/hubs/hub-usbc-7en1.png',
    category: 'accesorios',
    description:
      'Hub USB-C multifunción con puertos USB 3.0, HDMI 4K, lector SD/microSD y carga rápida PD 100W.',
    features: [
      '3 puertos USB 3.0',
      'Salida HDMI 4K@60Hz',
      'Lector SD/microSD',
      'Puerto Ethernet Gigabit',
      'Carga rápida PD 100W',
    ],
  },
  {
    id: '10',
    name: 'Tira LED RGB Gaming 3m',
    price: 34.99,
    image: '/images/products/leds/tira-led-rgb-3m.png',
    category: 'iluminacion',
    badge: 'Popular',
    description:
      'Tira LED RGB inteligente con control por app, sincronización con música y 16 millones de colores.',
    features: [
      '3 metros de longitud',
      'Control WiFi por app',
      'Sincronización con música',
      '16 millones de colores',
      'Compatible con Alexa/Google',
    ],
  },
  {
    id: '11',
    name: 'Soporte para Monitor Gaming',
    price: 49.99,
    image: '/images/products/stands/soporte-monitor-brazo.png',
    category: 'accesorios',
    description:
      'Brazo articulado para monitor con movimiento completo 360°, soporta hasta 32" y 9kg de peso.',
    features: [
      'Movimiento 360° completo',
      'Soporta monitores hasta 32"',
      'Capacidad de carga 9kg',
      'Gestión de cables integrada',
      'Montaje VESA estándar',
    ],
  },
  {
    id: '12',
    name: 'Controlador Pro Inalámbrico',
    price: 69.99,
    originalPrice: 89.99,
    image: '/images/products/controllers/controlador-pro-inalambrico.png',
    category: 'accesorios',
    badge: 'Oferta',
    description:
      'Controlador inalámbrico premium con gatillos adaptativos, vibración HD y batería de 12 horas.',
    features: [
      'Conexión Bluetooth/USB-C',
      'Batería 12 horas',
      'Gatillos adaptativos',
      'Vibración HD',
      'Compatible PC/consolas',
    ],
  },
] as const

export const products: Product[] = sampleProducts.map((product) => ProductSchema.parse(product))

const sampleCategories = [
  {
    name: 'Periféricos',
    value: 'perifericos',
    count: '150+ productos',
  },
  {
    name: 'Audio',
    value: 'audio',
    count: '85+ productos',
  },
  {
    name: 'Monitores',
    value: 'monitores',
    count: '60+ productos',
  },
  {
    name: 'Streaming',
    value: 'streaming',
    count: '45+ productos',
  },
  {
    name: 'Muebles Gaming',
    value: 'muebles',
    count: '30+ productos',
  },
  {
    name: 'Iluminación',
    value: 'iluminacion',
    count: '40+ productos',
  },
  {
    name: 'Accesorios',
    value: 'accesorios',
    count: '200+ productos',
  },
] as const

export const categories: Category[] = sampleCategories.map((category) =>
  CategorySchema.parse(category)
)
