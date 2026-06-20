import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export default async function Home() {
  const payload = await getPayload({ config: configPromise });
  const { docs: services } = await payload.find({
    collection: "services",
    sort: "createdAt",
    limit: 6,
  });

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-background font-sans selection:bg-primary/20 selection:text-primary">
      
      {/* Hero Section */}
      <main className="flex-1 flex items-center pt-20 relative">
        
        {/* Background Accents based on PRD colors */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent dark:bg-stone-800/50 -z-10 [clip-path:polygon(20%_0%,100%_0%,100%_100%,0%_100%)]" />
        <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-primary/10 blur-[100px] mix-blend-multiply dark:mix-blend-screen -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[10%] right-[30%] w-[30vw] h-[30vw] rounded-full bg-secondary/10 blur-[100px] mix-blend-multiply dark:mix-blend-screen -z-10 animate-pulse" style={{ animationDuration: '12s' }} />

        <div className="container mx-auto px-6 py-12 lg:py-24 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left: Copy */}
          <div className="flex flex-col items-start max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-primary border border-primary/20 font-semibold text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              One-stop creative platform
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-foreground leading-[1.05] mb-6">
              Karya terbaik,<br />
              <span className="text-primary">tanpa pusing.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-stone-500 dark:text-stone-400 leading-relaxed mb-10">
              Dari konsep event hingga foto produk yang siap publish. Sunday Vibes menyatukan seluruh kebutuhan kreatif dan teknis Anda dalam satu ekosistem yang terintegrasi, transparan, dan profesional.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button size="lg" className="rounded-full h-14 px-8 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_10px_40px_-10px_rgba(245,158,11,0.5)] hover:-translate-y-1 transition-all duration-300">
                <Link href="/layanan">Eksplorasi Layanan</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg font-bold border-2 border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors duration-300">
                <Link href="/portfolio">Lihat Portfolio</Link>
              </Button>
            </div>
            
            {/* Trust Markers */}
            <div className="mt-12 flex items-center gap-6 pt-8 border-t border-stone-200 dark:border-stone-800 w-full">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-stone-900 bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-xs font-bold text-stone-500 z-[4] relative">
                    {i === 4 ? '+50' : ''}
                  </div>
                ))}
              </div>
              <div className="text-sm font-medium text-stone-500 dark:text-stone-400">
                Dipercaya oleh 50+ klien lokal & nasional
              </div>
            </div>
          </div>
          
          {/* Right: Signature Visual */}
          <div className="relative flex items-center justify-center h-[500px] lg:h-[600px] w-full">
            {/* Central Badge */}
            <div className="relative z-20 w-72 h-72 sm:w-80 sm:h-80 bg-white dark:bg-stone-900 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-stone-100 dark:border-stone-800 flex items-center justify-center p-12 hover:-translate-y-2 hover:shadow-[0_30px_80px_-15px_rgba(245,158,11,0.15)] transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/50 to-transparent rounded-[2.5rem] opacity-50" />
              <Image
                src="/assets/logo-black-transparent.webp"
                alt="Sunday Vibes"
                width={200}
                height={200}
                className="dark:invert object-contain group-hover:scale-105 transition-transform duration-500 relative z-10"
                priority
              />
            </div>

            {/* Floating Service Cards */}
            <div className="absolute top-[10%] right-[10%] z-30 bg-white dark:bg-stone-800 p-4 rounded-2xl shadow-xl border border-stone-100 dark:border-stone-700 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 hover:scale-105 transition-transform cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m8 17 4 4 4-4"></path></svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">Digital Products</div>
                  <div className="text-xs text-stone-500">Ready to publish</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-[20%] left-[5%] z-30 bg-white dark:bg-stone-800 p-4 rounded-2xl shadow-xl border border-stone-100 dark:border-stone-700 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 hover:scale-105 transition-transform cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">Photography</div>
                  <div className="text-xs text-stone-500">Professional Studio</div>
                </div>
              </div>
            </div>

            <div className="absolute top-[60%] right-[-5%] z-30 bg-white dark:bg-stone-800 p-4 rounded-2xl shadow-xl border border-stone-100 dark:border-stone-700 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700 hover:scale-105 transition-transform cursor-pointer hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stone-900 dark:bg-stone-100 flex items-center justify-center text-white dark:text-stone-900">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">Web & App</div>
                  <div className="text-xs text-stone-500">Custom Dev</div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>

      {/* Services Overview Section */}
      <section className="py-24 bg-white dark:bg-stone-950 relative z-10" id="services">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">Layanan Kami</h2>
            <p className="text-lg text-stone-500 dark:text-stone-400">Solusi lengkap untuk kebutuhan kreatif dan digital Anda.</p>
          </div>

          {services.length === 0 ? (
            <div className="text-center py-12 bg-stone-50 dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800">
              <p className="text-xl text-stone-500 dark:text-stone-400 font-medium">Layanan sedang disiapkan, nantikan update dari kami!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-12 lg:gap-24">
              {/* Service rows will go here */}
            </div>
          )}
        </div>
      </section>

      {/* Trust & Workflow Strip */}
      <section className="border-y border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 py-12 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="md:w-1/3">
              <h3 className="text-lg font-bold text-foreground mb-2">Kenapa Sunday Vibes?</h3>
              <p className="text-sm text-stone-500">Booking mudah, tracking transparan, dan hasil profesional dalam satu dashboard.</p>
            </div>
            <div className="flex gap-12 text-sm font-medium text-stone-500">
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl font-black text-primary">1</span>
                <span>Pilih Layanan</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl font-black text-secondary">2</span>
                <span>Briefing & Deal</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl font-black text-foreground">3</span>
                <span>Terima Hasil</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
