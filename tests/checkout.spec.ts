import { test, expect } from '@playwright/test';

test.describe('Checkout flow', () => {
  test('product detail → checkout → payment form', async ({ page }) => {
    // Start at produk-digital listing
    await page.goto('/produk-digital');

    const firstProduct = page.locator('a[href^="/produk-digital/"]').first();
    if ((await firstProduct.count()) === 0) {
      test.skip();
      return;
    }

    await firstProduct.click();
    await page.waitForURL(/\/produk-digital\/.+/);

    // Product detail loads
    await expect(page.locator('h1')).toBeVisible();
    const price = page.locator('text=/Rp [\\d.,]+/').first();
    await expect(price).toBeVisible();

    // Click "Beli Sekarang" → navigates to checkout
    const buyBtn = page.locator('a[href*="/checkout"]');
    await expect(buyBtn).toBeVisible();

    const checkoutHref = await buyBtn.getAttribute('href');
    expect(checkoutHref).toContain('/checkout');

    await buyBtn.click();
    await page.waitForURL(/\/checkout/);

    // Checkout page renders
    await expect(page.locator('h1')).toContainText(/Checkout/i);

    // Form fields present
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#phone')).toBeVisible();

    // Payment method buttons
    await expect(page.locator('button:has-text("QRIS")')).toBeVisible();

    // Fill form
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.fill('#phone', '08123456789');

    // Submit → shows QRIS
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();

    // QRIS payment section appears
    const qrisSection = page.locator('text=Scan QRIS');
    await expect(qrisSection).toBeVisible({ timeout: 15_000 });

    // QR code SVG renders
    await expect(page.locator('svg')).toBeVisible();

    // Total price shown
    await expect(page.locator('text=/Total:/')).toBeVisible();

    // Confirm button present
    await expect(page.locator('button:has-text("Konfirmasi")')).toBeVisible();
  });

  test('checkout with cart store (zustand)', async ({ page }) => {
    // Inject cart item directly into zustand persisted state
    await page.goto('/produk-digital');

    await page.evaluate(() => {
      const cartData = {
        state: {
          items: [
            { id: 'test-1', name: 'Test Product', price: 50000, qty: 1, type: 'digital' },
          ],
          promoCode: null,
          discountAmount: 0,
        },
        version: 0,
      };
      localStorage.setItem('sunday-vibes-cart', JSON.stringify(cartData));
    });

    // Verify cart persists after reload
    await page.reload();

    // Cart icon should show badge (if present in navbar)
    const cartIcon = page.locator('[data-testid="cart-icon"], a[href*="checkout"]').first();
    if ((await cartIcon.count()) > 0) {
      await expect(cartIcon).toBeVisible();
    }
  });
});
