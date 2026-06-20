import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl border-b border-stone-200 dark:border-stone-800">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center border border-primary/20 group-hover:scale-105 transition-transform">
            <Image
              src="/assets/logo-black-transparent.webp"
              alt="Sunday Vibes Logo"
              width={24}
              height={24}
              className="dark:invert opacity-90"
              priority
            />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">Sunday Vibes</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-stone-500 dark:text-stone-400">
          <Link href="/layanan/events" className="hover:text-primary transition-colors">Event Organizer</Link>
          <Link href="/layanan/digital" className="hover:text-primary transition-colors">Digital Product</Link>
          <Link href="/layanan/sewa-alat" className="hover:text-primary transition-colors">Sewa Alat</Link>
          <Link href="/layanan/design" className="hover:text-primary transition-colors">Design & Web</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/admin" className="hidden sm:block text-sm font-medium text-foreground hover:text-primary transition-colors">Client Portal</Link>
          <Link
            href="/kontak"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_8px_30px_-10px_rgba(245,158,11,0.5)] hover:-translate-y-0.5 transition-all duration-300"
            )}
          >
            Mulai Project
          </Link>
        </div>
      </div>
    </header>
  );
}
