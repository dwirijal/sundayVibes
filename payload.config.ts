import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

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

import { SiteConfig } from './src/globals/SiteConfig'
import { ContactInfo } from './src/globals/ContactInfo'
import { SEODefaults } from './src/globals/SEODefaults'
import { Homepage } from './src/globals/Homepage'

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
  globals: [
    SiteConfig,
    ContactInfo,
    SEODefaults,
    Homepage,
  ],
  editor: lexicalEditor(),
  secret: (() => {
    // If we're building and the environment variable isn't present,
    // fallback to a dummy secret to let the Next.js static build finish.
    if (process.env.NEXT_PHASE === 'phase-production-build' && !process.env.DATABASE_URI) {
      return process.env.PAYLOAD_SECRET || 'dummy-secret-for-build-only-this-needs-to-be-32-chars-long';
    }

    const s = process.env.PAYLOAD_SECRET
    if (!s || s.length < 32) {
      throw new Error('PAYLOAD_SECRET must be set and at least 32 characters')
    }
    return s
  })(),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  plugins: [
    vercelBlobStorage({
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
