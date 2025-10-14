'use client'

import { useState } from 'react'

import { Menu, Search, ShoppingCart, User, X } from 'lucide-react'
import Link from 'next/link'

import { CartCount } from '@/components/layout/cart-count'
import { Navigation } from '@/components/layout/navigation'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useAuthStore } from '@/stores/auth-store'

import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuthStore()

  return (
    <nav className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            <Navigation />
          </div>

          {/* Search Bar */}
          <InputGroup className="mx-8 hidden max-w-xs flex-1 items-center md:flex">
            <InputGroupInput placeholder="Search products..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingCart className="size-6 text-foreground hover:text-primary transition-colors" />
              <CartCount />
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="group relative">
                <Button variant="ghost" size="sm">
                  <User className="size-5" />
                </Button>
                <div className="invisible absolute right-0 mt-2 w-48 rounded-md border bg-popover py-1 opacity-0 shadow-md transition-all group-hover:visible group-hover:opacity-100">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full px-4 py-2 text-left text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/auth/signin">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? (
                <X className="size-6 text-foreground" />
              ) : (
                <Menu className="size-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t bg-background py-4 md:hidden">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link
                href="/products"
                className="text-foreground hover:text-primary transition-colors"
              >
                Shop
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
              <div className="border-t pt-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full rounded-lg border border-input bg-card px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-transparent focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
