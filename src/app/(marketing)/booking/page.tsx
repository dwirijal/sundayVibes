"use client";

import type { Metadata } from 'next'
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";

const metadata: Metadata = {
  title: "Booking - Sunday Vibes",
  description: "Form booking online untuk semua layanan Sunday Vibes. Pilih layanan, isi data, dan konfirmasi pembayaran.",
};

interface FormData {
  service: string;
  date: string;
  budget: string;
  description: string;
  name: string;
  contact: string;
  notes: string;
}

const SERVICES = [
  { id: "events", label: "Event Organizer", icon: "🎉", desc: "Penyelenggaraan acara profesional & terpercaya" },
  { id: "digital", label: "Digital Product", icon: "💻", desc: "Website, web app, dan platform digital custom" },
  { id: "sewa-alat", label: "Sewa Alat", icon: "🛠️", desc: "Rental alat event, sound system, & multimedia" },
  { id: "design", label: "Design", icon: "🎨", desc: "Desain grafis, branding, & media sosial" },
  { id: "coding", label: "Coding", icon: "🚀", desc: "Pengembangan software & integrasi sistem" },
  { id: "wordpress", label: "WordPress", icon: "🌐", desc: "Pembuatan web & landing page berbasis WordPress" },
  { id: "photography", label: "Photography", icon: "📸", desc: "Jasa foto, video, & dokumentasi profesional" },
];

