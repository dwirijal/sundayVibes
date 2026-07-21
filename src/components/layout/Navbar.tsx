"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartIcon } from "./CartIcon";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";
import { useCart } from "@/store/useCart";

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

const LAYANAN_ITEMS = [
  {
    href: "/layanan/events",
    title: "Event Organizer",
    desc: "Penyelenggara acara & dokumentasi",
  },
  {
    href: "/layanan/digital",
    title: "Digital Product",
    desc: "Undangan & solusi digital",
  },
  {
    href: "/layanan/design",
    title: "Design & Web",
    desc: "Jasa pembuatan website & grafis",
  },
  {
    href: "/layanan/sewa-alat",
    title: "Sewa Alat",
    desc: "Rental kamera & perlengkapan",
  },
] as const;

const EXPLORE_ITEMS = [
  { href: "/open-trip/bromo", title: "Open Trip Bromo" },
  { href: "/foto", title: "Galeri Foto" },
] as const;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileLayanan, setMobileLayanan] = useState(false);
  const [mobileExplore, setMobileExplore] = useState(false);
  const pathname = usePathname();

  const hasOrders = useCart((s) => s.items.length > 0);
  const mounted = useMounted();
  const ctaHref = mounted && hasOrders ? "/login" : "/kontak";
  const ctaLabel = mounted && hasOrders ? "Masuk/Daftar" : "Mulai Project";

  useEffect(() => {
    Promise.resolve().then(() => setIsOpen(false));
  }, [pathname]);

  return (
    <header className="fixed top-0 inset-x-0 w-full z-50 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center border border-primary/20">
            <Image
              src="/assets/logo-black-transparent.webp"
              alt="Sunday Vibes Logo"
              width={24}
              height={24}
              className="dark:invert dark:opacity-100 opacity-90"
              priority
            />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">
            Sunday Vibes
          </span>
        </Link>

        {/* Desktop Navigation with 100% Pure CSS Hover Dropdown */}
        <nav className="hidden lg:flex items-center gap-2 font-medium text-sm text-stone-600 dark:text-stone-300">
          
          {/* Layanan Menu */}
          <div className="relative group py-5">
            <button
              type="button"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full group-hover:bg-stone-100 dark:group-hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <span>Layanan</span>
              <ChevronDown className="size-4 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
            </button>

            {/* Seamless Mega Menu Panel via CSS group-hover */}
            <div className="absolute top-full left-0 w-[420px] pt-1 z-50 hidden group-hover:block group-focus-within:block animate-in fade-in-50 zoom-in-95 duration-150">
              <div className="p-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl grid grid-cols-2 gap-2">
                {LAYANAN_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex flex-col p-3 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  >
                    <span className="text-stone-900 dark:text-stone-100 font-semibold text-sm">
                      {item.title}
                    </span>
                    <span className="text-xs text-stone-500 line-clamp-2 mt-0.5">
                      {item.desc}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Explore Menu */}
          <div className="relative group py-5">
            <button
              type="button"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full group-hover:bg-stone-100 dark:group-hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <span>Explore</span>
              <ChevronDown className="size-4 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
            </button>

            <div className="absolute top-full left-0 w-56 pt-1 z-50 hidden group-hover:block group-focus-within:block animate-in fade-in-50 zoom-in-95 duration-150">
              <div className="p-2 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col gap-1">
                {EXPLORE_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm font-medium transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/blog"
            className="px-4 py-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            Journal
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <CartIcon />
          <Link
            href="/kontrak"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "text-stone-600 dark:text-stone-300",
            )}
          >
            Kontrak
          </Link>
          <Link
            href={ctaHref}
            className={cn(buttonVariants({ size: "sm" }), "font-semibold")}
          >
            {ctaLabel}
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <CartIcon />
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-6 py-6 flex flex-col gap-3 max-h-[80vh] overflow-y-auto">
          <div>
            <button
              type="button"
              onClick={() => setMobileLayanan((v) => !v)}
              className="flex items-center justify-between w-full py-2 font-semibold text-lg"
            >
              <span>Layanan</span>
              <ChevronDown className={cn("size-5 transition-transform", mobileLayanan && "rotate-180")} />
            </button>
            {mobileLayanan && (
              <div className="pl-4 mt-2 flex flex-col gap-2 border-l-2 border-primary/30">
                {LAYANAN_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="py-1.5 text-stone-600 dark:text-stone-400 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={() => setMobileExplore((v) => !v)}
              className="flex items-center justify-between w-full py-2 font-semibold text-lg"
            >
              <span>Explore</span>
              <ChevronDown className={cn("size-5 transition-transform", mobileExplore && "rotate-180")} />
            </button>
            {mobileExplore && (
              <div className="pl-4 mt-2 flex flex-col gap-2 border-l-2 border-primary/30">
                {EXPLORE_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="py-1.5 text-stone-600 dark:text-stone-400 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/blog" className="py-2 font-semibold text-lg" onClick={() => setIsOpen(false)}>
            Journal
          </Link>
          <Link href="/kontrak" className="py-2 font-semibold text-lg" onClick={() => setIsOpen(false)}>
            Kontrak
          </Link>

          <Link
            href={ctaHref}
            className={cn(buttonVariants({ size: "lg" }), "mt-4 justify-center font-bold")}
            onClick={() => setIsOpen(false)}
          >
            {ctaLabel}
          </Link>
        </div>
      )}
    </header>
  );
}
