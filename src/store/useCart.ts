import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PromoType = 'flat' | 'percentage';

export interface PromoDefinition {
  type: PromoType;
  value: number;
  maxAmount?: number;
}

export const PROMO_DICTIONARY: Record<string, PromoDefinition> = {
  WISUDA2026: { type: 'flat', value: 50000 },
  SUNDAYVIBES: { type: 'percentage', value: 10, maxAmount: 100000 },
  STUDENT: { type: 'percentage', value: 15, maxAmount: 50000 },
};

export function calculatePromoDiscount(code: string | null, subtotal: number): number {
  if (!code || subtotal <= 0) return 0;

  const promo = PROMO_DICTIONARY[code.toUpperCase()];
  if (!promo) return 0;

  if (promo.type === 'flat') {
    return Math.min(subtotal, promo.value);
  }

  if (promo.type === 'percentage') {
    const rawDiscount = Math.floor(subtotal * (promo.value / 100));
    return promo.maxAmount ? Math.min(rawDiscount, promo.maxAmount) : rawDiscount;
  }

  return 0;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  type: 'equipment' | 'digital' | 'photo';
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  promoCode: string | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, qty: i.qty + item.qty } : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQty: (id, qty) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? { ...i, qty } : i))
            .filter((i) => i.qty > 0),
        })),
      clearCart: () => set({ items: [], promoCode: null }),
      promoCode: null,
      applyPromo: (code) => {
        const promo = PROMO_DICTIONARY[code.toUpperCase()];
        if (promo) {
          set({ promoCode: code.toUpperCase() });
          return true;
        }
        return false;
      },
      removePromo: () => set({ promoCode: null }),
      totalItems: () => get().items.reduce((total, item) => total + item.qty, 0),
      totalPrice: () =>
        get().items.reduce((total, item) => total + item.price * item.qty, 0),
    }),
    {
      name: 'sunday-vibes-cart',
    }
  )
);
