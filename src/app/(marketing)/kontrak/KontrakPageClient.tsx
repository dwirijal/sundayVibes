"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Printer, FileText } from "lucide-react";
import { useCart, calculatePromoDiscount } from "@/store/useCart";
import { QRCodeSVG } from 'qrcode.react';
import { generateDynamicQRIS } from '@/lib/qris';
import { useEffect } from "react";

interface RentalItem {
  name: string;
  price: number;
  qty: number;
}

export default function KontrakPageClient() {
  const [formData, setFormData] = useState({
    customerName: "",
    customerId: "",
    customerPhone: "",
    customerAddress: "",
    startDate: "",
    endDate: "",
    items: [] as RentalItem[],
    notes: "",
    collateral: "KTP" as "KTP" | "SIM" | "KARTU PELAJAR" | "PASPOR",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showQris, setShowQris] = useState(false);
  const [qrisPayload, setQrisPayload] = useState("");
  const [waNumber, setWaNumber] = useState("6285157319611");
  const [chargedTotal, setChargedTotal] = useState(0);
  const [contractNo] = useState(
    () => "KSA-" + new Date().getFullYear() + "-" + Math.random().toString(36).slice(2, 6).toUpperCase()
  );
  const BASE_QRIS = "00020101021126610014COM.GO-JEK.WWW01189360091439738305930210G9738305930303UMI51440014ID.CO.QRIS.WWW0215ID10243394679450303UMI5204733353033605802ID5919LEV. SPACE, Jakarta6005TUBAN61056238262070703A0163049B3A";
  const cartItems = useCart((state) => state.items);
  const promoCode = useCart((state) => state.promoCode);
    const applyPromo = useCart((state) => state.applyPromo);
  const removePromo = useCart((state) => state.removePromo);
  const [promoInput, setPromoInput] = useState("");
  const clearCart = useCart((state) => state.clearCart);

  // Fetch WA Number
  useEffect(() => {
    fetch('/api/contact').then(res => res.json()).then(data => setWaNumber(data.whatsappNumber)).catch(() => {});
  }, []);

  // Sync cart items to form (rehydrated from localStorage on mount).
  // formData.items is editable (add/remove/qty handlers below), so it can't be
  // pure-derived from cart — this is a one-time external-store→state seed.
  useEffect(() => {
    if (cartItems.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(prev => ({
        ...prev,
        items: cartItems.map(i => ({ name: i.name, price: i.price, qty: i.qty }))
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems.length]);

  const catalogItems = [
    { name: "Softbox Kit-1", price: 75000 },
    { name: "Softbox Kit-2", price: 85000 },
    { name: "Softbox Kit-3", price: 100000 },
    { name: "IL60 60W", price: 75000 },
    { name: "IL150Pro 150N", price: 125000 },
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
    const source = formData.items.length > 0 ? formData.items : cartItems;
    const subtotal = source.reduce((sum, item) => sum + item.price * item.qty, 0) * days;
    const discount = calculatePromoDiscount(promoCode, subtotal);
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

    // Create booking record, then generate dynamic QRIS
    const total = calculateTotal();
    setChargedTotal(total);
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'booking',
        service: 'sewa-alat',
        customer: {
          name: formData.customerName,
          email: `${formData.customerId}@sundayvibes.id`,
          phone: formData.customerPhone,
        },
        amount: total,
        date: formData.startDate,
        notes: `${formData.startDate} s/d ${formData.endDate}\nItems: ${formData.items.map(i => i.name).join(', ')}`,
      }),
    }).catch(() => {});

    try {
      const payload = generateDynamicQRIS(BASE_QRIS, total);
      setQrisPayload(payload);
      setShowQris(true);
    } catch (err) {
      console.error(err);
      alert("Gagal membuat kode QRIS.");
    }
  };

  const handleConfirmPayment = () => {
    const total = chargedTotal; // captured at submit, before clearCart resets promo
    setIsSubmitted(true);
    setShowQris(false);
    clearCart();

    const itemList = formData.items.map(i => `- ${i.name} (${i.qty}x)`).join('\n');
    const message = encodeURIComponent(
      `Halo Admin Sunday Vibes! 👋\n\nSaya sudah melakukan pembayaran via QRIS untuk Penyewaan Alat.\n\n*Detail Penyewa*:\nNama: ${formData.customerName}\nDurasi: ${formData.startDate} s/d ${formData.endDate}\n\n*Item Disewa*:\n${itemList}\n\n*Total Bayar*: Rp ${total.toLocaleString('id-ID')}\n\nBerikut saya lampirkan bukti transfernya: [SILAKAN ATTACH FOTO/SCREENSHOT BUKTI TRANSFER]`
    );

    // Open WA in a new tab so they can still see/print the invoice
    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  if (isSubmitted) {
    const fmtDate = (d: string) =>
      d ? new Date(d + "T00:00:00").toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }) : "—";

    return (
      <main className="min-h-screen pt-32 pb-24 bg-background print:pt-0 print:pb-0">
        <div className="container mx-auto px-6 max-w-[820px]">
          {/* Print Button - Hidden on print */}
          <div className="flex justify-end mb-6 print:hidden">
            <Button onClick={handlePrint} className="rounded-full px-6">
              <Printer className="w-4 h-4 mr-2" />
              Print / Simpan PDF
            </Button>
          </div>

          {/* ============ CONTRACT SHEET (printed) ============ */}
          <div className="contract-sheet bg-card border border-border rounded-2xl p-8 md:p-10 print:border-0 print:rounded-none print:p-0 text-foreground">

            {/* --- Masthead --- */}
            <div className="flex items-start justify-between rule-double">
              <div>
                <p className="doc-title text-lg leading-tight">SUNDAY VIBES</p>
                <p className="ink-mute text-[10px]">Platform Kreatif · Tuban</p>
              </div>
              <div className="text-right">
                <p className="sec-label ink-mute">No. Kontrak</p>
                <p className="font-mono text-xs">{contractNo}</p>
              </div>
            </div>

            <h1 className="doc-title text-center text-xl tracking-wide mt-3 mb-3">KONTRAK SEWA ALAT</h1>

            {/* --- Parties + Collateral (compact 2-col) --- */}
            <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] rule-t border-b border-black/80 print:border-black">
              <div className="p-3 border-b md:border-b-0 md:border-r border-black/40 print:border-black/40">
                <p className="sec-label ink-mute mb-2">Pihak Penyewa</p>
                <dl className="text-xs space-y-1">
                  <div className="flex gap-2"><dt className="ink-mute w-16 shrink-0">Nama</dt><dd className="font-semibold">{formData.customerName || "—"}</dd></div>
                  <div className="flex gap-2"><dt className="ink-mute w-16 shrink-0">No. ID</dt><dd>{formData.customerId || "—"}</dd></div>
                  <div className="flex gap-2"><dt className="ink-mute w-16 shrink-0">Telp</dt><dd>{formData.customerPhone || "—"}</dd></div>
                  <div className="flex gap-2"><dt className="ink-mute w-16 shrink-0">Alamat</dt><dd>{formData.customerAddress || "—"}</dd></div>
                </dl>
              </div>
              <div className="p-3">
                <p className="sec-label ink-mute mb-2">Penjaminan (pilih satu)</p>
                <ul className="text-xs space-y-1">
                  {(["KTP", "SIM", "KARTU PELAJAR", "PASPOR"] as const).map((c) => (
                    <li key={c} className="flex items-center gap-1.5">
                      <span className="inline-flex h-3 w-3 items-center justify-center rounded-full border border-black print:border-black">
                        {formData.collateral === c && <span className="h-1.5 w-1.5 rounded-full bg-black print:bg-black" />}
                      </span>
                      <span className={formData.collateral === c ? "font-semibold" : "ink-mute"}>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* --- Pemilik + Periode (one row) --- */}
            <div className="grid grid-cols-2 rule-t border-b border-black/80 print:border-black">
              <div className="p-3 border-r border-black/40 print:border-black/40">
                <p className="sec-label ink-mute mb-1">Pihak Pemilik</p>
                <p className="text-xs font-semibold">Dwi Rijal Giri Prabowo</p>
                <p className="ink-mute text-[10px]">Sunday Vibes</p>
              </div>
              <div className="p-3">
                <p className="sec-label ink-mute mb-1">Periode Sewa</p>
                <p className="text-xs">{fmtDate(formData.startDate)} — {fmtDate(formData.endDate)}</p>
                <p className="ink-mute text-[10px]">Durasi: {calculateDays()} hari</p>
              </div>
            </div>

            {/* --- Items table --- */}
            <div className="rule-t border-b border-black/80 print:border-black p-3">
              <p className="sec-label ink-mute mb-2">Alat yang Disewa</p>
              <table className="w-full text-xs">
                <thead>
                  <tr>
                    <th className="text-left">Item</th>
                    <th className="text-center w-10">Qty</th>
                    <th className="text-right w-24">Harga/Hari</th>
                    <th className="text-right w-24">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items.map((item) => (
                    <tr key={item.name}>
                      <td>{item.name}</td>
                      <td className="text-center">{item.qty}</td>
                      <td className="text-right">Rp {item.price.toLocaleString("id-ID")}</td>
                      <td className="text-right">Rp {(item.price * item.qty).toLocaleString("id-ID")}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="text-right font-bold">TOTAL ({calculateDays()} hari)</td>
                    <td className="text-right font-bold text-sm">Rp {chargedTotal.toLocaleString("id-ID")}</td>
                  </tr>
                </tfoot>
              </table>
              {formData.notes && (
                <p className="ink-mute text-[10px] mt-2"><span className="font-semibold text-black/80">Catatan:</span> {formData.notes}</p>
              )}
            </div>

            {/* --- Signatures --- */}
            <div className="grid grid-cols-2 gap-8 mt-6 avoid-break">
              <div>
                <p className="sec-label ink-mute mb-1">Penyewa</p>
                <p className="ink-mute text-[10px] mb-1">{formData.customerName || "—"}</p>
                <div className="sig-line" />
                <p className="ink-mute text-[9px] mt-1">Tanda tangan &amp; tanggal</p>
              </div>
              <div>
                <p className="sec-label ink-mute mb-1">Pemilik</p>
                <p className="ink-mute text-[10px] mb-1">Dwi Rijal Giri Prabowo</p>
                <div className="sig-line" />
                <p className="ink-mute text-[9px] mt-1">Tanda tangan &amp; tanggal</p>
              </div>
            </div>

            {/* ============ PAGE 2: Terms ============ */}
            <div className="page-break pt-2">
              <h2 className="doc-title text-sm tracking-wide mb-3">KETENTUAN PENYEWAAN</h2>
              <ol className="text-[10px] space-y-2 list-decimal pl-4">
                <li>Penyewa wajib menyerahkan dokumen jaminan ({formData.collateral}) asli kepada Pemilik selama masa sewa berlangsung.</li>
                <li>Alat wajib dikembalikan tepat pada tanggal selesai. Keterlambatan dikenakan biaya 50% (lima puluh persen) dari tarif harian per hari keterlambatan.</li>
                <li>Kerusakan, kehilangan, atau penyalahgunaan alat selama masa sewa sepenuhnya menjadi tanggung jawab Penyewa dan wajib diganti sesuai nilai penggantian.</li>
                <li>Alat wajib dikembalikan dalam kondisi bersih, kering, dan berfungsi baik. Biaya pembersihan dapat dikenakan apabila alat dikembalikan dalam kondisi kotor.</li>
                <li>Pembayaran dilakukan di muka melalui QRIS. Kontrak dianggap sah setelah pembayaran diterima dan kontrak ini ditandatangani kedua belah pihak.</li>
                <li>Dokumen jaminan dikembalikan kepada Penyewa setelah alat diterima kembali dalam kondisi sesuai dan seluruh kewajiban dilunasi.</li>
                <li>Apabila terjadi sengketa, kedua belah pihak sepakat menyelesaikan secara musyawarah; jika tidak tercapai, diselesaikan melalui jalur hukum di wilayah Tuban.</li>
              </ol>
              <div className="grid grid-cols-2 gap-8 mt-8 avoid-break">
                <div>
                  <div className="sig-line" />
                  <p className="ink-mute text-[9px] mt-1">{formData.customerName || "Penyewa"} — T.T. &amp; Tgl</p>
                </div>
                <div>
                  <div className="sig-line" />
                  <p className="ink-mute text-[9px] mt-1">Dwi Rijal Giri Prabowo — T.T. &amp; Tgl</p>
                </div>
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

            {/* Collateral / Penjaminan */}
            <fieldset className="mt-6">
              <legend className="block text-sm font-semibold text-foreground mb-3">
                Dokumen Penjaminan * <span className="text-muted-foreground font-normal">(dijaminkan selama sewa)</span>
              </legend>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(["KTP", "SIM", "KARTU PELAJAR", "PASPOR"] as const).map((c) => {
                  const checked = formData.collateral === c;
                  return (
                    <label
                      key={c}
                      className={`flex items-center gap-2 rounded-xl border px-4 py-3 cursor-pointer min-h-[44px] transition-colors ${
                        checked
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-background text-foreground hover:border-primary/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="collateral"
                        value={c}
                        checked={checked}
                        onChange={() => setFormData({ ...formData, collateral: c })}
                        className="h-4 w-4 accent-primary"
                      />
                      <span className="text-sm font-medium">{c}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
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
                            className="text-destructive hover:text-destructive/80 text-sm font-semibold min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-2"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-muted/50 border-t-2 border-border">
                    <tr>
                      <td colSpan={3} className="p-3">
                        <div className="flex gap-2 max-w-xs">
                          <input
                            type="text"
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value)}
                            placeholder="Kode Promo"
                            className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm min-h-[44px]"
                          />
                          <Button type="button" onClick={handleApplyPromo} variant="secondary">Pakai</Button>
                        </div>
                      </td>
                      <td colSpan={2} className="p-3 text-right">
                        {promoCode && (
                          <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-sm font-bold">
                            Promo {promoCode} Aktif
                            <button type="button" onClick={removePromo} className="text-green-800 hover:text-green-900 ml-1 min-w-[44px] min-h-[44px] inline-flex items-center justify-center">×</button>
                          </div>
                        )}
                      </td>
                    </tr>
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
              disabled={formData.items.length === 0 && cartItems.length === 0}
            >
              Buat Kontrak
            </Button>
          </div>
        </form>
      </div>

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
              Rp {chargedTotal.toLocaleString("id-ID")}
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
    </main>
  );
}
