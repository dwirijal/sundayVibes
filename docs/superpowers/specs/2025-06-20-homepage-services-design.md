# Homepage Services Overview Design

## Purpose
Implement the "Services Overview" section on the Homepage (`/`), displaying the core offerings of Sunday Vibes. The layout will use an "Alternating Rows" design and data will be fetched dynamically from Payload CMS.

## Architecture & Data Flow
- **Location:** `src/app/page.tsx`
- **Data Source:** Payload CMS `services` collection.
- **Fetching Strategy:** Use Payload's Local API (`getPayload()`) directly within the Next.js App Router Server Component. This avoids unnecessary HTTP requests and leverages Next.js server-side rendering for optimal performance and SEO.
- **Data Types:** Expects `Service` objects containing `title`, `slug`, `category`, `description`, and optionally `hero_image` (relation to `Media` collection).

## UI / UX Design
- **Layout Pattern:** "Alternating Rows" (Zig-zag pattern).
  - Row 1 (Odd): Image Left, Content Right.
  - Row 2 (Even): Content Left, Image Right.
  - This pattern continues for all fetched services.
- **Backgrounds:** Alternating subtle background colors to distinguish sections (e.g., White and `stone-50` / Dark mode equivalents).
- **Content Block:**
  - Category Badge (e.g., using primary or secondary color).
  - Title (`H2` or `H3`, Bold, `Plus Jakarta Sans`).
  - Description paragraph (muted text, `Inter`).
  - CTA Button: "Lihat Detail" linking to `/layanan/[slug]`.
- **Media Block:**
  - If `hero_image` is present: Render using `next/image` using the Payload media URL.
  - Fallback: A styled thematic placeholder (e.g., a colored block with an icon matching the category) if the CMS image is missing.
- **Animation:** Subtle fade-in/slide-up animations on scroll (can use standard CSS or tailwind animations).

## Error Handling & Edge Cases
- **No Data:** If the database query returns 0 services, render a friendly empty state ("Layanan sedang disiapkan, nantikan update dari kami!").
- **Missing Images:** Fallback placeholders ensure the UI doesn't break if a CMS admin forgets to upload a hero image.

## Testing Strategy
- Verify that alternating classes (flex-row vs flex-row-reverse) apply correctly based on index.
- Ensure the Local API successfully fetches data without throwing connection errors.
- Confirm that the CTA button links point to the correct dynamic route (`/layanan/[slug]`).
