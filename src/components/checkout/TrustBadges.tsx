'use client';

import { useRef } from 'react';
import { Shield, Lock, CreditCard, Headphones } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getDuration, STAGGER } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

interface BadgeProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
}

function Badge({ icon: Icon, label, description }: BadgeProps) {
  return (
    <div className="trust-badge group flex flex-col items-center gap-2 p-4 rounded-xl transition-transform duration-300 hover:-translate-y-1 hover:bg-primary/5">
      <div className="p-2 rounded-full bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="text-center">
        <div className="text-sm font-semibold text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
    </div>
  );
}

export function TrustBadges() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.trust-badge', {
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 20,
        scale: 0.9,
        stagger: STAGGER.NORMAL,
        duration: getDuration(0.5),
        ease: 'power3.out',
      });
    });
    return () => ctx.revert();
  }, { scope: ref });

  return (
    <Card ref={ref as never} className="bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="flex flex-col md:flex-row">
        <Badge icon={Shield} label="SSL Secured" description="Koneksi aman terenkripsi" />
        <Badge icon={Lock} label="Secure Checkout" description="Pembayaran terproteksi" />
        <Badge icon={CreditCard} label="Payment Protected" description="Transaksi dijamin aman" />
        <Badge icon={Headphones} label="24/7 Support" description="Bantuan selalu tersedia" />
      </div>
    </Card>
  );
}
