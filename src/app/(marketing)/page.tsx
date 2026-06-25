import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { Metadata } from "next";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { PageTransition } from "@/components/animations";
import { HeroClient } from "./HeroClient";
import { ServicesClient } from "./ServicesClient";

export const metadata: Metadata = {
  title: "Sunday Vibes - One-stop Creative Platform Surabaya & Tuban",
  description: "Platform digital kreatif & layanan dokumentasi di Surabaya dan Tuban. Event organizer, produk digital, sewa alat, design, coding, WordPress, dan foto profesional.",
  keywords: [
    "event organizer",
    "event organizer Surabaya",
    "event organizer Tuban",
    "sewa kamera Surabaya",
    "sewa kamera Tuban",
    "jasa foto wisuda",
    "jasa design grafis",
    "pembuatan website",
    "digital product",
    "sewa alat",
    "design",
    "coding",
    "wordpress",
    "foto",
    "surabaya",
    "tuban"
  ],
};

export default async function Home() {
  const payload = await getPayload({ config: configPromise });

  // Parallelize independent queries (was sequential: services → testimonials → global)
  const [servicesResult, testimonialsResult, homepageGlobal] = await Promise.all([
    payload.find({
      collection: "services",
      sort: "createdAt",
      limit: 6,
      select: ["id", "title", "slug", "category", "description", "hero_image", "createdAt"] as any,
    }),
    payload.find({
      collection: "testimonials",
      limit: 10,
      depth: 1,
    }) as Promise<any>,
    payload.findGlobal({ slug: "homepage" }) as Promise<any>,
  ]);

  const services = servicesResult.docs;
  const serializedTestimonials = testimonialsResult.docs.map((doc: any) => ({
    id: doc.id,
    client_name: doc.client_name,
    company: doc.company,
    content: doc.content,
    rating: doc.rating,
    avatar: doc.avatar ? { url: doc.avatar.url, alt: doc.avatar.alt } : undefined,
  }));

  return (
    <PageTransition>
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-background font-sans selection:bg-primary/20 selection:text-primary">

      {/* Hero Section */}
      <main className="flex-1 flex items-center pt-20 relative">
        <HeroClient homepageGlobal={homepageGlobal} />
      </main>

      {/* Services Overview Section */}
      <ServicesClient services={services} />

      {/* Testimonials */}
      {serializedTestimonials.length > 0 && (
        <TestimonialCarousel testimonials={serializedTestimonials} />
      )}

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
    </PageTransition>
  );
}
