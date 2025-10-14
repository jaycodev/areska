export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="prose prose-gray max-w-none">
        <h1 className="mb-8 text-4xl font-bold text-foreground">Shipping Information</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          We offer fast, reliable shipping options to get your order to you quickly and safely.
        </p>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Shipping Options</h2>
          <div className="text-muted-foreground">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-card">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-muted-foreground">
                      Shipping Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-muted-foreground">
                      Delivery Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-muted-foreground">
                      Cost
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-muted-foreground">
                      Tracking
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-foreground">
                      Standard Shipping
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-muted-foreground">
                      5-7 business days
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-muted-foreground">
                      $5.99 (Free over $100)
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-muted-foreground">
                      Yes
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-foreground">
                      Express Shipping
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-muted-foreground">
                      2-3 business days
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-muted-foreground">
                      $12.99
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-muted-foreground">
                      Yes
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-foreground">
                      Overnight Shipping
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-muted-foreground">
                      1 business day
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-muted-foreground">
                      $24.99
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-muted-foreground">
                      Yes
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-foreground">
                      International
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-muted-foreground">
                      7-21 business days
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-muted-foreground">
                      Varies by location
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-muted-foreground">
                      Yes
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Free Shipping</h2>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-3 text-lg font-semibold text-foreground">
              🚚 Free Standard Shipping
            </h3>
            <p className="mb-4 text-muted-foreground">
              Enjoy free standard shipping on all orders over $100. No promo code needed - the
              discount is automatically applied at checkout.
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Applies to standard shipping within the continental US</li>
              <li>Orders must total $100 or more before taxes</li>
              <li>Excludes oversized items and special delivery requirements</li>
              <li>Cannot be combined with other shipping promotions</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Processing Time</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              All orders are processed within 1-2 business days. Orders placed after 2 PM EST will
              be processed the next business day.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold text-foreground">In-Stock Items</h3>
                <p className="text-muted-foreground">Ships within 1-2 business days</p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold text-foreground">Pre-Order Items</h3>
                <p className="text-muted-foreground">Ships on or before the estimated date</p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold text-foreground">Custom Items</h3>
                <p className="text-muted-foreground">Processing time varies (3-10 business days)</p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold text-foreground">Bulk Orders</h3>
                <p className="text-muted-foreground">Contact us for processing timeline</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">International Shipping</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              We ship to over 100 countries worldwide. International shipping rates and delivery
              times vary by destination.
            </p>

            <h3 className="text-xl font-medium text-foreground">Important Notes:</h3>
            <ul className="list-disc space-y-2 pl-6">
              <li>Customs duties and taxes are the responsibility of the recipient</li>
              <li>Delivery times may be extended due to customs processing</li>
              <li>Some products may be restricted in certain countries</li>
              <li>International orders cannot be expedited</li>
            </ul>

            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-2 font-semibold text-foreground">💡 International Customers</h3>
              <p className="text-muted-foreground">
                For the most accurate shipping costs and delivery estimates, add items to your cart
                and enter your shipping address at checkout.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Order Tracking</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Once your order ships, you&#39;ll receive a tracking number via email. You can track
              your package using:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Your account dashboard on our website</li>
              <li>The tracking link in your shipping confirmation email</li>
              <li>Directly on the carrier&#39;s website</li>
              <li>Our mobile app (coming soon)</li>
            </ul>

            <div className="rounded-lg bg-card p-6">
              <h3 className="mb-3 font-semibold text-foreground">Tracking Information Includes:</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ul className="text-muted-foreground space-y-2">
                  <li>• Current package location</li>
                  <li>• Estimated delivery date</li>
                  <li>• Delivery status updates</li>
                </ul>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Carrier information</li>
                  <li>• Delivery attempt notifications</li>
                  <li>• Proof of delivery</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Delivery Information</h2>
          <div className="space-y-4 text-muted-foreground">
            <h3 className="text-xl font-medium text-foreground">Delivery Requirements:</h3>
            <ul className="list-disc space-y-2 pl-6">
              <li>Someone must be available to sign for packages over $500</li>
              <li>Packages may be left at your door for standard deliveries</li>
              <li>Apartment deliveries require access to the building</li>
              <li>PO Box deliveries are available for small items only</li>
            </ul>

            <h3 className="mt-6 text-xl font-medium text-foreground">Delivery Issues:</h3>
            <p>If you experience any delivery issues, please contact us within 48 hours:</p>
            <div className="rounded-lg border bg-card p-4">
              <ul className="space-y-2 text-muted-foreground">
                <li>• Package marked as delivered but not received</li>
                <li>• Damaged package upon delivery</li>
                <li>• Incorrect delivery address</li>
                <li>• Multiple delivery attempts failed</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Special Shipping Services</h2>
          <div className="space-y-4 text-muted-foreground">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border p-6">
                <h3 className="mb-3 text-lg font-semibold text-foreground">White Glove Delivery</h3>
                <p className="text-muted-foreground mb-3">Available for large or fragile items</p>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  <li>• Scheduled delivery appointment</li>
                  <li>• Professional handling and setup</li>
                  <li>• Packaging removal</li>
                  <li>• Additional fees apply</li>
                </ul>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="mb-3 text-lg font-semibold text-foreground">Hold for Pickup</h3>
                <p className="text-muted-foreground mb-3">Have packages held at carrier facility</p>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  <li>• Available at FedEx and UPS locations</li>
                  <li>• Hold for up to 7 days</li>
                  <li>• Photo ID required for pickup</li>
                  <li>• Free service</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Shipping Restrictions</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>Please note the following shipping restrictions:</p>
            <div className="rounded-lg border bg-card p-4">
              <h3 className="mb-3 font-semibold text-foreground">Restricted Areas</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• PO Boxes (for large items only)</li>
                <li>• Military APO/FPO addresses (contact us first)</li>
                <li>• Remote or rural areas (additional fees may apply)</li>
                <li>• Certain international destinations</li>
              </ul>
            </div>

            <div className="mt-4 rounded-lg border bg-card p-4">
              <h3 className="mb-3 font-semibold text-foreground">Product Restrictions</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Lithium batteries (international shipping restrictions)</li>
                <li>• Oversized items (additional handling fees)</li>
                <li>• Hazardous materials (cannot ship)</li>
                <li>• Items over 150 lbs (special arrangements required)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Contact Shipping Support</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>Need help with shipping questions or issues?</p>
            <div className="rounded-lg bg-card p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">Shipping Department</h3>
                  <p>
                    <strong>Email:</strong> shipping@store.com
                  </p>
                  <p>
                    <strong>Phone:</strong> 1-800-SHIP-NOW
                  </p>
                  <p>
                    <strong>Hours:</strong> Mon-Fri 8AM-6PM EST
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">Common Questions</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Order status and tracking</li>
                    <li>• Shipping address changes</li>
                    <li>• Delivery scheduling</li>
                    <li>• International shipping quotes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
