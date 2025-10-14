export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="prose prose-gray max-w-none">
        <h1 className="mb-8 text-4xl font-bold text-foreground">Returns & Exchanges</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          We want you to be completely satisfied with your purchase. If you&#39;re not happy with
          your order, we&#39;re here to help with our hassle-free return policy.
        </p>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Return Policy Overview</h2>
          <div className="bg-primary/10 border-primary/20 mb-6 rounded-lg border p-6">
            <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3">
              <div>
                <div className="text-primary mb-2 text-3xl font-bold">30</div>
                <div className="text-muted-foreground text-sm">Days to Return</div>
              </div>
              <div>
                <div className="text-primary mb-2 text-3xl font-bold">FREE</div>
                <div className="text-muted-foreground text-sm">Return Shipping</div>
              </div>
              <div>
                <div className="text-primary mb-2 text-3xl font-bold">100%</div>
                <div className="text-muted-foreground text-sm">Money Back Guarantee</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">What Can Be Returned</h2>
          <div className="space-y-4 text-foreground">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <h3 className="mb-3 text-lg font-semibold text-green-800">✓ Returnable Items</h3>
                <ul className="space-y-2 text-green-700">
                  <li>• Items in original condition</li>
                  <li>• Unused products with tags</li>
                  <li>• Items in original packaging</li>
                  <li>• Electronics with all accessories</li>
                  <li>• Clothing and accessories</li>
                </ul>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <h3 className="mb-3 text-lg font-semibold text-red-800">✗ Non-Returnable Items</h3>
                <ul className="space-y-2 text-red-700">
                  <li>• Personalized or custom items</li>
                  <li>• Perishable goods</li>
                  <li>• Intimate or sanitary goods</li>
                  <li>• Items damaged by misuse</li>
                  <li>• Digital downloads</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">How to Return an Item</h2>
          <div className="space-y-6 text-foreground">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="text-center">
                  <div className="bg-primary mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold text-primary-foreground">
                    {step}
                  </div>
                  <h3 className="mb-2 font-semibold">
                    {['Start Return', 'Print Label', 'Pack & Ship', 'Get Refund'][step - 1]}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {
                      [
                        'Log into your account and select the item you want to return',
                        'Print the prepaid return shipping label we provide',
                        'Pack the item securely and drop it off at any shipping location',
                        'Receive your refund within 5-7 business days after we receive your return',
                      ][step - 1]
                    }
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Return Timeframes</h2>
          <div className="text-foreground">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-card">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">
                      Item Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">
                      Return Window
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">
                      Refund Processing
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Standard Items', '30 days', '5-7 business days'],
                    ['Electronics', '30 days', '7-10 business days'],
                    ['Sale Items', '14 days', '5-7 business days'],
                  ].map(([type, window, time]) => (
                    <tr key={type}>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{type}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{window}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Exchanges</h2>
          <div className="space-y-4 text-foreground">
            <p>
              We currently don&#39;t offer direct exchanges. If you need a different size, color, or
              model, please return your original item and place a new order for the item you want.
            </p>
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <h3 className="mb-2 font-semibold text-blue-800">💡 Pro Tip</h3>
              <p className="text-blue-700">
                To ensure you get the item you want quickly, place your new order first, then return
                the original item. This way, you won&#39;t have to wait for the return to be
                processed.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">International Returns</h2>
          <div className="space-y-4 text-foreground">
            <p>International customers can return items within 30 days of delivery. Please note:</p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Return shipping costs are the customer&#39;s responsibility</li>
              <li>Items must be returned to our US warehouse</li>
              <li>Customs duties and taxes are non-refundable</li>
              <li>Processing may take 10-14 business days due to customs clearance</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">
            Damaged or Defective Items
          </h2>
          <div className="space-y-4 text-foreground">
            <p>
              If you receive a damaged or defective item, please contact us immediately. We&#39;ll
              provide:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Free return shipping</li>
              <li>Full refund or replacement</li>
              <li>Expedited processing</li>
              <li>Additional compensation if applicable</li>
            </ul>
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <p className="text-yellow-800">
                <strong>Important:</strong> Please take photos of damaged items and packaging before
                returning. This helps us improve our packaging and shipping processes.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Need Help?</h2>
          <div className="space-y-4 text-foreground">
            <p>Our customer service team is here to help with any return questions:</p>
            <div className="rounded-lg bg-card p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-semibold">Contact Information</h3>
                  <p>
                    <strong>Email:</strong> returns@store.com
                  </p>
                  <p>
                    <strong>Phone:</strong> 1-800-STORE-01
                  </p>
                  <p>
                    <strong>Hours:</strong> Mon-Fri 9AM-6PM EST
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Return Address</h3>
                  <p>
                    Store Returns Department
                    <br />
                    123 Commerce Street
                    <br />
                    Business City, BC 12345
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
