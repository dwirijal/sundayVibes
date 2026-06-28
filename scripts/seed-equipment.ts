// Seed equipment catalog into Payload Equipment collection (Neon Postgres).
// Run: npx tsx scripts/seed-equipment.ts
// Idempotent: upserts by slug (name-based), skips existing.
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

type Item = {
  name: string
  category: string
  price_per_day: number
  deposit: number
  available: number
  specs?: string
  url?: string
}

const items: Item[] = [
  { name: 'DJI LITO X1', category: 'Dokumentasi', price_per_day: 220000, deposit: 220000, available: 1, specs: 'Drone DJI Lito X1. Terbeli.', url: 'https://vt.tokopedia.com/t/ZS96B3sYHJfbB-1Ip97/' },
  { name: 'Tenda Arei Cladonia 2p', category: 'Outbond', price_per_day: 40000, deposit: 40000, available: 2, specs: 'Tenda Arei Cladonia original 2p. Kapasitas 2 orang. Ideal untuk kegiatan outdoor. Ruang yang cukup untuk dua orang.', url: 'https://s.shopee.co.id/3g1c5wdiEm' },
  { name: 'Matras Raung', category: 'Outbond', price_per_day: 8000, deposit: 8000, available: 3, specs: 'Matras Olahraga Yoga/Camping. Bahan Anti Slip, karet spon. Size 180x60 cm (DEWASA).', url: 'https://tk.tokopedia.com/ZSC6UbqvS/' },
  { name: 'Carrier Kilimanjaro Braga 45L', category: 'Outbond', price_per_day: 35000, deposit: 35000, available: 1, specs: 'Carrier Kilimanjaro Braga 45L.', url: 'https://tk.tokopedia.com/ZSC6U7fnA/' },
  { name: 'Kursi lipat speeds (L)', category: 'Outbond', price_per_day: 10000, deposit: 10000, available: 3, specs: 'Kursi lipat speeds ukuran L.', url: 'https://tk.tokopedia.com/ZSC6yfc8q/' },
  { name: 'Kursi lipat speeds (XL)', category: 'Outbond', price_per_day: 15000, deposit: 15000, available: 3, specs: 'Kursi lipat speeds ukuran XL.', url: 'https://tk.tokopedia.com/ZSC6yfc8q/' },
  { name: 'Kursi lipat speeds (XXL)', category: 'Outbond', price_per_day: 20000, deposit: 20000, available: 3, specs: 'Kursi lipat speeds ukuran XXL.', url: 'https://tk.tokopedia.com/ZSC6yfc8q/' },
  { name: 'Meja lipat 40x35x29 (S)', category: 'Outbond', price_per_day: 15000, deposit: 15000, available: 2, specs: 'Meja lipat ukuran 40x35x29 cm (S).', url: 'https://tk.tokopedia.com/ZSC6ytowS/' },
  { name: 'Meja lipat 50x53x50 (M)', category: 'Outbond', price_per_day: 25000, deposit: 25000, available: 1, specs: 'Meja lipat ukuran 50x53x50 cm (M).', url: 'https://tk.tokopedia.com/ZSC6ytowS/' },
  { name: 'Meja lipat 95x55x50 (L)', category: 'Outbond', price_per_day: 35000, deposit: 35000, available: 1, specs: 'Meja lipat ukuran 95x55x50 cm (L).', url: 'https://tk.tokopedia.com/ZSC6ytowS/' },
  { name: 'Tripod Inbex IB2R 170CM', category: 'Dokumentasi', price_per_day: 15000, deposit: 15000, available: 2, specs: 'Tripod Inbex IB2R 170CM.', url: 'https://tk.tokopedia.com/ZSC6fPxbt/' },
  { name: 'Tripod Inbex TF3366 133cm', category: 'Dokumentasi', price_per_day: 13500, deposit: 13500, available: 2, specs: 'Tripod Inbex TF3366 133cm.', url: 'https://tk.tokopedia.com/ZSC6fPxbt/' },
  { name: 'Lighting Mixio PL-08', category: 'Dokumentasi', price_per_day: 20000, deposit: 20000, available: 2, specs: 'Lighting Mixio PL-08.', url: 'https://tk.tokopedia.com/ZSC6Prhbk/' },
  { name: 'Lighting Ulanzi VL49 RGB', category: 'Dokumentasi', price_per_day: 35000, deposit: 35000, available: 2, specs: 'Lighting Ulanzi VL49 RGB.', url: 'https://tk.tokopedia.com/ZSC6PjhV3/' },
  { name: 'SHISUO A6 Mic Lavalier Nirkabel', category: 'Dokumentasi', price_per_day: 40000, deposit: 40000, available: 2, specs: 'SHISUO A6 Mic Nirkabel Lavalier dengan Klip Magnetik & Case Charger.', url: 'https://tk.tokopedia.com/ZSC6KRN3K/' },
  { name: 'Kompor Gas Portable Lipat', category: 'Outbond', price_per_day: 15000, deposit: 15000, available: 3, specs: 'Kompor Gas Portable (Lipat) + Tabung Gas. Kovar portable mini.', url: 'https://www.tokopedia.com/poohshopgrosir/kompor-camping-gas-kovar-portable-mini' },
  { name: 'Plat Penahan Angin Kompor (Windshield)', category: 'Outbond', price_per_day: 10000, deposit: 10000, available: 3, specs: 'Plat Penahan Angin Kompor Portable Camping Stove Windshield Outdoor.', url: 'https://www.tokopedia.com/artivic/plat-penahan-angin-kompor-portable' },
  { name: 'Alat Masak Camping Cooking Set', category: 'Outbond', price_per_day: 15000, deposit: 15000, available: 3, specs: 'Alat Masak Camping Cooking Set / Nesting. Panci kemping DS-200.', url: 'https://www.tokopedia.com/aistar-indonesia/alat-masak-camping-cooking-set' },
  { name: 'Canifer Hammock Ayunan 250x145', category: 'Outbond', price_per_day: 15000, deposit: 15000, available: 3, specs: 'Canifer Hammock Ayunan Gantung 250x145 cm. Hamok tempat tidur gantung.', url: 'https://www.tokopedia.com/canifer/canifer-hammock-ayunan-gantung' },
  { name: 'INBEX IL60 Lighting Studio 60W', category: 'Dokumentasi', price_per_day: 35000, deposit: 35000, available: 1, specs: 'INBEX IL60 Lighting Studio 60W.', url: 'https://tk.tokopedia.com/ZSCB3xxSD/' },
  { name: 'IL150 PRO Lighting Studio 150W', category: 'Dokumentasi', price_per_day: 70000, deposit: 70000, available: 1, specs: 'IL150 PRO Lighting Studio 150W.', url: 'https://tk.tokopedia.com/ZSCBTVmwv/' },
  { name: 'Reflektor Cahaya Studio 5 in 1 30cm', category: 'Dokumentasi', price_per_day: 5000, deposit: 5000, available: 2, specs: 'Reflektor Cahaya Studio Foto 5 in 1 / 2 in 1 - 30cm. Aksesoris Camera.', url: 'https://tk.tokopedia.com/ZSCBwS9jT/' },
  { name: 'INBEX Softbox Bowens Mount Kit 1', category: 'Dokumentasi', price_per_day: 20000, deposit: 20000, available: 1, specs: 'INBEX Softbox Light Bowens Mount Foto Video Studio with Bag - Kit 1.', url: 'https://tk.tokopedia.com/ZSCBw1BAX/' },
  { name: 'INBEX Softbox Bowens Mount Kit 2', category: 'Dokumentasi', price_per_day: 20000, deposit: 20000, available: 1, specs: 'INBEX Softbox Light Bowens Mount Foto Video Studio with Bag - Kit 2.', url: 'https://tk.tokopedia.com/ZSCBw1BAX/' },
  { name: 'INBEX Softbox Bowens Mount Kit 3', category: 'Dokumentasi', price_per_day: 55000, deposit: 55000, available: 1, specs: 'INBEX Softbox Light Bowens Mount Foto Video Studio with Bag - Kit 3.', url: 'https://tk.tokopedia.com/ZSCBw1BAX/' },
  { name: 'INBEX Softbox Bowens Mount Kit 4', category: 'Dokumentasi', price_per_day: 25000, deposit: 25000, available: 1, specs: 'INBEX Softbox Light Bowens Mount Foto Video Studio with Bag - Kit 4.', url: 'https://tk.tokopedia.com/ZSCBw1BAX/' },
]

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

