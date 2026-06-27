'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { trackFormSubmission } from '@/lib/analytics'

export function ContactFormClient() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    trackFormSubmission('contact')
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="text-xl font-bold text-foreground mb-2">Pesan Terkirim!</h3>
        <p className="text-muted-foreground">Tim kami akan segera menghubungi Anda.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Nama Lengkap</label>
        <input
          type="text"
          name="name"
          required
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Nama Anda"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Email / WhatsApp</label>
        <input
          type="text"
          name="contact"
          required
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="email@example.com atau 08xx"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Layanan yang Diminati</label>
        <select name="service" className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
          <option value="">Pilih layanan...</option>
          <option value="events">Event Organizer</option>
          <option value="digital">Digital Product</option>
          <option value="sewa-alat">Sewa Alat</option>
          <option value="design">Jasa Design</option>
          <option value="coding">Jasa Coding</option>
          <option value="wordpress">Jasa WordPress</option>
          <option value="photography">Photography</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Pesan</label>
        <textarea
          name="message"
          rows={4}
          required
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          placeholder="Ceritakan kebutuhan Anda..."
        />
      </div>
      <Button type="submit" size="lg" className="w-full rounded-full h-12 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90">
        Kirim Pesan
      </Button>
    </form>
  )
}
