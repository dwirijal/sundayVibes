// Load env BEFORE any ESM imports so payload.config.ts sees process.env
import dotenv from 'dotenv'

async function main() {
  dotenv.config()

  const { getPayload } = await import('payload')
  const configPromise = (await import('./payload.config')).default

  const payload = await getPayload({ config: configPromise })
  console.log('Payload initialized')

  const eq = await payload.find({ collection: 'equipment', limit: 1, overrideAccess: true, depth: 0 })
  console.log('Equipment docs:', eq.docs.length)
  if (eq.docs.length) {
    console.log('Specs:', JSON.stringify(eq.docs[0].specs, null, 2))
  }

  try {
    const content = {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: 'Hello world', version: 1 }
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1
          }
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1
      }
    }

    const post = await payload.create({
      collection: 'posts',
      overrideAccess: true,
      data: {
        title: 'Seed Test',
        slug: 'seed-test-' + Date.now(),
        category: 'Test',
        content,
      }
    })
    console.log('Post created:', post.id)
  } catch (e: any) {
    console.error('ERROR:', e.message)
    if (e.data?.errors) console.error('DATA:', JSON.stringify(e.data.errors, null, 2))
    if (e.stack) console.error(e.stack.split('\n').slice(0, 5).join('\n'))
  }

  process.exit(0)
}

main().catch(e => { console.error(e); process.exit(1) })
