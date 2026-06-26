import { test, expect } from '@playwright/test';

const pages = [
  { path: '/', title: /Sunday Vibes/ },
  { path: '/blog', title: /Blog/i },
  { path: '/portfolio', title: /Portfolio/i },
  { path: '/produk-digital', title: /Produk Digital/i },
];

for (const { path, title } of pages) {
  test(`SEO tags on ${path}`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.ok()).toBeTruthy();

    // Title present and matches
    await expect(page).toHaveTitle(title);

    // Meta description exists
    const desc = page.locator('meta[name="description"]');
    await expect(desc).toHaveAttribute('content', /.+/);

    // Open Graph basics
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);

    // Canonical or og:url present
    const canonical = page.locator('link[rel="canonical"]');
    const ogUrl = page.locator('meta[property="og:url"]');
    const hasCanonical = (await canonical.count()) > 0;
    const hasOgUrl = (await ogUrl.count()) > 0;
    expect(hasCanonical || hasOgUrl).toBeTruthy();

    // Viewport meta
    await expect(page.locator('meta[name="viewport"]')).toBeAttached();
  });
}
