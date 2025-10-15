'use client'

import React from 'react'

import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

const categories: { title: string; href: string; description: string }[] = [
  {
    title: 'Hombre',
    href: '/category/men',
    description: 'Ropa, zapatos y accesorios para hombre.',
  },
  {
    title: 'Mujer',
    href: '/category/women',
    description: 'Moda elegante y cómoda para mujer.',
  },
  {
    title: 'Niños',
    href: '/category/kids',
    description: 'Ropa divertida y funcional para niños de todas las edades.',
  },
  {
    title: 'Hogar y Vida',
    href: '/category/home',
    description: 'Decoración, artículos de cocina y productos para el hogar.',
  },
  {
    title: 'Belleza',
    href: '/category/beauty',
    description: 'Cuidado de la piel, cosméticos y esenciales de cuidado personal.',
  },
  {
    title: 'Electrónica',
    href: '/category/electronics',
    description: 'Gadgets, accesorios y dispositivos inteligentes.',
  },
]

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="mb-1 text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export function Navigation() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Tienda</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full flex-col justify-end rounded-md bg-[url('https://bundui-images.netlify.app/products/01.jpeg')] bg-cover p-0! no-underline outline-hidden select-none focus:shadow-md"
                    href="/"
                  >
                    <div className="bg-foreground/30 space-y-2 p-4 text-primary-foreground backdrop-blur-md">
                      <div className="font-medium">Nuevos productos</div>
                      <p className="text-sm leading-tight">
                        Descubre los estilos de nuestra última colección.
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="#" title="Colección de verano">
                Esenciales ligeros perfectos para la temporada cálida.
              </ListItem>
              <ListItem href="#" title="Accesorios">
                Completa tu look con nuestros bolsos elegantes, joyería y más.
              </ListItem>
              <ListItem href="#" title="Ofertas">
                Compra artículos con descuento antes de que se agoten.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Categorías</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:grid-cols-2 lg:w-[550px]">
              {categories.map((category) => (
                <ListItem key={category.title} title={category.title} href={category.href}>
                  {category.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Enlaces rápidos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <span className="font-medium">Todos los productos</span>
                    <span className="text-muted-foreground">
                      Navega nuestro catálogo completo de productos.
                    </span>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <span className="font-medium">Preguntas frecuentes</span>
                    <span className="text-muted-foreground">Respuestas a preguntas comunes.</span>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <span className="font-medium">Blog</span>
                    <span className="text-muted-foreground">
                      Inspírate con nuestras últimas publicaciones.
                    </span>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
