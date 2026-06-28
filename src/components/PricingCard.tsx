import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  originalPrice?: string;
  /** Accent color class for check icons (e.g. "text-primary", "text-secondary"). Default: "text-primary" */
  checkColor?: string;
  children: ReactNode;
}

export function PricingCard({
  name,
  description,
  price,
  features,
  highlighted,
  badge,
  originalPrice,
  checkColor = "text-primary",
  children,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col p-8 rounded-3xl border",
        highlighted
          ? "border-primary shadow-xl shadow-primary/10 bg-card"
          : "border-border bg-muted/50"
      )}
    >
      {badge && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
          {badge}
        </div>
      )}
      <h3 className="text-2xl font-bold text-foreground mb-2">{name}</h3>
      <p className="text-muted-foreground mb-6 text-sm flex-grow">
        {description}
      </p>
      <div className="flex flex-col mb-8">
        {originalPrice && (
          <span className="text-sm text-muted-foreground line-through decoration-destructive decoration-2">
            {originalPrice}
          </span>
        )}
        <div className="text-3xl font-black text-foreground">{price}</div>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-muted-foreground"
          >
            <Check className={cn("w-5 h-5 shrink-0", checkColor)} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {children}
    </div>
  );
}