function BookingForm() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");

  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    service: "",
    date: "",
    budget: "",
    description: "",
    name: "",
    contact: "",
    notes: "",
  });

  useEffect(() => {
    if (serviceParam) {
      const match = SERVICES.find(
        (s) => s.id.toLowerCase() === serviceParam.toLowerCase()
      );
      if (match) {
        // Since React 18 strict mode + hooks can be finnicky about immediate updates inside useSearchParams
        // wrapping the state updates helps Next.js safely resolve it outside the immediate tree render sync
        setTimeout(() => setFormData((prev) => ({ ...prev, service: match.id })), 0);
      }
    }
  }, [serviceParam]);

  const handleServiceSelect = (id: string) => {
    setFormData((prev) => ({ ...prev, service: id }));
    setErrors((prev) => ({ ...prev, service: "" }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.service) {
        setErrors({ service: "Silakan pilih salah satu layanan untuk melanjutkan." });
        return;
      }
      setErrors({});
      setStep(2);
    } else if (step === 2) {
      const step2Errors: Record<string, string> = {};
      if (!formData.date) step2Errors.date = "Tanggal harus diisi.";
      if (!formData.budget) step2Errors.budget = "Pilih rentang budget Anda.";
      if (!formData.description.trim()) {
        step2Errors.description = "Deskripsi project harus diisi.";
      } else if (formData.description.trim().length < 10) {
        step2Errors.description = "Deskripsi project minimal 10 karakter.";
      }

      if (Object.keys(step2Errors).length > 0) {
        setErrors(step2Errors);
        return;
      }
      setErrors({});
      setStep(3);
    }
  };

  const handleBack = () => {
    setErrors({});
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 3) {
      const step3Errors: Record<string, string> = {};
      if (!formData.name.trim()) step3Errors.name = "Nama lengkap harus diisi.";
      if (!formData.contact.trim()) {
        step3Errors.contact = "Email / No. WhatsApp harus diisi.";
      }

      if (Object.keys(step3Errors).length > 0) {
        setErrors(step3Errors);
        return;
      }
      setErrors({});
      setIsSubmitted(true);
    }
  };

  const selectedServiceDetails = SERVICES.find((s) => s.id === formData.service);

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto bg-card border border-border rounded-[2.5rem] p-8 md:p-12 text-center shadow-lg">
        <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">
          ✓
        </div>
        <h2 className="text-3xl font-black text-foreground mb-4">
          Booking Berhasil Dikirim!
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          Terima kasih telah melakukan booking. Tim kami akan meninjau detail project Anda dan segera menghubungi Anda dalam waktu 1x24 jam.
        </p>

        <div className="bg-muted/50 rounded-2xl p-6 text-left mb-8 max-w-md mx-auto space-y-3 border border-border/50">
          <h3 className="font-bold text-foreground border-b border-border/80 pb-2 mb-2">Ringkasan Booking</h3>
          <div>
            <span className="text-xs text-muted-foreground block">Layanan:</span>
            <span className="font-semibold text-foreground text-sm">{selectedServiceDetails?.label}</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Tanggal Mulai:</span>
            <span className="font-semibold text-foreground text-sm">{formData.date}</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Budget:</span>
            <span className="font-semibold text-foreground text-sm">
              {formData.budget === "<5jt" && "< Rp 5.000.000"}
              {formData.budget === "5-15jt" && "Rp 5.000.000 - Rp 15.000.000"}
              {formData.budget === "15-30jt" && "Rp 15.000.000 - Rp 30.000.000"}
              {formData.budget === ">30jt" && "> Rp 30.000.000"}
            </span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Kontak:</span>
            <span className="font-semibold text-foreground text-sm">{formData.name} ({formData.contact})</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-sm font-bold">
            <Link href="/">Kembali ke Beranda</Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-sm font-bold border-2">
            <a href="https://wa.me/6285157319611" target="_blank" rel="noopener noreferrer">
              Hubungi via WhatsApp
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-10 bg-card border border-border rounded-3xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-black text-primary uppercase tracking-wider">
            Langkah {step} dari 3
          </span>
          <span className="text-sm text-muted-foreground font-semibold">
            {step === 1 && "Pilih Layanan"}
            {step === 2 && "Detail Project"}
            {step === 3 && "Informasi Kontak"}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300 ease-in-out rounded-full"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-[2.5rem] p-8 md:p-10 shadow-md">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Pilih Layanan</h2>
              <p className="text-muted-foreground text-sm">
                Pilih jenis layanan yang ingin Anda pesan untuk project Anda.
              </p>
            </div>

            {errors.service && (
              <p className="text-sm text-destructive bg-destructive/10 px-4 py-2 rounded-xl border border-destructive/20 font-medium">
                {errors.service}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SERVICES.map((item) => {
                const isSelected = formData.service === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleServiceSelect(item.id)}
                    className={`flex items-start gap-4 p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border bg-card hover:bg-muted"
                    }`}
                  >
                    <span className="text-3xl shrink-0 leading-none">{item.icon}</span>
                    <div className="space-y-1">
                      <span className="font-bold text-foreground text-base block">
                        {item.label}
                      </span>
                      <span className="text-xs text-muted-foreground leading-normal block">
                        {item.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Detail Project</h2>
              <p className="text-muted-foreground text-sm">
                Berikan informasi terkait jadwal, budget, dan deskripsi singkat project Anda.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">
                  Tanggal Mulai Project / Acara
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => {
                    setFormData({ ...formData, date: e.target.value });
                    if (errors.date) setErrors((prev) => ({ ...prev, date: "" }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                    errors.date ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.date && (
                  <p className="text-xs text-destructive mt-1.5 font-medium">{errors.date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-foreground mb-2">
                  Estimasi Budget
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => {
                    setFormData({ ...formData, budget: e.target.value });
                    if (errors.budget) setErrors((prev) => ({ ...prev, budget: "" }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                    errors.budget ? "border-red-500" : "border-border"
                  }`}
                >
                  <option value="">Pilih rentang budget...</option>
                  <option value="<5jt">&lt; Rp 5.000.000 (Kurang dari 5 Juta)</option>
                  <option value="5-15jt">Rp 5.000.000 - Rp 15.000.000</option>
                  <option value="15-30jt">Rp 15.000.000 - Rp 30.000.000</option>
                  <option value=">30jt">&gt; Rp 30.000.000 (Lebih dari 30 Juta)</option>
                </select>
                {errors.budget && (
                  <p className="text-xs text-destructive mt-1.5 font-medium">{errors.budget}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-foreground mb-2">
                  Deskripsi Project / Kebutuhan
                </label>
                <textarea
                  rows={5}
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    if (errors.description) setErrors((prev) => ({ ...prev, description: "" }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-colors ${
                    errors.description ? "border-red-500" : "border-border"
                  }`}
                  placeholder="Ceritakan sedetail mungkin tentang konsep, tujuan, atau spesifikasi project yang Anda inginkan..."
                />
                {errors.description && (
                  <p className="text-xs text-destructive mt-1.5 font-medium">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Informasi Kontak</h2>
              <p className="text-muted-foreground text-sm">
                Isi informasi kontak Anda agar tim kami dapat segera menghubungi Anda.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                    errors.name ? "border-red-500" : "border-border"
                  }`}
                  placeholder="Nama Anda"
                />
                {errors.name && (
                  <p className="text-xs text-destructive mt-1.5 font-medium">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-foreground mb-2">
                  Email / No. WhatsApp
                </label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => {
                    setFormData({ ...formData, contact: e.target.value });
                    if (errors.contact) setErrors((prev) => ({ ...prev, contact: "" }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                    errors.contact ? "border-red-500" : "border-border"
                  }`}
                  placeholder="email@example.com atau 08xx"
                />
                {errors.contact && (
                  <p className="text-xs text-destructive mt-1.5 font-medium">{errors.contact}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-foreground mb-2">
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  placeholder="Catatan tambahan, instruksi khusus, atau referensi link..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-10 pt-6 border-t border-border/80">
          <div>
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="rounded-full px-6 h-12 text-sm font-bold border-2"
              >
                <ChevronLeft className="w-4 h-4 mr-1 shrink-0" />
                Kembali
              </Button>
            )}
          </div>
          <div>
            {step < 3 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="rounded-full px-6 h-12 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Lanjut
                <ChevronRight className="w-4 h-4 ml-1 shrink-0" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="rounded-full px-8 h-12 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Submit Booking
                <Send className="w-4 h-4 ml-2 shrink-0" />
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default function BookingPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-6 max-w-4xl text-center mb-16">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">
          📝
        </div>
        <h1 className="text-5xl md:text-6xl font-black mb-6 text-foreground">
          Booking Layanan
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Isi form di bawah untuk memulai project Anda
        </p>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-6 mb-24">
        <Suspense
          fallback={
            <div className="max-w-3xl mx-auto p-12 text-center text-muted-foreground">
              Memuat form...
            </div>
          }
        >
          <BookingForm />
        </Suspense>
      </section>

      {/* Booking CTA Section */}
      <section className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-foreground rounded-[2.5rem] p-12 text-center text-background">
          <h2 className="text-3xl md:text-4xl font-black mb-6 text-background">
            Butuh Bantuan Cepat?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Hubungi tim customer support kami langsung via WhatsApp untuk respon instan atau konsultasi awal gratis.
          </p>
          <Button
            size="lg"
            className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg font-bold"
          >
            <a href="https://wa.me/6285157319611" target="_blank" rel="noopener noreferrer">
              Chat WhatsApp
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}
