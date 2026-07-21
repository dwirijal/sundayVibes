import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/logger'

// Placeholder for Fonnte / WhatsApp Business API Webhook.
// Requires WHATSAPP_WEBHOOK_SECRET header match (Bearer or x-webhook-secret).
export const runtime = 'edge'

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.WHATSAPP_WEBHOOK_SECRET
  // Fail closed if secret not configured — prevents open forge surface.
  if (!secret) return false

  const auth = req.headers.get('authorization')
  if (auth?.startsWith('Bearer ') && auth.slice(7) === secret) return true

  const header = req.headers.get('x-webhook-secret')
  if (header && header === secret) return true

  // Fonnte sometimes uses ?token=
  const token = req.nextUrl.searchParams.get('token')
  if (token && token === secret) return true

  return false
}

export async function POST(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()
    logger.info('WhatsApp webhook received', { data })

    const message = data.message?.toLowerCase() || ''
    let replyMessage = ''

    if (message.includes('halo') || message.includes('hi') || message.includes('hai')) {
      replyMessage = `Halo! 👋 Terima kasih telah menghubungi Sunday Vibes.\n\nAda yang bisa kami bantu hari ini?\n1. Info Layanan\n2. Cek Ketersediaan Alat\n3. Info Harga Foto\n4. Konsultasi Web/App\n\nKetik angka untuk info lebih lanjut.`
    } else if (message === '1') {
      replyMessage = `Layanan yang kami sediakan:\n- Event Organizer 🎉\n- Digital Products 💻\n- Sewa Alat Dokumentasi 📷\n- Jasa Design 🎨\n- Jasa Coding & Web ⚡\n- Fotografi 📸\n\nCek selengkapnya di https://sundayvibes.id/layanan`
    } else if (message === '2') {
      replyMessage = `Untuk mengecek ketersediaan alat, Anda bisa langsung melihat katalog kami di https://sundayvibes.id/sewa-alat dan melakukan booking secara online.`
    } else if (message === '3') {
      replyMessage = `Harga foto (Standard/Extended License) dan portfolio bisa dilihat di https://sundayvibes.id/foto`
    } else if (message === '4') {
      replyMessage = `Untuk konsultasi Web/App Development, ceritakan sedikit tentang aplikasi yang ingin Anda bangun, dan tim dev kami akan segera merespons Anda.`
    } else {
      replyMessage = `Pesan Anda telah diterima. Admin kami akan segera merespons dalam waktu dekat. Jika urgent, silakan balas dengan "URGENT".\n\nJam operasional:\nSenin-Sabtu: 09:00 - 18:00 WIB.`
    }

    logger.info('No Fonnte provider configured. Ignoring outbound send.')

    return NextResponse.json({
      status: 'success',
      reply: replyMessage,
    })
  } catch (error) {
    logger.error('Webhook error', { error: String(error) })
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
