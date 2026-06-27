import type { Metadata } from 'next'
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import BookingFormClient from "./BookingFormClient";

export const metadata: Metadata = {
  title: "Booking - Sunday Vibes",
  description: "Form booking online untuk semua layanan Sunday Vibes. Pilih layanan, isi data, dan konfirmasi pembayaran.",
};

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
          <BookingFormClient />
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
