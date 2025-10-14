'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from '@/hooks/use-form'
import { type SignInForm, SignInSchema } from '@/lib/schemas'
import { useAuthStore } from '@/stores/auth-store'

export default function SignInPage() {
  const router = useRouter()
  const { login, isLoading } = useAuthStore()
  const { data, errors, isSubmitting, setValue, handleSubmit } = useForm(SignInSchema)

  const onSubmit = async (formData: SignInForm) => {
    await login(formData.email, formData.password)
    router.push('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 ">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-foreground">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or{' '}
            <Link
              href="/auth/signup"
              className="font-medium text-foreground hover:text-muted-foreground"
            >
              create a new account
            </Link>
          </p>
        </div>

        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(onSubmit)
          }}
        >
          <div className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email address"
                value={data.email || ''}
                onChange={(e) => setValue('email', e.target.value)}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                value={data.password || ''}
                onChange={(e) => setValue('password', e.target.value)}
                className={errors.password ? 'border-destructive' : ''}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-destructive">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded text-foreground focus:ring-ring"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/auth/forgot-password"
                className="font-medium text-foreground hover:text-muted-foreground"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting || isLoading}>
            {isSubmitting || isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  )
}
