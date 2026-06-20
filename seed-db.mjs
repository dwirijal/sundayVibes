import { getPayload } from 'payload';
import configPromise from './payload.config.ts';

async function main() {
  console.log('Initializing payload...');
  const payload = await getPayload({ config: configPromise });
  
  console.log('Fetching services...');
  const { docs } = await payload.find({
    collection: 'services',
  });
  console.log(`Found ${docs.length} services.`);
  process.exit(0);
}

main().catch(console.error);
