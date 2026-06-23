import { headers } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/../payload.config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

export default async function InvoicesPage() {
  const headersList = await headers()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: headersList })

  if (!user) {
    return null
  }

  const bookings = await payload.find({
    collection: 'bookings',
    where: {
      client: { equals: user.id },
    },
    limit: 100,
    depth: 1,
    sort: '-createdAt',
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-foreground">Invoices</h1>
        <p className="text-muted-foreground mt-2">
          View your payment history and invoices
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          {bookings.docs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No invoices yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Order ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Service</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Amount</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-foreground">Status</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.docs.map((booking) => {
                    const orderId = booking.notes?.match(/Order ID: ([^\n]+)/)?.[1] || 'N/A'
                    return (
                      <tr key={booking.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 text-sm font-mono">{orderId}</td>
                        <td className="py-3 px-4 text-sm">
                          {new Date(booking.date).toLocaleDateString('id-ID')}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {typeof booking.service_type === 'object'
                            ? booking.service_type.title
                            : 'Service'}
                        </td>
                        <td className="py-3 px-4 text-sm text-right">
                          Rp {booking.amount?.toLocaleString('id-ID')}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge
                            className={
                              booking.payment_status === 'paid'
                                ? 'bg-primary/10 text-primary'
                                : 'bg-destructive/10 text-destructive'
                            }
                          >
                            {booking.payment_status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {booking.payment_status === 'paid' && (
                            <Button variant="ghost" size="sm" disabled>
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
