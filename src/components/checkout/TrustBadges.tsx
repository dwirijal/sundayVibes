import { Shield, Lock, CreditCard, Headphones } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface BadgeProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
}

function Badge({ icon: Icon, label, description }: BadgeProps) {
  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <div className="p-2 rounded-full bg-primary/10">
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
  return (
    <Card className="bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="flex flex-col md:flex-row">
        <Badge
          icon={Shield}
          label="SSL Secured"
          description="Koneksi aman terenkripsi"
        />
        <Badge
          icon={Lock}
          label="Secure Checkout"
          description="Pembayaran terproteksi"
        />
        <Badge
          icon={CreditCard}
          label="Payment Protected"
          description="Transaksi dijamin aman"
        />
        <Badge
          icon={Headphones}
          label="24/7 Support"
          description="Bantuan selalu tersedia"
        />
      </div>
    </Card>
  );
}
