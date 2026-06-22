import dotenv from 'dotenv'
import path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') })

import { getPayload } from 'payload'
import config from './payload.config'

async function seedAdmin() {
  const payload = await getPayload({ config })

  console.log('Creating admin user...')

  const admin = await payload.create({
    collection: 'users',
    data: {
      email: 'admin@sundayvibes.com',
      password: 'admin123',
      name: 'Admin',
      role: 'admin',
    },
  })

  console.log('Admin user created:', admin.email)
  process.exit(0)
}

seedAdmin().catch((err) => {
  console.error('Failed to create admin:', err)
  process.exit(1)
})
