'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Please select a subject'),
  orderNumber: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  newsletter: z.boolean(),
})

type ContactFormValues = z.infer<typeof contactSchema>

export function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      orderNumber: '',
      message: '',
      newsletter: false,
    },
  })

  const onSubmit = async (data: ContactFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.warn('Contact form submitted:', data)
    setIsSubmitted(true)
    form.reset()
  }

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="rounded-lg border bg-card p-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Send className="size-8" />
          </div>
          <h2 className="mb-2 text-2xl font-bold">Message Sent Successfully!</h2>
          <p className="mb-4 text-muted-foreground">
            Thank you for contacting us. We&apos;ll get back to you within 24 hours.
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
        <h1 className="mb-4 text-4xl font-bold">Contact Us</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as
          possible.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="h-full rounded-xl border p-8 bg-card">
            <h2 className="mb-6 text-2xl font-semibold">Get in Touch</h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-muted flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                  <MapPin className="size-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Address</h3>
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
                  <Phone className="size-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Phone</h3>
                  <p className="text-muted-foreground">
                    Main: 1-800-STORE-01
                    <br />
                    Support: 1-800-STORE-02
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-muted flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                  <Mail className="size-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Email</h3>
                  <p className="text-muted-foreground">
                    General: info@store.com
                    <br />
                    Support: support@store.com
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t pt-8">
              <h3 className="mb-4 font-semibold">Frequently Asked</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium">Order Status</h4>
                  <p className="text-muted-foreground text-sm">
                    Track your order in your account dashboard
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Returns</h4>
                  <p className="text-muted-foreground text-sm">30-day return policy on all items</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Shipping</h4>
                  <p className="text-muted-foreground text-sm">Free shipping on orders over $100</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-xl border bg-card p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold">Send us a Message</h2>

            <Form {...form}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 items-start">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        {fieldState.error && <FormMessage />}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        {fieldState.error && <FormMessage />}
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 items-start">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        {fieldState.error && <FormMessage />}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        {fieldState.error && <FormMessage />}
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 items-start">
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Subject *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="order">Order Support</SelectItem>
                            <SelectItem value="returns">Returns & Exchanges</SelectItem>
                            <SelectItem value="technical">Technical Support</SelectItem>
                            <SelectItem value="billing">Billing Question</SelectItem>
                            <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                          </SelectContent>
                        </Select>
                        {fieldState.error && <FormMessage />}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="orderNumber"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Order Number (if applicable)</FormLabel>
                        <FormControl>
                          <Input placeholder="#12345" {...field} />
                        </FormControl>
                        {fieldState.error && <FormMessage />}
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Message *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe your inquiry in detail..."
                          className="resize-none min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      {fieldState.error && <FormMessage />}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newsletter"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        I&apos;d like to receive updates about new products and promotions
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  onClick={form.handleSubmit(onSubmit)}
                  className="w-full"
                  size="lg"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="mb-6 text-center text-2xl font-semibold">Visit Our Store</h2>
        <div className="relative h-96 overflow-hidden rounded-xl bg-muted">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
              <h3 className="text-muted-foreground mb-2 text-lg font-semibold">Interactive Map</h3>
              <p className="text-muted-foreground">123 Commerce Street, Business City, BC 12345</p>
              <Button
                variant="outline"
                className="mt-4"
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

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Phone className="h-8 w-8" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Call Us</h3>
          <p className="text-muted-foreground text-balance">
            Speak directly with our customer service team for immediate assistance.
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Mail className="h-8 w-8" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Email Support</h3>
          <p className="text-muted-foreground text-balance">
            Send us an email and we&apos;ll respond within 24 hours during business days.
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <MapPin className="h-8 w-8" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Visit Store</h3>
          <p className="text-muted-foreground text-balance">
            Come visit our physical location to see our products in person.
          </p>
        </div>
      </div>
    </div>
  )
}
