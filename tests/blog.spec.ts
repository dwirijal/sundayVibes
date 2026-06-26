import { test, expect } from '@playwright/test';

test.describe('Blog rendering', () => {
  test('blog page loads with header and grid', async ({ page }) => {
    await page.goto('/blog');

    await expect(page.locator('h1')).toContainText(/Blog/i);

    // Either posts render or empty state shows
    const grid = page.locator('section.container');
    await expect(grid).toBeVisible();

    const posts = page.locator('article');
    const emptyState = page.locator('text=Belum ada postingan');
    const hasPosts = (await posts.count()) > 0;
    const hasEmpty = (await emptyState.count()) > 0;
    expect(hasPosts || hasEmpty).toBeTruthy();
  });

  test('blog post links have valid hrefs', async ({ page }) => {
    await page.goto('/blog');

    const links = page.locator('a[href^="/blog/"]');
    const count = await links.count();

    if (count > 0) {
      const href = await links.first().getAttribute('href');
      expect(href).toMatch(/^\/blog\/.+$/);
    }
  });

  test('blog post detail renders when posts exist', async ({ page }) => {
    await page.goto('/blog');

    const firstPost = page.locator('a[href^="/blog/"]').first();
    if ((await firstPost.count()) === 0) {
      test.skip();
      return;
    }

    await firstPost.click();
    await page.waitForURL(/\/blog\/.+/);

    // Article element present
    await expect(page.locator('article')).toBeVisible();

    // h1 present
    await expect(page.locator('h1')).toBeVisible();

    // Back link to /blog
    const backLink = page.locator('a[href="/blog"]');
    await expect(backLink.first()).toBeVisible();
  });
});
