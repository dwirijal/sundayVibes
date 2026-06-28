import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/logger'

// Placeholder for Fonnte / WhatsApp Business API Webhook
// This route will handle incoming messages and provide automated responses
export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    logger.info('WhatsApp webhook received', { data })

    // Fonnte webhook structure usually contains:
    // sender, message, name, target, etc.
    const message = data.message?.toLowerCase() || ''
    // const sender = data.sender
    
    let replyMessage = ''

    // Simple Auto-responder Logic
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
      // Default fallback
      replyMessage = `Pesan Anda telah diterima. Admin kami akan segera merespons dalam waktu dekat. Jika urgent, silakan balas dengan "URGENT".\n\nJam operasional:\nSenin-Sabtu: 09:00 - 18:00 WIB.`
    }

    // Since no Fonnte is provided, this webhook just logs incoming events
    // and returns the auto-reply format that could be used by other providers
    logger.info('No Fonnte provider configured. Ignoring outbound send.');
    // })

    return NextResponse.json({ 
      status: 'success', 
      reply: replyMessage 
    })
  } catch (error) {
    logger.error('Webhook error', { error: String(error) })
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
