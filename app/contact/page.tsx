'use client'

import { useState } from 'react'

import { Mail, MapPin, Phone, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from '@/hooks/use-form'
import { type ContactForm, ContactSchema } from '@/lib/schemas'

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { data, errors, isSubmitting, setValue, handleSubmit } = useForm(ContactSchema)

  const onSubmit = async (formData: ContactForm) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log('Contact form submitted:', formData)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="rounded-lg border bg-card p-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Send className="h-8 w-8 text-foreground" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-foreground">Message Sent Successfully!</h2>
          <p className="mb-4 text-muted-foreground">
            Thank you for contacting us. We&#39;ll get back to you within 24 hours.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="bg-transparent"
          >
            Send Another Message
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">Contact Us</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          We&#39;d love to hear from you. Send us a message and we&#39;ll respond as soon as
          possible.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="h-full rounded-xl border  p-8 bg-card">
            <h2 className="mb-6 text-2xl font-semibold text-foreground">Get in Touch</h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-muted flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                  <MapPin className="text-foreground h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-foreground">Address</h3>
                  <p className="text-muted-foreground">
                    123 Commerce Street
                    <br />
                    Business City, BC 12345
                    <br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-muted flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                  <Phone className="text-foreground h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-foreground">Phone</h3>
                  <p className="text-muted-foreground">
                    Main: 1-800-STORE-01
                    <br />
                    Support: 1-800-STORE-02
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-muted flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                  <Mail className="text-foreground h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-foreground">Email</h3>
                  <p className="text-muted-foreground">
                    General: info@store.com
                    <br />
                    Support: support@store.com
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-8 border-t  pt-8">
              <h3 className="mb-4 font-semibold text-foreground">Frequently Asked</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-foreground">Order Status</h4>
                  <p className="text-muted-foreground text-sm">
                    Track your order in your account dashboard
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">Returns</h4>
                  <p className="text-muted-foreground text-sm">30-day return policy on all items</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">Shipping</h4>
                  <p className="text-muted-foreground text-sm">Free shipping on orders over $100</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border  bg-card p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-foreground">Send us a Message</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(onSubmit)
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    First Name *
                  </label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={data.firstName || ''}
                    onChange={(e) => setValue('firstName', e.target.value)}
                    className={errors.firstName ? 'border-destructive' : ''}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-destructive">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Last Name *
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={data.lastName || ''}
                    onChange={(e) => setValue('lastName', e.target.value)}
                    className={errors.lastName ? 'border-destructive' : ''}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-destructive">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={data.email || ''}
                    onChange={(e) => setValue('email', e.target.value)}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={data.phone || ''}
                    onChange={(e) => setValue('phone', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    value={data.subject || ''}
                    onChange={(e) => setValue('subject', e.target.value)}
                    className={`focus:ring-ring w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 ${
                      errors.subject ? 'border-destructive' : ''
                    }`}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Support</option>
                    <option value="returns">Returns & Exchanges</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="partnership">Partnership Inquiry</option>
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-destructive">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="orderNumber"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Order Number (if applicable)
                  </label>
                  <Input
                    id="orderNumber"
                    type="text"
                    placeholder="#12345"
                    value={data.orderNumber || ''}
                    onChange={(e) => setValue('orderNumber', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="Please describe your inquiry in detail..."
                  value={data.message || ''}
                  onChange={(e) => setValue('message', e.target.value)}
                  className={`focus:ring-ring w-full resize-none rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 ${
                    errors.message ? 'border-destructive' : ''
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-destructive">{errors.message}</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  id="newsletter"
                  type="checkbox"
                  className="text-foreground focus:ring-ring h-4 w-4 rounded"
                />
                <label htmlFor="newsletter" className="ml-2 block text-sm text-foreground">
                  I&#39;d like to receive updates about new products and promotions
                </label>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-16">
        <h2 className="mb-6 text-center text-2xl font-semibold text-foreground">Visit Our Store</h2>
        <div className="relative h-96 overflow-hidden rounded-xl bg-muted">
          {/* Placeholder for map - in a real app, you'd use Google Maps, Mapbox, etc. */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
              <h3 className="text-muted-foreground mb-2 text-lg font-semibold">Interactive Map</h3>
              <p className="text-muted-foreground">123 Commerce Street, Business City, BC 12345</p>
              <Button
                variant="outline"
                className="mt-4 bg-background"
                onClick={() =>
                  window.open(
                    'https://maps.google.com/?q=123+Commerce+Street+Business+City+BC+12345',
                    '_blank'
                  )
                }
              >
                Open in Google Maps
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Phone className="h-8 w-8 text-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Call Us</h3>
          <p className="text-muted-foreground text-balance">
            Speak directly with our customer service team for immediate assistance.
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Mail className="h-8 w-8 text-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Email Support</h3>
          <p className="text-muted-foreground text-balance">
            Send us an email and we&#39;ll respond within 24 hours during business days.
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <MapPin className="h-8 w-8 text-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Visit Store</h3>
          <p className="text-muted-foreground text-balance">
            Come visit our physical location to see our products in person.
          </p>
        </div>
      </div>
    </div>
  )
}
