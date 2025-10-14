'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from '@/hooks/use-form'
import { type SignUpForm, SignUpSchema } from '@/lib/schemas'
import { useAuthStore } from '@/stores/auth-store'

export default function SignUpPage() {
  const router = useRouter()
  const { signup, isLoading } = useAuthStore()
  const { data, errors, isSubmitting, setValue, handleSubmit } = useForm(SignUpSchema)

  const onSubmit = async (formData: SignUpForm) => {
    await signup(formData.email, formData.password, formData.firstName, formData.lastName)
    router.push('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-foreground">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or{' '}
            <Link
              href="/auth/signin"
              className="font-medium text-foreground hover:text-muted-foreground"
            >
              sign in to your existing account
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  placeholder="First name"
                  value={data.firstName || ''}
                  onChange={(e) => setValue('firstName', e.target.value)}
                  className={errors.firstName ? 'border-destructive' : ''}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-destructive">{errors.firstName}</p>
                )}
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Last name"
                  value={data.lastName || ''}
                  onChange={(e) => setValue('lastName', e.target.value)}
                  className={errors.lastName ? 'border-destructive' : ''}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-destructive">{errors.lastName}</p>
                )}
              </div>
            </div>

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

            <div>
              <Input
                type="password"
                placeholder="Confirm password"
                value={data.confirmPassword || ''}
                onChange={(e) => setValue('confirmPassword', e.target.value)}
                className={errors.confirmPassword ? 'border-destructive' : ''}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-destructive">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              required
              className="h-4 w-4 rounded text-foreground focus:ring-ring"
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-foreground">
              I agree to the{' '}
              <Link href="/terms" className="text-foreground hover:text-muted-foreground">
                Terms and Conditions
              </Link>
            </label>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting || isLoading}>
            {isSubmitting || isLoading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
      </div>
    </div>
  )
}
