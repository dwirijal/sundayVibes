'use client'

import type { Metadata } from 'next'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const metadata: Metadata = {
  title: "Checkout - Sunday Vibes",
  description: "Selesaikan pembayaran untuk produk digital, foto, atau booking layanan Sunday Vibes.",
};

function CheckoutContent() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('product')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    // Mock product data - in production, fetch from API
    const products = {
      'lightroom-presets': {
        id: 'lightroom-presets',
        name: 'Lightroom Presets',
        price: 149000,
      },
      'notion-os-template': {
        id: 'notion-os-template',
        name: 'Notion OS Template',
        price: 249000,
      },
      'social-media-bundle': {
        id: 'social-media-bundle',
        name: 'Social Media Bundle',
        price: 199000,
      },
    }

    if (productId && products[productId as keyof typeof products]) {
      setProduct(products[productId as keyof typeof products])
    }
    setLoading(false)
  }, [productId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!product) return

    setSubmitting(true)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          customer: formData,
        }),
      })

      const data = await response.json()

      if (data.redirect_url) {
        // Redirect to Midtrans payment page
        window.location.href = data.redirect_url
      } else {
        alert('Failed to create payment transaction')
        setSubmitting(false)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('An error occurred during checkout')
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="container mx-auto px-6 py-24">Loading...</div>
  }

  if (!product) {
    return <div className="container mx-auto px-6 py-24">Product not found</div>
  }

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6 max-w-2xl">
        <h1 className="text-4xl font-black mb-8 text-foreground">Checkout</h1>

        <Card>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>
              Rp {product.price.toLocaleString('id-ID')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Nomor WhatsApp</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={submitting}
              >
                {submitting ? 'Processing...' : 'Bayar Sekarang'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-6 py-24">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
