import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './src/collections/Users'
import { Services } from './src/collections/Services'
import { Projects } from './src/collections/Projects'
import { Photos } from './src/collections/Photos'
import { Products } from './src/collections/Products'
import { Equipment } from './src/collections/Equipment'
import { Bookings } from './src/collections/Bookings'
import { Testimonials } from './src/collections/Testimonials'
import { Posts } from './src/collections/Posts'
import { Media } from './src/collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Services,
    Projects,
    Photos,
    Products,
    Equipment,
    Bookings,
    Testimonials,
    Posts,
    Media,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
})
