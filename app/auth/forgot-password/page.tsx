'use client'

import { useState } from 'react'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from '@/hooks/use-form'
import { type ForgotPasswordForm, ForgotPasswordSchema } from '@/lib/schemas'

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { data, errors, isSubmitting, setValue, handleSubmit } = useForm(ForgotPasswordSchema)

  const onSubmit = async (formData: ForgotPasswordForm) => {
    // Simulate password reset request
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 text-center">
          <div>
            <h2 className="mt-6 text-3xl font-bold text-foreground">Check your email</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We&#39;ve sent a password reset link to {data.email}
            </p>
          </div>

          <div className="mt-8">
            <Link href="/auth/signin">
              <Button variant="outline" className="w-full bg-transparent">
                Back to sign in
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-foreground">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Enter your email address and we&#39;ll send you a link to reset your password.
          </p>
        </div>

        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(onSubmit)
          }}
        >
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

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send reset link'}
          </Button>

          <div className="text-center">
            <Link
              href="/auth/signin"
              className="font-medium text-foreground hover:text-muted-foreground"
            >
              Back to sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
