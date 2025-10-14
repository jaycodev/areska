'use client'

import { useState } from 'react'

import { Menu, Search, ShoppingCart, User, X } from 'lucide-react'
import Link from 'next/link'

import { Logo } from '@/components/shared/logo'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useAuthStore } from '@/stores/auth-store'

import { CartCount } from './cart-count'
import { Navigation } from './navigation'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuthStore()

  return (
    <nav className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Logo width={32} height={32} />
            <span className="font-medium">Areska</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            <Navigation />
          </div>

          {/* Search Bar */}
          <InputGroup className="mx-8 hidden max-w-xs flex-1 items-center md:flex">
            <InputGroupInput placeholder="Buscar productos..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          {/* Right Side */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />

            {/* Cart */}
            <Button variant="outline" size="icon" className="relative" asChild>
              <Link href="/carrito">
                <ShoppingCart />
                <CartCount />
              </Link>
            </Button>

            {/* User Menu */}
            {user ? (
              <div className="group relative">
                <Button variant="outline" size="icon">
                  <User />
                </Button>
                <div className="invisible absolute right-0 mt-2 w-48 rounded-md border bg-popover py-1 opacity-0 shadow-md transition-all group-hover:visible group-hover:opacity-100">
                  <Link
                    href="/perfil"
                    className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    Perfil
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/iniciar-sesion">
                <Button>Iniciar Sesión</Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              className="md:hidden"
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t bg-background py-4 md:hidden">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/productos" className="hover:text-primary transition-colors">
                Shop
              </Link>
              <Link href="/about" className="hover:text-primary transition-colors">
                About
              </Link>
              <div className="border-t pt-4">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-full rounded-lg border border-input bg-card px-4 py-2 placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
