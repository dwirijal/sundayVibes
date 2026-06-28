# Booking Flow & Printable Contract

Purpose: document how a rental cart becomes a Payload booking, how payment is requested via dynamic QRIS, and how the signed A4 contract is printed.

Quick links
- `src/store/useCart.ts`
- `src/app/(marketing)/checkout/CheckoutContent.tsx`
- `src/app/(marketing)/kontrak/KontrakPageClient.tsx`
- `src/app/api/bookings/route.ts`
- `src/collections/Bookings.ts`
- `src/lib/qris.ts`
- `src/lib/email.ts`
- `src/app/globals.css`
- `src/proxy.ts`

## Cart state

`src/store/useCart.ts` exports a Zustand store with `persist` middleware.

| Field / Method | Type | Purpose |
| --------------- | ---- | ------- |
| `items` | `CartItem[]` | Line items in the cart |
| `addItem` | fn | Merges quantities for the same `id` |
| `removeItem` | fn | Removes by `id` |
| `updateQty` | fn | Sets quantity, drops if `<= 0` |
| `clearCart` | fn | Empties items and clears promo |
| `promoCode` | string \| null | Active promo code |
| `applyPromo` | fn | Validates against `PROMO_DICTIONARY` |
| `calculatePromoDiscount` | fn | Returns flat or percentage discount capped by `maxAmount` |

```ts
// src/store/useCart.ts:57
export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({ ... }),
    { name: 'sunday-vibes-cart' }
  )
)
```

`CartItem` shape:

```ts
export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  type: 'equipment' | 'digital' | 'photo';
}
```

`PROMO_DICTIONARY` is hard-coded in `src/store/useCart.ts:12`.

## Checkout page

`src/app/(marketing)/checkout/CheckoutContent.tsx` is a client component that fetches a product by `?id` or `?product`, collects customer details, posts to `/api/bookings`, then displays a dynamic QRIS.

Flow:
1. `useSearchParams()` reads `id` and `license` (`src/app/(marketing)/checkout/CheckoutContent.tsx:21`).
2. `useEffect` fetches `/api/products/${productId}?license=${license}` (`src/app/(marketing)/checkout/CheckoutContent.tsx:53`).
3. On submit, it POSTs to `/api/bookings` with:

```ts
{
  productId: product.id,
  type: product.type || 'product',
  license: product.license,
  amount: product.price,
  customer: formData,
}
```

4. After the POST it calls `generateDynamicQRIS(BASE_QRIS, product.price)` and shows the QR code (`src/app/(marketing)/checkout/CheckoutContent.tsx:78-101`).
5. The "Konfirmasi Pembayaran" button opens WhatsApp with a pre-filled message (`src/app/(marketing)/checkout/CheckoutContent.tsx:104-110`).

Note: `CheckoutContent.tsx` does not clear the cart or read from `useCart`; it is a single-product checkout.

## Kontrak / rental contract page

`src/app/(marketing)/kontrak/KontrakPageClient.tsx` is the rental-equipment contract flow. It reads the persisted Zustand cart and builds a two-page A4 contract.

Flow:
1. Loads `cartItems` and `promoCode` from `useCart` (`src/app/(marketing)/kontrak/KontrakPageClient.tsx:39-44`).
2. Syncs cart items into local `formData.items` (`src/app/(marketing)/kontrak/KontrakPageClient.tsx:51-60`).
3. On submit, it calculates total days, applies promo discount, posts to `/api/bookings`, then generates QRIS (`src/app/(marketing)/kontrak/KontrakPageClient.tsx:141-172`).
4. After payment confirmation (`handleConfirmPayment`), it opens WhatsApp and renders the printable contract.

Key form fields (`src/app/(marketing)/kontrak/KontrakPageClient.tsx:18-28`):

| Field | Purpose |
| ----- | ------- |
| `customerName` | Renter name |
| `customerId` | Used as local part of email (`customerId@sundayvibes.id`) |
| `customerPhone` | Phone number |
| `customerAddress` | Address |
| `startDate` / `endDate` | Rental period; `calculateDays()` returns `Math.max(1, diff)` |
| `items` | Selected equipment |
| `notes` | Optional notes |
| `collateral` | Radio choice: KTP / SIM / KARTU PELAJAR / PASPOR |

