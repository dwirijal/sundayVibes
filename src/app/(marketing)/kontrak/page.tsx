import { Suspense } from "react";
import type { Metadata } from "next";
import KontrakPageClient from "./KontrakPageClient";

export const metadata: Metadata = {
  title: "Kontrak Sewa Alat | Sunday Vibes",
  description:
    "Buat kontrak sewa alat kreatif dengan mudah. Isi form, pilih alat, bayar via QRIS, dan dapatkan kontrak rental resmi dari Sunday Vibes.",
  openGraph: {
    title: "Kontrak Sewa Alat | Sunday Vibes",
    description:
      "Buat kontrak sewa alat kreatif dengan mudah. Isi form, pilih alat, bayar via QRIS, dan dapatkan kontrak rental resmi dari Sunday Vibes.",
    type: "website",
  },
};

export default function KontrakPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-6 py-24 text-muted-foreground">Memuat kontrak...</div>}>
      <KontrakPageClient />
    </Suspense>
  );
}
