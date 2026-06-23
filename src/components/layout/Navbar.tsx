"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartIcon } from "./CartIcon";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    const timeoutId = setTimeout(() => setIsOpen(false), 0);
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 dark:bg-stone-900/90 supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-stone-900/60 backdrop-blur-xl border-b border-stone-200 dark:border-stone-800">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer z-50">
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

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-stone-500 dark:text-stone-400">
          <Link href="/layanan/events" className="hover:text-primary transition-colors">Event Organizer</Link>
          <Link href="/layanan/digital" className="hover:text-primary transition-colors">Digital Product</Link>
          <Link href="/layanan/sewa-alat" className="hover:text-primary transition-colors">Sewa Alat</Link>
          <Link href="/layanan/design" className="hover:text-primary transition-colors">Design & Web</Link>
          <Link href="/foto" className="hover:text-primary transition-colors">Foto</Link>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/admin" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Client Portal</Link>
          <CartIcon />
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

        {/* Mobile Toggle Button */}
        <div className="flex lg:hidden items-center gap-4 z-50">
          <CartIcon />
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 -mr-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 top-20 bg-background lg:hidden transition-all duration-300 ease-in-out flex flex-col",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <nav className="flex flex-col gap-6 p-8 text-xl font-bold overflow-y-auto">
          <Link href="/layanan/events" className="hover:text-primary transition-colors">Event Organizer</Link>
          <Link href="/layanan/digital" className="hover:text-primary transition-colors">Digital Product</Link>
          <Link href="/layanan/sewa-alat" className="hover:text-primary transition-colors">Sewa Alat</Link>
          <Link href="/layanan/design" className="hover:text-primary transition-colors">Design & Web</Link>
          <Link href="/foto" className="hover:text-primary transition-colors">Foto Marketplace</Link>
          <Link href="/foto/wisuda" className="hover:text-primary transition-colors">Promo Foto Wisuda</Link>
          <Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          
          <div className="h-px w-full bg-border my-2"></div>
          
          <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors">Login / Client Portal</Link>
          
          <div className="mt-4 pb-10 mb-[env(safe-area-inset-bottom)]">
            <Link
              href="/kontak"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "w-full rounded-full bg-primary text-primary-foreground text-lg h-14"
              )}
            >
              Mulai Project Sekarang
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
