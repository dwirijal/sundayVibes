import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Load environment variables
dotenv.config({ path: path.resolve(dirname, '.env') })

import { getPayload } from 'payload'
import configPromise from './payload.config'

async function seedAdmin() {
  const payload = await getPayload({ config: configPromise })

  console.log('Creating admin user...')

  try {
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
  } catch (error) {
    console.log('User might already exist or there was an issue:', error)
  }

  process.exit(0)
}

seedAdmin().catch((err) => {
  console.error('Failed to create admin:', err)
  process.exit(1)
})
