"use client";

import { Home, Briefcase, Camera, FileText, MessageCircle } from "lucide-react";
import { Dock } from "../Dock";
import { CartIcon } from "./CartIcon";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/layanan", label: "Layanan", icon: Briefcase },
  { href: "/foto", label: "Foto", icon: Camera },
  { href: "/blog", label: "Blog", icon: FileText },
  { href: "/kontak", label: "Kontak", icon: MessageCircle },
];

export function BottomTabBar() {
  return (
    <>
      <Dock items={tabs} position="bottom" className="lg:hidden print:hidden" />
      <div className="fixed bottom-4 right-4 z-50 lg:hidden print:hidden">
        <div className="pointer-events-auto flex items-center justify-center p-3 rounded-full bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl border border-stone-200/50 dark:border-stone-700/50 shadow-lg shadow-stone-900/10 dark:shadow-black/20">
          <CartIcon />
        </div>
      </div>
    </>
  );
}