async function main() {
  const payload = await getPayload({ config })
  let created = 0, updated = 0
  // ponytail: skipped unused — seed upserts by slug, nothing is skipped. Add a skip path if filtering is needed.

  // Stock rule: only items actually purchased (specs contains "Terbeli") get
  // available=1. Everything else is "Rencana" (planned, not yet bought) → 0.
  // The `available` numbers in the array above are source-purchase qty, not
  // current stock; this normalization is the source of truth for seeding.
  for (const item of items) {
    item.available = item.specs?.toLowerCase().includes('terbeli') ? 1 : 0
  }

  for (const item of items) {
    const slug = slugify(item.name)
    const existing = await payload.find({
      collection: 'equipment',
      where: { slug: { equals: slug } },
      limit: 1,
      overrideAccess: true,
    })

    const data = {
      name: item.name,
      slug,
      specs: item.specs ? { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: item.specs }] }] } } : undefined,
      price_per_day: item.price_per_day,
      deposit: item.deposit,
      available: item.available,
    }

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'equipment',
        id: existing.docs[0]!.id,
        data,
        overrideAccess: true,
      })
      updated++
    } else {
      await payload.create({
        collection: 'equipment',
        data,
        overrideAccess: true,
      })
      created++
    }
  }

  console.log(`Seeded ${items.length} items — created: ${created}, updated: ${updated}`)
  process.exit(0)
}

main().catch((e) => {
  console.error('Seed failed:', e)
  process.exit(1)
})
