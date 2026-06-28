# Cloudflare KV Cache Setup Guide

## Overview
Sunday Vibes menggunakan Cloudflare KV untuk caching API responses, mengurangi beban database dan mempercepat response time.

## Fitur yang Menggunakan Cache
- `/api/contact` - Data kontak (WhatsApp number) - Cache 1 jam
- `/api/products/[id]` - Detail produk/foto - Cache 30 menit

## Cara Mendapatkan Cloudflare Credentials

### 1. Account ID
1. Login ke [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Lihat di sidebar kanan, Anda akan melihat **Account ID**
3. Copy dan simpan di `.env` sebagai `CLOUDFLARE_ACCOUNT_ID`

### 2. KV Namespace ID
Namespace sudah dibuat: `sunday-vibes-cache`
- Namespace ID: `0334a8dd7f614724b8c197b759e1b224`
- Sudah terisi di `.env` sebagai `CLOUDFLARE_KV_NAMESPACE_ID`

### 3. API Token
1. Login ke [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Klik **My Profile** (ikon user di kanan atas)
3. Pilih **API Tokens**
4. Klik **Create Token**
5. Pilih **Create Custom Token**
6. Isi form:
   - **Token name**: `Sunday Vibes KV Access`
   - **Permissions**:
     - Account > Cloudflare KV > Edit
   - **Account Resources**:
     - Include > Your account name
7. Klik **Continue to summary**
8. Klik **Create Token**
9. Copy token dan simpan di `.env` sebagai `CLOUDFLARE_API_TOKEN`

**PENTING**: Token hanya ditampilkan sekali! Simpan dengan aman.

## Setup Environment Variables

Edit file `.env` dan isi:

```env
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
CLOUDFLARE_KV_NAMESPACE_ID=0334a8dd7f614724b8c197b759e1b224
CLOUDFLARE_API_TOKEN=your_api_token_here
```

## Setup di Vercel

1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Pilih project `sunday-vibes`
3. Klik tab **Settings** > **Environment Variables**
4. Tambahkan 3 variabel:
   - `CLOUDFLARE_ACCOUNT_ID`
   - `CLOUDFLARE_KV_NAMESPACE_ID`
   - `CLOUDFLARE_API_TOKEN`
5. Pilih environment: Production, Preview, Development
6. Klik **Save**
7. Redeploy aplikasi

## Testing Cache

Setelah setup, Anda bisa test cache dengan:

```bash
# Request pertama (miss cache)
curl https://your-domain.com/api/contact

# Request kedua (hit cache)
curl https://your-domain.com/api/contact
```

Response kedua akan lebih cepat karena data diambil dari cache.

## Monitoring Cache

Anda bisa monitor cache usage di:
- Cloudflare Dashboard > Workers & Pages > KV > sunday-vibes-cache
- Lihat metrics: reads, writes, deletes

## Troubleshooting

### Cache tidak bekerja
- Pastikan semua environment variables sudah terisi
- Cek Vercel logs untuk error message
- Pastikan API Token memiliki permission KV Edit

### Error 403 Forbidden
- API Token tidak memiliki permission yang cukup
- Buat ulang token dengan permission Account > Cloudflare KV > Edit

### Error 404 Not Found
- Namespace ID salah
- Cek di Cloudflare Dashboard > Workers & Pages > KV

## Cache Strategy

### Contact Info (1 jam)
- Data kontak jarang berubah
- Dipanggil di setiap halaman (WhatsApp button)
- Cache 1 jam menghemat ~86,400 database queries per hari

### Product Details (30 menit)
- Data produk bisa berubah (harga, stok)
- Dipanggil saat user melihat detail produk
- Cache 30 menit balance antara performa dan data freshness

## Free Tier Limits

Cloudflare KV Free Tier:
- 100,000 reads per day
- 1,000 writes per day
- 1 GB storage

Estimasi penggunaan Sunday Vibes:
- Contact endpoint: ~1,000 requests/hari = ~1,000 reads (dengan cache)
- Product endpoint: ~500 requests/hari = ~500 reads (dengan cache)
- Total: ~1,500 reads/hari (well within free tier)

## Performance Benefits

### Tanpa Cache
- Contact endpoint: ~200-500ms (query database)
- Product endpoint: ~300-800ms (query database)

### Dengan Cache
- Contact endpoint: ~20-50ms (ambil dari KV)
- Product endpoint: ~30-80ms (ambil dari KV)

**Improvement**: 5-10x lebih cepat!

## Advanced: Manual Cache Invalidation

Jika perlu invalidate cache secara manual (misal setelah update data di CMS):

```typescript
import { invalidateCache } from '@/lib/cloudflare-cache'

// Invalidate specific key
await invalidateCache('contact-info')

// Invalidate product
await invalidateCache('product-123-standard')
```

## Support

Untuk bantuan setup Cloudflare:
- [Cloudflare KV Documentation](https://developers.cloudflare.com/kv/)
- [Cloudflare API Tokens](https://developers.cloudflare.com/fundamentals/get-started/create-api-token/)
