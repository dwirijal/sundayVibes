"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface Review {
  author_name: string;
  rating: number;
  text: string;
  time: number;
}

interface ReviewsData {
  rating: number;
  user_ratings_total: number;
  reviews: Review[];
  source?: string;
}

export function GoogleReviews() {
  const [data, setData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load reviews", err);
        setLoading(false);
      });
  }, []);

  if (loading || !data || !data.reviews) {
    return (
      <div className="w-full flex justify-center py-12">
        <div className="animate-pulse flex gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-6 h-6 rounded-full bg-muted"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Kata Klien Kami</h2>
          <p className="text-muted-foreground">Rating & ulasan langsung dari Google Maps</p>
        </div>
        
        <div className="bg-card border border-border px-8 py-4 rounded-2xl flex items-center gap-6 shadow-sm">
          <div className="text-4xl font-black text-foreground">{data.rating.toFixed(1)}</div>
          <div>
            <div className="flex gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-5 h-5 ${star <= Math.round(data.rating) ? "fill-amber-500 text-amber-500" : "fill-muted text-muted"}`} 
                />
              ))}
            </div>
            <div className="text-sm font-semibold text-muted-foreground">
              Berdasarkan {data.user_ratings_total} ulasan
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.reviews.slice(0, 3).map((review, i) => (
          <div key={i} className="bg-card border border-border p-8 rounded-3xl hover:shadow-lg transition-shadow">
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-4 h-4 ${star <= review.rating ? "fill-amber-500 text-amber-500" : "fill-muted text-muted"}`} 
                />
              ))}
            </div>
            <p className="text-foreground/80 leading-relaxed mb-6 flex-grow line-clamp-4">
              &quot;{review.text}&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                {review.author_name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-sm text-foreground">{review.author_name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(review.time * 1000).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
