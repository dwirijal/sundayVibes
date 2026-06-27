'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { QRCodeSVG } from 'qrcode.react'
import { generateDynamicQRIS } from '@/lib/qris'
import { trackCheckout } from '@/lib/analytics'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/ErrorFallback'
import { TrustBadges } from '@/components/checkout/TrustBadges'


const BASE_QRIS = "00020101021126610014COM.GO-JEK.WWW01189360091439738305930210G9738305930303UMI51440014ID.CO.QRIS.WWW0215ID10243394679450303UMI5204733353033605802ID5919LEV. SPACE, Jakarta6005TUBAN61056238262070703A0163049B3A";

export function CheckoutContent({ waNumber }: { waNumber: string }) {
  const searchParams = useSearchParams()
  const productId = searchParams.get('id') || searchParams.get('product')
  // const type = searchParams.get('type') || 'product'
  const license = searchParams.get('license') || 'standard'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })
  interface ProductData {
    id: string;
    name: string;
    price: number;
    type?: string;
    license?: string;
  }
  const [product, setProduct] = useState<ProductData | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'transfer'>('qris')
  const [showQris, setShowQris] = useState(false)
  const [qrisPayload, setQrisPayload] = useState("")

  useEffect(() => {
    const controller = new AbortController();
    async function fetchProduct() {
      if (!productId) {
        setLoading(false);
        return;
      }

      try {
        const url = `/api/products/${productId}?license=${license}`;
        const response = await fetch(url, { signal: controller.signal });
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
        console.error('Failed to fetch product:', err);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchProduct();
    return () => controller.abort();
  }, [productId, license])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!product) return

    setSubmitting(true)

    // Manual QRIS workflow
    try {
      const dynamicPayload = generateDynamicQRIS(BASE_QRIS, product.price);
      setQrisPayload(dynamicPayload);
      setShowQris(true);
      setSubmitting(false);
      trackCheckout(product.id, product.price);
    } catch (error) {
      console.error('QRIS generation error:', error);
      alert('Gagal membuat QRIS.');
      setSubmitting(false);
    }
  }

  const handleConfirmManual = () => {
    if (!product) return;
    const message = encodeURIComponent(
      `Halo Admin Sunday Vibes! 👋\n\nSaya sudah melakukan pembayaran via QRIS untuk:\n*Produk*: ${product.name}\n*Total*: Rp ${product.price.toLocaleString('id-ID')}\n*Atas Nama*: ${formData.name}\n*Email*: ${formData.email}\n\nBerikut saya lampirkan bukti transfernya: [SILAKAN ATTACH FOTO/SCREENSHOT BUKTI TRANSFER]`
    );
    window.location.href = `https://wa.me/${waNumber}?text=${message}`;
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

        <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Card>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>
              Rp {product.price.toLocaleString('id-ID')}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {!showQris ? (
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

                <div className="pt-4 border-t border-border">
                  <Label className="mb-4 block">Pilih Metode Pembayaran</Label>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant={paymentMethod === 'qris' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('qris')}
                      className="flex-1"
                    >
                      QRIS Dinamis
                    </Button>
                    <Button
                      type="button"
                      variant={paymentMethod === 'transfer' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('transfer')}
                      className="flex-1"
                      disabled
                    >
                      Transfer Bank
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={submitting}
                >
                  {submitting ? 'Memproses...' : 'Lanjut Pembayaran'}
                </Button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center text-center space-y-6 py-6">
                <h3 className="text-xl font-bold">Scan QRIS untuk Membayar</h3>
                <p className="text-muted-foreground">Buka aplikasi m-banking atau e-wallet Anda (Gopay, OVO, Dana, dll) dan scan QRIS di bawah ini.</p>

                <div className="p-4 bg-white rounded-xl shadow-sm border-2 border-stone-200">
                  <QRCodeSVG value={qrisPayload} size={250} level="H" />
                </div>

                <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold text-lg w-full">
                  Total: Rp {product.price.toLocaleString('id-ID')}
                </div>

                <TrustBadges />

                <div className="w-full space-y-3 mt-6">
                  <p className="text-sm font-semibold mb-2">Sudah Melakukan Pembayaran?</p>
                  <Button onClick={handleConfirmManual} size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Konfirmasi Pembayaran
                  </Button>
                  <Button onClick={() => setShowQris(false)} variant="outline" className="w-full">
                    Ganti Metode
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        </ErrorBoundary>
      </div>
    </main>
  )
}
