"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3x3, Image, ShoppingBag, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { CartIcon } from "./CartIcon";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/layanan", label: "Layanan", icon: Grid3x3 },
  { href: "/portfolio", label: "Portfolio", icon: Image },
  { href: "/kontak", label: "Kontak", icon: MessageCircle },
];

export function BottomTabBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 dark:bg-stone-900/95 supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-stone-900/60 backdrop-blur-xl border-t border-stone-200 dark:border-stone-800 safe-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg min-w-[60px] transition-colors",
                active
                  ? "text-primary"
                  : "text-stone-500 dark:text-stone-400 hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </Link>
          );
        })}
        <div className="flex flex-col items-center justify-center gap-1 px-3 py-2 min-w-[60px]">
          <CartIcon />
          <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Cart</span>
        </div>
      </div>
    </nav>
  );
}
