# Remaining Pages Implementation Plan

**Goal:** Implement the remaining P0/P1 pages: Sewa Alat (full), Digital (full), Photography, Tentang, Foto marketplace, and Booking form.

**Architecture:** Follow existing design patterns from events/design/coding pages. All pages are Next.js Server Components with Tailwind CSS v4 + shadcn/ui.

**Tech Stack:** Next.js 16.2.9 (App Router), React 19, Tailwind CSS v4, Shadcn UI, lucide-react icons.

## Global Constraints
- Use existing Tailwind configuration and CSS variables from `src/app/globals.css`.
- Use the `Button` component from `src/components/ui/button.tsx`.
- Mobile-first responsive design.
- All CTA buttons use `next/link` pointing to `/booking?service=<slug>`.
- Follow the Hero + Packages/Content + CTA pattern from existing pages.
- Use `text-muted-foreground` instead of hardcoded `text-stone-500`.
- Use `bg-card` / `border-border` instead of hardcoded stone colors.
- Use `bg-foreground` for dark CTA sections (not hardcoded `bg-stone-900`).

---

### Task 1: Sewa Alat Page (Full Implementation)

**Files:**
- Modify: `src/app/layanan/sewa-alat/page.tsx`

**Interfaces:**
- Produces: Full `/layanan/sewa-alat` page replacing the 17-line stub.

- [ ] **Step 1: Implement the Sewa Alat page**

Replace the stub with a full page following the pattern from events/design. Include:
- Hero section with 🎥 icon, blue accent color
- 3 rental packages: Paket Vlogger (Rp 350rb/hari), Paket Production (Rp 1.2jt/hari, popular), Drone & Aerial (Rp 800rb/hari)
- Each package has equipment list with Check icons
- CTA section at bottom linking to `/booking?service=sewa-alat`

Use the code from the existing plan (Task 3 Step 1) but update:
- Replace `text-stone-500` → `text-muted-foreground`
- Replace `bg-white dark:bg-stone-900` → `bg-card`
- Replace `border-stone-200 dark:border-stone-800` → `border-border`
- Replace `bg-stone-50 dark:bg-stone-950` → `bg-muted/50`
- Replace `text-stone-600 dark:text-stone-400` → `text-muted-foreground`

- [ ] **Step 2: Commit**

```bash
git add src/app/layanan/sewa-alat/page.tsx
git commit -m "feat: implement full sewa alat page with rental packages"
```

---

### Task 2: Digital Products Page (Full Implementation)

**Files:**
- Modify: `src/app/layanan/digital/page.tsx`

**Interfaces:**
- Produces: Full `/layanan/digital` page replacing the 17-line stub.

- [ ] **Step 1: Implement the Digital Products page**

Replace the stub with a full page. Include:
- Hero section with 📱 icon, amber accent color
- 3 products: Lightroom Presets (Rp 149rb), Notion OS Template (Rp 249rb, popular), Social Media Bundle (Rp 199rb)
- Each product has features list with Check icons
- Buy buttons link to `#` (no checkout yet)

Use the code from the existing plan (Task 3 Step 2) but update color classes same as Task 1.

- [ ] **Step 2: Commit**

```bash
git add src/app/layanan/digital/page.tsx
git commit -m "feat: implement full digital products page"
```

---

### Task 3: Tentang (About) Page

**Files:**
- Create: `src/app/tentang/page.tsx`

**Interfaces:**
- Produces: Static `/tentang` page.

- [ ] **Step 1: Create the About page**

Create `src/app/tentang/page.tsx` with:
- Hero section: "Tentang Sunday Vibes" headline
- Story section: Brief about the company (one-stop creative platform Surabaya)
- Values section: 4 cards — Good Vibes Only, Transparan, Kreatif, Andal (from PRD section 2.3)
- Team/stats section: "50+ klien", "100+ project", etc.
- CTA section linking to `/kontak`

Design: Use primary accent color, follow Hero + Content + CTA pattern.

- [ ] **Step 2: Commit**

```bash
git add src/app/tentang/page.tsx
git commit -m "feat: implement about page"
```

---

### Task 4: Foto Marketplace Page

**Files:**
- Create: `src/app/foto/page.tsx`

**Interfaces:**
- Produces: Static `/foto` marketplace page (hardcoded data for now, will be dynamic later).

- [ ] **Step 1: Create the Foto marketplace page**

Create `src/app/foto/page.tsx` with:
- Hero section: "Foto Marketplace" headline, subtitle about professional photos
- Filter bar: Category pills (Semua, Wedding, Product, Portrait, Event, Nature)
- Photo grid: 8-12 placeholder cards with:
  - Aspect ratio 4:3 or 3:2
  - Gradient background as placeholder (no real images yet)
  - Category badge overlay
  - Price tag (Standard/Extended license)
  - Hover effect showing "Lihat Detail" overlay
- CTA section: "Butuh foto custom?" linking to `/booking?service=photography`

Design: Use primary accent, grid layout `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`.

- [ ] **Step 2: Commit**

```bash
git add src/app/foto/page.tsx
git commit -m "feat: implement foto marketplace page"
```

---

### Task 5: Booking Form Page

**Files:**
- Create: `src/app/booking/page.tsx`

**Interfaces:**
- Produces: `/booking` page with multi-step form (client-side component).

- [ ] **Step 1: Create the Booking form page**

Create `src/app/booking/page.tsx` with:
- Hero: "Booking Layanan" headline
- Multi-step form (3 steps):
  - Step 1: Service selection (radio cards for each service)
  - Step 2: Details (date picker placeholder, budget range, description textarea)
  - Step 3: Contact info (name, email/WhatsApp, notes)
- Progress indicator showing current step
- "use client" directive needed for form state
- Submit button → for now just shows success message (no backend yet)
- Read `?service=` query param to pre-select service

Design: Use primary accent, rounded cards for service selection, clean form inputs matching kontak page style.

- [ ] **Step 2: Commit**

```bash
git add src/app/booking/page.tsx
git commit -m "feat: implement booking form page"
```

---

### Task 6: Build Verification & Push

- [ ] **Step 1: Run build**

```bash
cd /root/sunday-vibes && npm run build
```

Fix any TypeScript errors.

- [ ] **Step 2: Push and update PR**

```bash
git push origin feat/services-homepage
```
