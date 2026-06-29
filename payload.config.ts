import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { Users } from './src/collections/Users'
import { Products } from './src/collections/Products'
import { Media } from './src/collections/Media'
import { Services } from './src/collections/Services'
import { Equipment } from './src/collections/Equipment'
import { Photos } from './src/collections/Photos'
import { Posts } from './src/collections/Posts'
import { Bookings } from './src/collections/Bookings'
import { Projects } from './src/collections/Projects'
import { Testimonials } from './src/collections/Testimonials'

import { SiteConfig } from './src/globals/SiteConfig'
import { Homepage } from './src/globals/Homepage'
import { ContactInfo } from './src/globals/ContactInfo'
import { SEODefaults } from './src/globals/SEODefaults'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Products,
    Services,
    Equipment,
    Photos,
    Posts,
    Media,
    Bookings,
    Projects,
    Testimonials,
  ],
  globals: [SiteConfig, Homepage, ContactInfo, SEODefaults],
  editor: lexicalEditor(),
  secret: (() => {
    const s = process.env.PAYLOAD_SECRET
    if (!s || s.length < 32) {
      if (process.env.NODE_ENV === 'production' && process.env.CI !== 'true') {
        throw new Error('PAYLOAD_SECRET must be set and at least 32 characters')
      }
      return 'dummy-secret-for-build-only-1234567890'
    }
    return s
  })(),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgresql://dummy:dummy@localhost:5432/dummy?sslmode=disable',
    },
  }),
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
