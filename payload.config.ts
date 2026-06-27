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
  secret: process.env.PAYLOAD_SECRET || '',
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
