"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/store/useCart";
import { useEffect, useState } from "react";

export function CartIcon() {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCart((state) => state.totalItems());

  useEffect(() => {
    const timeoutId = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!mounted) return null;

  return (
    <Link href="/kontrak" className="relative flex items-center justify-center text-foreground hover:text-primary transition-colors" style={{ width: '44px', height: '44px', minWidth: '44px', minHeight: '44px', flexShrink: 0 }} aria-label="Keranjang belanja">
      <ShoppingCart className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
