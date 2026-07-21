import { headers } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/../payload.config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, FolderKanban, FileText, DollarSign } from 'lucide-react'

export default async function DashboardPage() {
  const headersList = await headers()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: headersList })

  if (!user) {
    return null
  }

  // ⚡ Bolt: Fetch bookings and projects concurrently to reduce dashboard load time
  const [bookings, projects] = await Promise.all([
    payload.find({
      collection: 'bookings',
      where: {
        client: { equals: user.id },
      },
      limit: 100,
      depth: 1,
    }),
    payload.find({
      collection: 'projects',
      where: {
        client: { equals: user.id },
      },
      limit: 100,
      depth: 1,
    })
  ])

  // Calculate stats
  const totalBookings = bookings.docs.length
  const activeProjects = projects.docs.length // projects dont have status field yet in phase 1
  const unpaidInvoices = bookings.docs.filter(b => b.payment_status === 'unpaid').length
  const totalSpent = bookings.docs
    .filter(b => b.payment_status === 'paid')
    .reduce((sum, b) => sum + (b.amount || 0), 0)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {user.name}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-black text-primary">{totalBookings}</div>
                <div className="text-sm text-muted-foreground">Total Bookings</div>
              </div>
              <Calendar className="h-8 w-8 text-primary/20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-black text-secondary">{activeProjects}</div>
                <div className="text-sm text-muted-foreground">Active Projects</div>
              </div>
              <FolderKanban className="h-8 w-8 text-secondary/20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-black text-destructive">{unpaidInvoices}</div>
                <div className="text-sm text-muted-foreground">Unpaid Invoices</div>
              </div>
              <FileText className="h-8 w-8 text-destructive/20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-black text-foreground">
                  Rp {totalSpent.toLocaleString('id-ID')}
                </div>
                <div className="text-sm text-muted-foreground">Total Spent</div>
              </div>
              <DollarSign className="h-8 w-8 text-muted-foreground/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {bookings.docs.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No bookings yet
              </p>
            ) : (
              <div className="space-y-4">
                {bookings.docs.slice(0, 5).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">
                        {typeof booking.service_type === 'object'
                          ? booking.service_type.title
                          : 'Service'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(booking.date).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        Rp {booking.amount?.toLocaleString('id-ID')}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {booking.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            {projects.docs.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No active projects
              </p>
            ) : (
              <div className="space-y-4">
                {projects.docs
                  .slice(0, 5)
                  .map((project) => (
                    <div key={project.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{project.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {typeof project.category === 'object' ? project.category?.title : 'General'}
                        </p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary capitalize">
                        In Progress
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
