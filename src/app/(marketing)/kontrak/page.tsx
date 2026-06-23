"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Printer, FileText } from "lucide-react";
import { useCart } from "@/store/useCart";
import { QRCodeSVG } from 'qrcode.react';
import { generateDynamicQRIS } from '@/lib/qris';
import { useEffect } from "react";

interface RentalItem {
  name: string;
  price: number;
  qty: number;
}

export default function KontrakPage() {
  const [formData, setFormData] = useState({
    customerName: "",
    customerId: "",
    customerPhone: "",
    customerAddress: "",
    startDate: "",
    endDate: "",
    items: [] as RentalItem[],
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showQris, setShowQris] = useState(false);
  const [qrisPayload, setQrisPayload] = useState("");
  const [waNumber, setWaNumber] = useState("6285157319611");
  const BASE_QRIS = "00020101021126610014COM.GO-JEK.WWW01189360091439738305930210G9738305930303UMI51440014ID.CO.QRIS.WWW0215ID10243394679450303UMI5204733353033605802ID5919LEV. SPACE, Jakarta6005TUBAN61056238262070703A0163049B3A";
  const cartItems = useCart((state) => state.items);
  const promoCode = useCart((state) => state.promoCode);
  const discountAmount = useCart((state) => state.discountAmount);
  const applyPromo = useCart((state) => state.applyPromo);
  const removePromo = useCart((state) => state.removePromo);
  const [promoInput, setPromoInput] = useState("");
  const clearCart = useCart((state) => state.clearCart);

  // Fetch WA Number
  useEffect(() => {
    fetch('/api/contact').then(res => res.json()).then(data => setWaNumber(data.whatsappNumber)).catch(() => {});
  }, []);

  // Sync cart items to form on mount
  useEffect(() => {
    if (cartItems.length > 0) {
      const timeoutId = setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          items: cartItems.map(i => ({ name: i.name, price: i.price, qty: i.qty }))
        }));
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [cartItems]);

  const catalogItems = [
    { name: "Softbox Kit-1", price: 75000 },
    { name: "Softbox Kit-2", price: 85000 },
    { name: "Softbox Kit-3", price: 100000 },
    { name: "IL60 60W", price: 75000 },
    { name: "IL150Pro 150W", price: 125000 },
    { name: "IPL17 RGB", price: 35000 },
    { name: "Mixio PL08", price: 30000 },
    { name: "TNW-M01Pro", price: 200000 },
    { name: "Brica B-Steady 2", price: 175000 },
    { name: "DJI OM7", price: 325000 },
    { name: "DJI Lito X1", price: 220000 },
    { name: "DJI Neo 2", price: 175000 },
    { name: "Tripod S", price: 25000 },
    { name: "Tripod M", price: 35000 },
    { name: "Tripod L", price: 50000 },
  ];

  const addItem = (itemName: string) => {
    const item = catalogItems.find((i) => i.name === itemName);
    if (!item) return;

    const existing = formData.items.find((i) => i.name === itemName);
    if (existing) {
      setFormData({
        ...formData,
        items: formData.items.map((i) =>
          i.name === itemName ? { ...i, qty: i.qty + 1 } : i
        ),
      });
    } else {
      setFormData({
        ...formData,
        items: [...formData.items, { name: item.name, price: item.price, qty: 1 }],
      });
    }
  };

  const removeItem = (itemName: string) => {
    setFormData({
      ...formData,
      items: formData.items.filter((i) => i.name !== itemName),
    });
  };

  const updateQty = (itemName: string, qty: number) => {
    if (qty <= 0) {
      removeItem(itemName);
      return;
    }
    setFormData({
      ...formData,
      items: formData.items.map((i) => (i.name === itemName ? { ...i, qty } : i)),
    });
  };

  const calculateDays = () => {
    if (!formData.startDate || !formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(1, diff);
  };

  const calculateTotal = () => {
    const days = calculateDays();
    const subtotal = formData.items.reduce((sum, item) => sum + item.price * item.qty, 0) * days;
    
    if (!promoCode) return subtotal;
    
    // If discount < 1, it's a percentage. Otherwise it's a fixed amount.
    const discount = discountAmount < 1 ? subtotal * discountAmount : discountAmount;
    return Math.max(0, subtotal - discount);
  };
  
  const handleApplyPromo = () => {
    if (!promoInput) return;
    const success = applyPromo(promoInput);
    if (!success) alert("Kode promo tidak valid");
    setPromoInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate QRIS
    try {
      const total = calculateTotal();
      const payload = generateDynamicQRIS(BASE_QRIS, total);
      setQrisPayload(payload);
      setShowQris(true);
    } catch (err) {
      console.error(err);
      alert("Gagal membuat kode QRIS.");
    }
  };
  
  const handleConfirmPayment = () => {
    setIsSubmitted(true);
    setShowQris(false);
    clearCart();
    
    const itemList = formData.items.map(i => `- ${i.name} (${i.qty}x)`).join('\n');
    const message = encodeURIComponent(
      `Halo Admin Sunday Vibes! 👋\n\nSaya sudah melakukan pembayaran via QRIS untuk Penyewaan Alat.\n\n*Detail Penyewa*:\nNama: ${formData.customerName}\nDurasi: ${formData.startDate} s/d ${formData.endDate}\n\n*Item Disewa*:\n${itemList}\n\n*Total Bayar*: Rp ${calculateTotal().toLocaleString('id-ID')}\n\nBerikut saya lampirkan bukti transfernya: [SILAKAN ATTACH FOTO/SCREENSHOT BUKTI TRANSFER]`
    );
    
    // Open WA in a new tab so they can still see/print the invoice
    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen pt-32 pb-24 bg-background print:pt-0">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Print Button - Hidden on print */}
          <div className="flex justify-end mb-6 print:hidden">
            <Button onClick={handlePrint} className="rounded-full px-6">
              <Printer className="w-4 h-4 mr-2" />
              Print Kontrak
            </Button>
          </div>

          {/* Contract Document */}
          <div className="bg-card border border-border rounded-3xl p-8 md:p-12 print:border-0 print:rounded-none print:p-0">
            
      {/* QRIS Modal overlay */}
      {showQris && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border shadow-2xl rounded-3xl p-8 max-w-sm w-full flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
            <h3 className="text-2xl font-black mb-2">Scan QRIS</h3>
            <p className="text-muted-foreground text-sm mb-6">Gunakan aplikasi m-banking atau e-wallet Anda.</p>
            
            <div className="bg-white p-4 rounded-2xl mb-6 border-2 border-stone-200">
              <QRCodeSVG value={qrisPayload} size={250} level="H" />
            </div>
            
            <div className="bg-primary/10 text-primary font-black text-xl px-6 py-3 rounded-xl mb-8 w-full">
              Rp {calculateTotal().toLocaleString("id-ID")}
            </div>
            
            <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white mb-3" onClick={handleConfirmPayment}>
              Saya Sudah Membayar
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => setShowQris(false)}>
              Batal
            </Button>
          </div>
        </div>
      )}

      {/* Header */}
            <div className="text-center mb-8 pb-6 border-b border-border">
              <h1 className="text-3xl font-black text-foreground mb-2">KONTRAK SEWA ALAT</h1>
              <p className="text-muted-foreground">Sunday Vibes - Platform Kreatif</p>
            </div>

            {/* Customer Info */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Data Penyewa</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nama Lengkap</p>
                  <p className="font-semibold text-foreground">{formData.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">No. Identitas (KTP/SIM)</p>
                  <p className="font-semibold text-foreground">{formData.customerId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">No. Telepon</p>
                  <p className="font-semibold text-foreground">{formData.customerPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Alamat</p>
                  <p className="font-semibold text-foreground">{formData.customerAddress}</p>
                </div>
              </div>
            </div>

            {/* Rental Period */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Periode Sewa</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tanggal Mulai</p>
                  <p className="font-semibold text-foreground">{formData.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tanggal Selesai</p>
                  <p className="font-semibold text-foreground">{formData.endDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Durasi</p>
                  <p className="font-semibold text-foreground">{calculateDays()} hari</p>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Alat yang Disewa</h2>
              <div className="border border-border rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 text-sm font-semibold text-foreground">Item</th>
                      <th className="text-center p-3 text-sm font-semibold text-foreground">Qty</th>
                      <th className="text-right p-3 text-sm font-semibold text-foreground">Harga/Hari</th>
                      <th className="text-right p-3 text-sm font-semibold text-foreground">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.items.map((item) => (
                      <tr key={item.name} className="border-t border-border">
                        <td className="p-3 text-foreground">{item.name}</td>
                        <td className="p-3 text-center text-foreground">{item.qty}</td>
                        <td className="p-3 text-right text-foreground">
                          Rp {item.price.toLocaleString("id-ID")}
                        </td>
                        <td className="p-3 text-right text-foreground">
                          Rp {(item.price * item.qty).toLocaleString("id-ID")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-muted/50 border-t-2 border-border">
                    {/* Promo Code Section */}
                    <tr className="print:hidden">
                      <td colSpan={2} className="p-3">
                        <div className="flex gap-2 max-w-xs">
                          <input 
                            type="text" 
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value)}
                            placeholder="Kode Promo" 
                            className="w-full px-3 py-1.5 rounded-lg border border-border bg-background text-sm"
                          />
                          <Button type="button" onClick={handleApplyPromo} variant="secondary" size="sm">Pakai</Button>
                        </div>
                      </td>
                      <td colSpan={2} className="p-3 text-right">
                        {promoCode && (
                          <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-sm font-bold">
                            Promo {promoCode} Aktif
                            <button type="button" onClick={removePromo} className="text-green-800 hover:text-green-900 ml-1">×</button>
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="p-3 text-right font-bold text-foreground">
                        Total ({calculateDays()} hari):
                      </td>
                      <td className="p-3 text-right font-black text-foreground text-lg">
                        Rp {calculateTotal().toLocaleString("id-ID")}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Terms */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Syarat & Ketentuan</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Penyewa wajib meninggalkan KTP/SIM asli sebagai deposit</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Alat harus dikembalikan sesuai jadwal, keterlambatan dikenakan biaya 50% per hari</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Kerusakan atau kehilangan menjadi tanggung jawab penyewa</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Alat harus dikembalikan dalam kondisi bersih dan berfungsi baik</span>
                </li>
              </ul>
            </div>

            {/* Notes */}
            {formData.notes && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-foreground mb-2">Catatan</h2>
                <p className="text-muted-foreground">{formData.notes}</p>
              </div>
            )}

            {/* Signatures */}
            <div className="grid md:grid-cols-2 gap-12 mt-12 pt-8 border-t border-border">
              <div>
                <p className="text-sm text-muted-foreground mb-16">Penyewa</p>
                <div className="border-b border-border pb-2">
                  <p className="font-semibold text-foreground">{formData.customerName}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Tanda tangan & tanggal</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-16">Sunday Vibes</p>
                <div className="border-b border-border pb-2">
                  <p className="font-semibold text-foreground">Admin</p>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Tanda tangan & tanggal</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-4xl mx-auto mb-6">
            <FileText className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-foreground">Kontrak Sewa Alat</h1>
          <p className="text-xl text-muted-foreground">
            Isi form di bawah untuk membuat kontrak rental
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Customer Info */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Data Penyewa</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Nama sesuai KTP"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  No. Identitas (KTP/SIM) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerId}
                  onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Nomor KTP/SIM"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  No. Telepon *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="08xxxxxxxxxx"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Alamat *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerAddress}
                  onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Alamat lengkap"
                />
              </div>
            </div>
          </div>

          {/* Rental Period */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Periode Sewa</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Tanggal Mulai *
                </label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Tanggal Selesai *
                </label>
                <input
                  type="date"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
            {formData.startDate && formData.endDate && (
              <p className="mt-4 text-sm text-muted-foreground">
                Durasi sewa: <span className="font-semibold text-foreground">{calculateDays()} hari</span>
              </p>
            )}
          </div>

          {/* Items Selection */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Pilih Alat</h2>

            {/* Add Item */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-foreground mb-2">
                Tambah Alat
              </label>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    addItem(e.target.value);
                    e.target.value = "";
                  }
                }}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                defaultValue=""
              >
                <option value="" disabled>
                  Pilih alat...
                </option>
                {catalogItems.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name} - Rp {item.price.toLocaleString("id-ID")}/hari
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Items */}
            {formData.items.length > 0 && (
              <div className="border border-border rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 text-sm font-semibold text-foreground">Item</th>
                      <th className="text-center p-3 text-sm font-semibold text-foreground">Qty</th>
                      <th className="text-right p-3 text-sm font-semibold text-foreground">Harga/Hari</th>
                      <th className="text-right p-3 text-sm font-semibold text-foreground">Subtotal</th>
                      <th className="text-center p-3 text-sm font-semibold text-foreground">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.items.map((item) => (
                      <tr key={item.name} className="border-t border-border">
                        <td className="p-3 text-foreground">{item.name}</td>
                        <td className="p-3 text-center">
                          <input
                            type="number"
                            min="1"
                            value={item.qty}
                            onChange={(e) => updateQty(item.name, parseInt(e.target.value))}
                            className="w-16 px-2 py-1 text-center rounded border border-border bg-background text-foreground"
                          />
                        </td>
                        <td className="p-3 text-right text-foreground">
                          Rp {item.price.toLocaleString("id-ID")}
                        </td>
                        <td className="p-3 text-right text-foreground">
                          Rp {(item.price * item.qty).toLocaleString("id-ID")}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            type="button"
                            onClick={() => removeItem(item.name)}
                            className="text-destructive hover:text-destructive/80 text-sm font-semibold"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-muted/50 border-t-2 border-border">
                    <tr>
                      <td colSpan={3} className="p-3 text-right font-bold text-foreground">
                        Total per hari:
                      </td>
                      <td className="p-3 text-right font-black text-foreground">
                        Rp {formData.items.reduce((sum, item) => sum + item.price * item.qty, 0).toLocaleString("id-ID")}
                      </td>
                      <td></td>
                    </tr>
                    {calculateDays() > 0 && (
                      <tr>
                        <td colSpan={3} className="p-3 text-right font-bold text-foreground">
                          Total ({calculateDays()} hari):
                        </td>
                        <td className="p-3 text-right font-black text-foreground text-lg">
                          Rp {calculateTotal().toLocaleString("id-ID")}
                        </td>
                        <td></td>
                      </tr>
                    )}
                  </tfoot>
                </table>
              </div>
            )}

            {formData.items.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                Belum ada alat yang dipilih
              </p>
            )}
          </div>

          {/* Notes */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Catatan (Opsional)</h2>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              placeholder="Catatan tambahan atau permintaan khusus..."
            />
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <Button
              type="submit"
              size="lg"
              className="flex-1 rounded-full h-14 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={formData.items.length === 0}
            >
              Buat Kontrak
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
