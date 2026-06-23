import type { Metadata } from "next";
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { PageTransition } from "@/components/animations";
import { PortfolioClient } from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Portfolio - Sunday Vibes",
  description: "Lihat portfolio dan case study project Sunday Vibes. Event, design, photography, dan web development.",
};

export default async function PortfolioPage() {
  const payload = await getPayload({ config: configPromise })

  const projects = await payload.find({
    collection: 'projects',
    limit: 12,
    depth: 1,
    sort: '-createdAt',
  })

  const tiktoks = [
    { url: "https://www.tiktok.com/@sundayvibes._/video/7648357287551192341", id: "7648357287551192341" },
    { url: "https://www.tiktok.com/@sundayvibes._/video/7648366641457450260", id: "7648366641457450260" },
    { url: "https://www.tiktok.com/@sundayvibes._/video/7648367069150530838", id: "7648367069150530838" },
    { url: "https://www.tiktok.com/@sundayvibes._/video/7648367468167384342", id: "7648367468167384342" }
  ];

  return (
    <PageTransition>
      <main className="min-h-screen pt-32 pb-24 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <PortfolioClient projects={projects.docs} tiktoks={tiktoks} />
        </div>
      </main>
    </PageTransition>
  );
}
