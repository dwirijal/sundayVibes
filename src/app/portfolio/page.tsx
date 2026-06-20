import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PortfolioPage() {
  const tiktoks = [
    { url: "https://www.tiktok.com/@sundayvibes._/video/7648357287551192341", id: "7648357287551192341" },
    { url: "https://www.tiktok.com/@sundayvibes._/video/7648366641457450260", id: "7648366641457450260" },
    { url: "https://www.tiktok.com/@sundayvibes._/video/7648367069150530838", id: "7648367069150530838" }, // Note: Extracted the actual IDs for a cleaner look
    { url: "https://www.tiktok.com/@sundayvibes._/video/7648367468167384342", id: "7648367468167384342" }
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-primary border border-primary/20 font-semibold text-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Our Works
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Dokumentasi Event & Trip</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Beberapa hasil dokumentasi event dan perjalanan yang telah kami selesaikan.
          </p>
        </div>

        {/* Clean Video-Only Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {tiktoks.map((tt, i) => (
            <div key={i} className="group relative aspect-[9/16] bg-muted rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border">
              
              {/* Direct Iframe to TikTok's v2 embed endpoint (Cleaner, no bloated scripts) */}
              <iframe 
                src={`https://www.tiktok.com/embed/v2/${tt.id}?lang=en-US`}
                className="w-full h-full border-0 absolute top-[-45px] scale-[1.05]" // Shifted up and scaled slightly to hide TikTok's native header/footer
                title="TikTok Video"
                allow="encrypted-media"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts allow-top-navigation allow-same-origin"
              />
              
              {/* Invisible overlay link to make the entire card clickable, blocking iframe interactions if desired */}
              <a 
                href={tt.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 z-20 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/60 to-transparent"
              >
                <div className="text-white text-sm font-bold flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md rounded-full py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  Tonton Penuh
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="rounded-full h-14 px-8 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_10px_40px_-10px_rgba(245,158,11,0.5)]">
            <Link href="/kontak">Diskusikan Proyek Anda</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
