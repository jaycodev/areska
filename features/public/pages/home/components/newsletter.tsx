import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Newsletter() {
  return (
    <section className="py-16 border-t">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Stay Updated</h2>
        <p className="mb-8 text-xl text-muted-foreground">
          Subscribe to our newsletter and be the first to know about new products, exclusive offers,
          and special promotions.
        </p>

        <div className="mx-auto max-w-md">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input type="email" placeholder="Enter your email address" className="flex-1" />
            <Button variant="secondary" className="whitespace-nowrap">
              Subscribe Now
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}
