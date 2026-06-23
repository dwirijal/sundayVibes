import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  totalItems: () => number;
  totalPrice: () => number;
  promoCode: string | null;
  discountAmount: number;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      discountAmount: 0,
      addItem: (item) => set((state) => {
        const existing = state.items.find(i => i.id === item.id);
        if (existing) {
          return {
            items: state.items.map(i => 
              i.id === item.id ? { ...i, qty: i.qty + item.qty } : i
            )
          };
        }
        return { items: [...state.items, item] };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter(i => i.id !== id)
      })),
      updateQty: (id, qty) => set((state) => ({
        items: qty <= 0 
          ? state.items.filter(i => i.id !== id)
          : state.items.map(i => i.id === id ? { ...i, qty } : i)
      })),
      clearCart: () => set({ items: [], promoCode: null, discountAmount: 0 }),
      
      applyPromo: (code) => {
        // Simple promo engine logic
        const validPromos: Record<string, number> = {
          'WISUDA2026': 50000,
          'SUNDAYVIBES': 0.1, // 10% discount if < 1
          'STUDENT': 25000
        };
        
        const discount = validPromos[code.toUpperCase()];
        if (discount) {
          set({ promoCode: code.toUpperCase(), discountAmount: discount });
          return true;
        }
        return false;
      },
      
      removePromo: () => set({ promoCode: null, discountAmount: 0 }),
      totalItems: () => get().items.reduce((total, item) => total + item.qty, 0),
      totalPrice: () => get().items.reduce((total, item) => total + (item.price * item.qty), 0),
    }),
    {
      name: 'sunday-vibes-cart',
    }
  )
);
