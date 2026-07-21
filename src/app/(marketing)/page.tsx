import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { Metadata } from "next";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { PageTransition } from "@/components/animations";
import { WorkflowStrip } from "@/components/WorkflowStrip";
import { ReviewSchema } from "@/components/seo/ReviewSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { HeroClient } from "./HeroClient";
import { ServicesClient } from "./ServicesClient";

export const metadata: Metadata = {
  title: "Sunday Vibes | Premium Digital Growth & Systems Agency",
  description: "Mitra pertumbuhan digital strategis dan otomatisasi sistem bisnis. Melayani optimasi konversi, AI chatbot integration, visual branding, custom Next.js/WordPress development, dan cloud IT infrastructure.",
  keywords: [
    "digital growth agency",
    "systems automation agency",
    "business automation",
    "ai chatbot bisnis",
    "conversion rate optimization",
    "jasa seo surabaya",
    "jasa pembuat website",
    "custom web app",
    "event organizer surabaya",
    "sewa kamera surabaya",
    "sunday vibes agency"
  ],
};

export default async function Home() {
  // Minimal shapes for just the fields consumed here (payload-types.ts is not
  // generated locally — these avoid `any` without pretending full schema knowledge).
  interface ServiceDoc {
    id: string | number;
    title: string;
    slug: string;
    category?: string;
    description: string;
    hero_image?: { url?: string } | null;
  }
  interface TestimonialDoc {
    id: string | number;
    client_name: string;
    company?: string;
    content: string;
    rating?: number;
    avatar?: { url?: string; alt?: string } | null;
  }
  interface FindResult<T> { docs: T[] }
  interface HomepageGlobal {
    heroHeadline?: string;
    heroSubtext?: string;
    [key: string]: unknown;
  }

  let servicesResult: FindResult<ServiceDoc> = { docs: [] }
  let testimonialsResult: FindResult<TestimonialDoc> = { docs: [] }
  let homepageGlobal: HomepageGlobal = {}
  try {
    const payload = await getPayload({ config: configPromise });
    // Parallelize independent queries (was sequential: services → testimonials → global)
    ;[servicesResult, testimonialsResult, homepageGlobal] = await Promise.all([
      payload.find({
        collection: "services",
        sort: "createdAt",
        limit: 6,
        depth: 1,
      }) as unknown as Promise<FindResult<ServiceDoc>>,
      payload.find({
        collection: "testimonials",
        limit: 10,
        depth: 1,
      }) as unknown as Promise<FindResult<TestimonialDoc>>,
      payload.findGlobal({ slug: "homepage" }) as unknown as Promise<HomepageGlobal>,
    ]);
  } catch {
    // CI / offline build without DB — render empty marketing shell.
  }

  const services = servicesResult.docs.map((doc) => ({
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    category: doc.category,
    description: doc.description,
    hero_image: doc.hero_image && typeof doc.hero_image === "object" && doc.hero_image.url
      ? { url: doc.hero_image.url }
      : null,
  }));
  const serializedTestimonials = testimonialsResult.docs.map((doc) => ({
    id: String(doc.id),
    client_name: doc.client_name,
    company: doc.company,
    content: doc.content,
    rating: Number(doc.rating) || 0,
    avatar: doc.avatar?.url ? { url: doc.avatar.url, alt: doc.avatar.alt } : undefined,
  }));

  // Rich-result schema: feed top testimonials as Reviews + aggregate rating.
  const ratings: number[] = serializedTestimonials
    .map((t) => Number(t.rating))
    .filter((r) => r > 0);
  const aggregateRating = ratings.length > 0
    ? { ratingValue: ratings.reduce((a, b) => a + b, 0) / ratings.length, reviewCount: ratings.length }
    : undefined;
  const reviewSchemaData = serializedTestimonials.slice(0, 5).map((t) => ({
    author: t.client_name,
    rating: Number(t.rating),
    reviewBody: t.content,
    datePublished: new Date().toISOString().slice(0, 10),
  }));

  return (
    <PageTransition>
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-background font-sans selection:bg-primary/20 selection:text-primary">

      {/* Hero Section */}
      <section className="flex-1 flex items-center pt-20 relative">
        <HeroClient homepageGlobal={homepageGlobal} />
      </section>

      {/* Services Overview Section */}
      <ServicesClient services={services} />

      {/* Testimonials */}
      {serializedTestimonials.length > 0 && (
        <TestimonialCarousel testimonials={serializedTestimonials} />
      )}

      {/* Trust & Workflow Strip */}
      <WorkflowStrip />

    </div>
    <FAQSchema faqs={[
      { question: 'Apa saja layanan Sunday Vibes?', answer: 'Kami menyediakan Event Organizer, Produk Digital, Sewa Alat, Design, Coding, WordPress, dan Photography di Surabaya dan Tuban.' },
      { question: 'Berapa estimasi biaya layanan?', answer: 'Harga mulai dari Rp 25.000 untuk produk digital hingga Rp 5.000.000+ untuk project custom. Hubungi kami untuk konsultasi gratis.' },
      { question: 'Bagaimana cara booking layanan?', answer: 'Isi form booking online atau hubungi via WhatsApp. Tim kami akan menghubungi dalam 1x24 jam.' },
      { question: 'Apakah bisa bayar via QRIS?', answer: 'Ya, kami menerima pembayaran via QRIS (Gopay, OVO, Dana, ShopeePay, LinkAja) dan transfer bank.' },
    ]} />
    <ReviewSchema reviews={reviewSchemaData} aggregateRating={aggregateRating} />
    </PageTransition>
  );
}
