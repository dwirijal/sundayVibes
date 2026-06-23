"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/store/useCart";

export function DetailClient({ item }: { item: { slug?: string; name: string; price: number; stock: number } }) {
  const addItem = useCart((state) => state.addItem);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({
      id: item.slug,
      name: item.name,
      price: item.price,
      qty: 1,
      type: "equipment"
    });
    
    alert(`${item.name} berhasil ditambahkan ke keranjang (halaman kontrak).`);
    
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="bg-card border border-border rounded-3xl p-5 sm:p-6 mb-8 lg:mb-12 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between relative z-20">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="w-10 h-10 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
          <Check className="w-5 h-5" />
        </div>
        <div>
          <p className="font-bold text-foreground">Tersedia</p>
          <p className="text-sm text-muted-foreground">{item.stock} unit ready stock</p>
        </div>
      </div>
      
      <div className="w-full sm:w-auto mt-2 sm:mt-0">
        <Button 
          onClick={handleAddToCart}
          disabled={isAdding}
          size="lg" 
          className="w-full sm:w-auto rounded-full px-6 font-bold text-base h-12 shadow-sm"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {isAdding ? "Ditambahkan..." : "+ Keranjang Sewa"}
        </Button>
      </div>
    </div>
  );
}
