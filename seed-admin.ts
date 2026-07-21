import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({ path: path.resolve(dirname, '.env') })

async function seedAdmin() {
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@sundayvibes.com'
  const password = process.env.SEED_ADMIN_PASSWORD
  const name = process.env.SEED_ADMIN_NAME || 'Admin'

  // Validate BEFORE loading Payload (import side-effects need env).
  if (!password || password.length < 12) {
    console.error(
      'Refusing to seed: set SEED_ADMIN_PASSWORD (min 12 chars) in .env\n' +
        'Example: SEED_ADMIN_PASSWORD=$(openssl rand -base64 18)',
    )
    process.exit(1)
  }

  // Dynamic import so password gate runs even if Payload boot fails later.
  const { getPayload } = await import('payload')
  const { default: configPromise } = await import('./payload.config')

  const payload = await getPayload({ config: configPromise })

  console.log(`Creating admin user ${email}...`)

  try {
    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1,
      overrideAccess: true,
    })

    if (existing.docs.length > 0) {
      console.log('Admin already exists:', email)
      process.exit(0)
    }

    const admin = await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        name,
        role: 'admin',
      },
      overrideAccess: true,
    })
    console.log('Admin user created:', admin.email)
  } catch (error) {
    console.error('Failed to create admin:', error)
    process.exit(1)
  }

  process.exit(0)
}

seedAdmin().catch((err) => {
  console.error('Failed to create admin:', err)
  process.exit(1)
})