The contract is shown only when `isSubmitted === true`. It is rendered inside `.contract-sheet` and uses print classes from `src/app/globals.css`.

### Contract layout

The printed document (`src/app/(marketing)/kontrak/KontrakPageClient.tsx:209-338`) includes:
- Masthead: "SUNDAY VIBES" and contract number.
- Parties: renter details + collateral selection; owner "Dwi Rijal Giri Prabowo / Sunday Vibes"; rental period.
- Items table: name, qty, daily price, subtotal, and total.
- Signature lines for both parties.
- Page 2: `KETENTUAN PENYEWAAN` (7 numbered clauses) with signatures repeated.

Print trigger:

```tsx
// src/app/(marketing)/kontrak/KontrakPageClient.tsx:189-191
const handlePrint = () => {
  window.print();
};
```

The print button is hidden on print with `print:hidden` (`src/app/(marketing)/kontrak/KontrakPageClient.tsx:201`).

## Booking API

`src/app/api/bookings/route.ts` exposes one `POST` handler.

### POST /api/bookings

Accepts body:

```ts
{
  productId?: string;
  type?: 'product' | 'photo' | 'booking';
  license?: string;
  customer: { name: string; email: string; phone?: string };
  amount?: number;
  service?: string;
  date?: string;
  notes?: string;
}
```

Actions (`src/app/api/bookings/route.ts:8-141`):
1. Validates `customer.name` and `customer.email`.
2. Finds or creates a user in the `users` collection with `overrideAccess: true` and assigns `role: 'client'` (`src/app/api/bookings/route.ts:22-46`).
3. Auto-generates a password for new users (`src/app/api/bookings/route.ts:41`).
4. Looks up the related service by slug map, defaulting to `events` (`src/app/api/bookings/route.ts:71-88`).
5. Generates order ID: `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` (`src/app/api/bookings/route.ts:91`).
6. Creates a `bookings` document with `status: 'pending'`, `payment_status: 'unpaid'`.
7. Sends non-blocking confirmation + admin notification emails via `src/lib/email.ts`.
8. Returns `{ booking, order_id }` with status `201`.

This endpoint is public: all Payload operations use `overrideAccess: true` because the caller is not necessarily authenticated.

## Bookings collection

`src/collections/Bookings.ts` defines the schema.

| Field | Type | Required | Notes |
| ----- | ---- | -------- | ----- |
| `order_id` | text | yes | unique (`src/collections/Bookings.ts:42`) |
| `service_type` | relationship → `services` | yes | linked by slug in the API |
| `client` | relationship → `users` | yes | created/found in POST handler |
| `date` | date | yes | rental start / product purchase date |
| `status` | select | yes | `pending` (default), `confirmed`, `in_progress`, `completed`, `cancelled` |
| `notes` | textarea | no | stores item/service details |
| `amount` | number | yes | charged amount |
| `payment_status` | select | yes | `unpaid` (default), `partial`, `paid` |

Access control (`src/collections/Bookings.ts:8-37`):
- `read`: admins see all; authenticated clients see only their own; guests see nothing.
- `create`: requires authenticated user. The API bypasses this with `overrideAccess`.
- `update` / `delete`: admins only.

> ⚠️ Admin list shows the raw document `id` as the title (`admin.useAsTitle = 'id'`, `src/collections/Bookings.ts:6`), NOT the human-readable `order_id`. CMS editors see opaque ids in the bookings list — search by `order_id` field instead.

## QRIS generation

`src/lib/qris.ts` converts a static QRIS string into a dynamic one by injecting the amount before the country-code tag and recalculating the CRC.

```ts
// src/lib/qris.ts:22
export function generateDynamicQRIS(qrisString: string, amount: number): string {
  // validate, strip old CRC, switch point-of-initiation to '12',
  // inject tag 54 (amount), recalculate CRC16 CCITT (0x1021)
}
```

Validation rules (`src/lib/qris.ts:24-36`):
- String must contain `5802ID`.
- Amount must be a finite positive integer, capped at Rp 1.000.000.000.

The static base strings are hard-coded in `CheckoutContent.tsx:17` and `KontrakPageClient.tsx:38`.

## Email notifications

`src/lib/email.ts` uses Resend.

```ts
// src/lib/email.ts:3
const resend = new Resend(process.env.RESEND_API_KEY)
```

