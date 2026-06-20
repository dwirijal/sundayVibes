# Static Service Pages Design

## Purpose
Design and implement the individual static service pages (`/layanan/events`, `/layanan/design`, `/layanan/sewa-alat`, `/layanan/digital`, `/layanan/coding`, `/layanan/wordpress`) as outlined in the PRD Phase 1 goals.

## Architecture
- **Approach:** Static Pages (individual Next.js App Router pages).
- **Location:** `src/app/layanan/<service-name>/page.tsx`.
- **Data Source:** Hardcoded content directly in the component for now, or fetching specific data from Payload CMS if needed, but the layout is statically defined per page. 

## UI/UX Component Layout
The layout will follow the "Hero + Packages + Booking CTA" structure (P0 priorities from PRD).

1. **Hero Section:**
   - Icon / Emoji representing the service.
   - Large bold title (e.g., "Event Organizer").
   - Short descriptive subtitle.
2. **Packages / Pricing Section (P0):**
   - 3-column grid (or 1-column on mobile) displaying pricing tiers (e.g., Bronze, Silver, Gold or Starter, Pro, Enterprise).
   - Each card includes: Package Name, Price, List of Features, and a CTA button ("Pilih Paket").
3. **CTA / Intake Section (P0):**
   - A final call to action directing users to the universal booking form (`/booking`) passing the service type as a parameter, or a prominent "Hubungi Kami via WhatsApp" button.

## Visual Design (Sunday Vibes Theme)
- Utilize the global CSS variables (`bg-background`, `text-foreground`, `primary`, `secondary`).
- Cards will have subtle shadows and rounded corners (`rounded-3xl` or `rounded-2xl`).
- Buttons will use the standard `Button` component from `shadcn/ui`.

## Error Handling & Testing
- Ensure mobile responsiveness (stacking columns on smaller screens).
- Verify all CTA links point to the correct routing paths (`/booking` or WhatsApp API).
