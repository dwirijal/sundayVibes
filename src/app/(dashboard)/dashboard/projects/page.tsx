import { headers } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/../payload.config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default async function ProjectsPage() {
  const headersList = await headers()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: headersList })

  if (!user) {
    return null
  }

  const projects = await payload.find({
    collection: 'projects',
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
        <h1 className="text-4xl font-black text-foreground">Projects</h1>
        <p className="text-muted-foreground mt-2">
          Track your ongoing and completed projects
        </p>
      </div>

      {projects.docs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No projects yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.docs.map((project) => (
            <Link key={project.id} href={`/portfolio/${project.slug}`}>
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.category && (
                      <div>
                        <span className="text-xs text-muted-foreground">Category:</span>
                        <p className="text-sm font-medium">
                          {typeof project.category === 'object'
                            ? project.category.title
                            : project.category}
                        </p>
                      </div>
                    )}
                    <div>
                      <span className="text-xs text-muted-foreground">Status:</span>
                      <Badge
                        className={'bg-primary/10 text-primary ml-2'}
                      >
                        In Progress
                      </Badge>
                    </div>
                    {project.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
