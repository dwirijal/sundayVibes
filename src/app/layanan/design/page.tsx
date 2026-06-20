import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DesignPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-background text-center">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-4xl mx-auto mb-8">🎨</div>
        <h1 className="text-4xl md:text-5xl font-black mb-6">Design & Web</h1>
        <p className="text-xl text-stone-500 mb-12">Halaman Design & Web (Coming Soon)</p>
        <Button size="lg" className="rounded-full">
          <Link href="/layanan">← Kembali ke Layanan</Link>
        </Button>
      </div>
    </main>
  );
}
