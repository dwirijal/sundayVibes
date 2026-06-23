# Homepage Services Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the "Services Overview" section on the Homepage using an alternating row layout and dynamic data from Payload CMS.

**Architecture:** We will modify the existing `src/app/page.tsx` Server Component to fetch data directly using Payload's Local API (`getPayload`) and map over the `services` collection to render the alternating rows layout.

**Tech Stack:** Next.js 16.2.9 (App Router), React 19, Payload CMS 3.85.1, Tailwind CSS v4, Shadcn UI.

## Global Constraints
- Use Next.js Server Components.
- Use `getPayload` from `@payloadcms/next/utilities` for data fetching.
- Use existing Tailwind configuration and custom CSS variables from `src/app/globals.css`.
- Ensure mobile responsiveness (mobile-first approach).

---

### Task 1: Payload Setup & Data Fetching in Homepage

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `services` collection from Payload CMS.
- Produces: `services` array data available within the `Home` component.

- [ ] **Step 1: Add imports and data fetching logic**

Modify `src/app/page.tsx` to include the Payload imports and fetch data.

```tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export default async function Home() {
  const payload = await getPayload({ config: configPromise });
  const { docs: services } = await payload.find({
    collection: 'services',
    sort: 'createdAt', // or any preferred sorting
    limit: 6,
  });

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-background font-sans selection:bg-primary/20 selection:text-primary">
      {/* Existing Hero Section code remains untouched here */}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: setup payload data fetching for services on homepage"
```

---

### Task 2: Implement Empty State & Structure

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `services` array from Task 1.

- [ ] **Step 1: Add the Services Section container and Empty State**

Add the section below the Hero (and below the "Trust & Workflow Strip") in `src/app/page.tsx`.

```tsx
      {/* Trust & Workflow Strip remains untouched here */}

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

    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add services section container and empty state"
```

---

### Task 3: Implement Alternating Rows Layout

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `services` array. Maps over it to render alternating UI rows.

- [ ] **Step 1: Map through services to create the alternating rows**

Replace `{/* Service rows will go here */}` in `src/app/page.tsx` with the mapping logic.

```tsx
              {services.map((service, index) => {
                const isEven = index % 2 !== 0; // 0-indexed, so 1, 3, 5 are "even" in layout terms (reversed)
                
                // Helper to safely get image URL if it exists
                const imageUrl = service.hero_image && typeof service.hero_image === 'object' && service.hero_image.url 
                  ? service.hero_image.url 
                  : null;

                return (
                  <div key={service.id} className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-16 p-8 lg:p-12 rounded-[2.5rem] ${isEven ? 'bg-stone-50 dark:bg-stone-900' : 'bg-white dark:bg-stone-950 border border-stone-100 dark:border-stone-800'}`}>
                    
                    {/* Media Block */}
                    <div className="w-full lg:w-1/2 aspect-[4/3] relative rounded-3xl overflow-hidden shadow-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                      ) : (
                        <div className="text-6xl opacity-20">✨</div>
                      )}
                    </div>

                    {/* Content Block */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 uppercase tracking-wider">
                        {service.category}
                      </div>
                      
                      <h3 className="text-3xl lg:text-4xl font-black text-foreground mb-4 leading-tight">
                        {service.title}
                      </h3>
                      
                      <p className="text-lg text-stone-500 dark:text-stone-400 mb-8 leading-relaxed">
                        {service.description}
                      </p>
                      
                      <Button asChild size="lg" className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90 dark:bg-white dark:text-stone-950">
                        <Link href={`/layanan/${service.slug}`}>Lihat Detail</Link>
                      </Button>
                    </div>
                    
                  </div>
                );
              })}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: implement alternating rows layout for services"
```

---

### Task 4: Fix Button Type Error in Layanan Pages

**Files:**
- Modify: `src/app/page.tsx` (the button we just added)

**Interfaces:**
- Due to the `asChild` typing issue in `src/components/ui/button.tsx` (caught earlier in the build), we must ensure the button we just added in Task 3 doesn't use `asChild` to avoid breaking the build, or we use it properly. Since we removed `asChild` globally earlier, we need to make sure we don't re-introduce it here.

- [ ] **Step 1: Ensure Button component doesn't use asChild if it's broken**

Update the Button code in `src/app/page.tsx` from Task 3 to wrap the Link directly without `asChild`.

```tsx
                      <Button size="lg" className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90 dark:bg-white dark:text-stone-950">
                        <Link href={`/layanan/${service.slug}`}>Lihat Detail</Link>
                      </Button>
```

- [ ] **Step 2: Build the project to verify it passes**

Run: `npm run build` or `bun run build`
Expected: Passes without TypeErrors.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "fix: remove asChild from Button to prevent type errors"
```