Functions:
- `sendBookingConfirmation(email, details)` — sent to the customer.
- `sendAdminNotification(details)` — sent to `admin@sundayvibes.com`.

Email sending is wrapped in a non-blocking try/catch in the booking API (`src/app/api/bookings/route.ts:109-131`).

## Print CSS

`src/app/globals.css:314-420` contains the print stylesheet.

Key rules:

```css
@page contract {
  size: A4;
  margin: 14mm 14mm 12mm;
}

@media print {
  .no-print,
  .print\:hidden { display: none !important; }

  .contract-sheet {
    margin: 0 !important;
    padding: 0 !important;
    max-width: none !important;
    width: auto !important;
    background: #fff !important;
    color: #111 !important;
    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }

  .contract-sheet,
  .contract-sheet * {
    color: #111 !important;
    background: transparent !important;
    border-color: #000 !important;
    box-shadow: none !important;
    text-shadow: none !important;
  }

  .page-break {
    break-before: page;
    page-break-before: always;
  }

  .avoid-break {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
```

The contract sheet is forced to black ink, white paper, hairline borders, and A4 page breaks.

## Env vars

| Name | Purpose | Where referenced |
| ---- | ------- | ---------------- |
| `RESEND_API_KEY` | Send booking emails via Resend | `src/lib/email.ts:3` |
| `PAYLOAD_SECRET` | Payload CMS auth / DB encryption | `payload.config.ts` (implied by Payload setup) |
| `DATABASE_URL` | PostgreSQL connection | `payload.config.ts` (implied by Payload setup) |
| `MIDTRANS_SERVER_KEY` / `MIDTRANS_CLIENT_KEY` | Not used by this flow; listed for completeness | README only |
| `FONNTE_API_KEY` | Not used by this flow; listed for completeness | README only |

## Pitfalls / gotchas

1. **Booking collection blocks guest creation by default.** `Bookings` access rules require an authenticated user for `create`, but the API bypasses them with `overrideAccess: true` (`src/app/api/bookings/route.ts:28-44`, `src/collections/Bookings.ts:25-28`). If that flag is ever removed, public checkout will fail.

2. **Service slug is forced server-side.** The API maps known slugs (`events`, `digital`, `sewa-alat`, `design`, `coding`, `wordpress`, `photography`) and falls back to `events` if none match (`src/app/api/bookings/route.ts:72-81`). The client cannot choose an arbitrary service slug.

3. **New users get auto-generated passwords.** The POST handler creates a user with `role: 'client'` and a random password (`src/app/api/bookings/route.ts:41`). There is no email to the user with this password; they cannot log in unless they use the dashboard auth flow separately.

4. **Checkout does not use the cart store.** `CheckoutContent.tsx` is single-product only and does not read `useCart`; clearing the cart there has no effect (`src/app/(marketing)/checkout/CheckoutContent.tsx:72-102`).

5. **Kontrak page clears the cart after payment confirmation.** `handleConfirmPayment` calls `clearCart()` after setting `isSubmitted` (`src/app/(marketing)/kontrak/KontrakPageClient.tsx:174-178`). If the user refreshes the printed contract page after this, the cart is already empty but the form state remains in component state.

6. **Email failures are non-blocking.** Any Resend error is caught and logged; the API still returns `201` (`src/app/api/bookings/route.ts:109-131`).

7. **QRIS amount cap is Rp 1.000.000.000.** `generateDynamicQRIS` rejects larger amounts and non-integers (`src/lib/qris.ts:29-34`).

8. **Static QRIS base strings are duplicated.** The same `BASE_QRIS` literal exists in both `CheckoutContent.tsx:17` and `KontrakPageClient.tsx:38`; updating one requires updating the other.

9. **Print styles override dark mode.** The `@media print` block forces `#111` text and `#fff` background on `.contract-sheet` and its descendants (`src/app/globals.css:350-356`), so the printed contract always looks the same regardless of the active theme.

10. **CSRF middleware bypasses `/api/auth/` but still checks `/api/bookings`.** `src/proxy.ts:11-35` enforces origin matching for mutating API requests, including the `POST` to `/api/bookings`. Ensure the checkout/kontrak pages send the correct `Origin` header; otherwise the request will receive `403 CSRF validation failed`.
