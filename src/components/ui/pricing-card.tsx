import { Check } from 'lucide-react';
import { Button } from './button';

export interface PricingFeature {
  text: string;
}

export interface PricingPackage {
  name: string;
  price: string;
  description?: string;
  features: PricingFeature[];
  isPopular?: boolean;
}

export interface PricingCardProps {
  pkg: PricingPackage;
  onBook: () => void;
  isHighlighted?: boolean;
}

export function PricingCard({ pkg, onBook, isHighlighted }: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl border-2 p-6 transition-all ${
        isHighlighted || pkg.isPopular
          ? 'border-primary bg-primary/5 shadow-lg scale-105'
          : 'border-border bg-card hover:border-primary/50'
      }`}
    >
      {pkg.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold">
          PALING POPULER
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
        <div className="text-4xl font-black text-primary mb-2">{pkg.price}</div>
        {pkg.description && (
          <p className="text-sm text-muted-foreground">{pkg.description}</p>
        )}
      </div>

      <ul className="space-y-3 mb-6">
        {pkg.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm text-muted-foreground">{feature.text}</span>
          </li>
        ))}
      </ul>

      <Button
        onClick={onBook}
        variant={isHighlighted || pkg.isPopular ? 'default' : 'outline'}
        className="w-full"
      >
        Booking Sekarang
      </Button>
    </div>
  );
}
