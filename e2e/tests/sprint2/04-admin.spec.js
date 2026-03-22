const { test, expect } = require('@playwright/test');
const { loginAsDemoAdmin, loginAsNewUser } = require('../helpers/auth');
const { logUserStory } = require('../helpers/storyLogger');

test.describe('Sprint 2 Demo 04 - Admin', () => {
  test('G-6-US-36 to G-6-US-37: admin can manage products and update order statuses', async ({ page }) => {
    await loginAsNewUser(page);
    await page.locator('.product-card').first().getByRole('button', { name: 'Add to Cart' }).click();
    await page.getByRole('button', { name: /^Checkout \(\d+\)$/ }).click();
    await page.getByPlaceholder('Delivery address').fill('99 Admin Street');
    await page.getByRole('button', { name: 'Place Order' }).click();
    await expect(page.getByRole('heading', { name: 'Orders', exact: true })).toBeVisible();
    await expect(page.locator('.order-item').first()).toContainText('confirmed');
    await page.getByRole('button', { name: 'Logout' }).click();

    await loginAsDemoAdmin(page);

    await expect(page.getByRole('heading', { name: 'Admin', exact: true })).toBeVisible();

    const adminCard = page.locator('article.journey-card').filter({ hasText: 'Admin Console' });
    await logUserStory(test, 'G-6-US-36', 'manage products from the admin console', async () => {
      await adminCard.getByRole('button', { name: 'Create Demo Product' }).click();
      await expect(adminCard).toContainText('Sprint 2 Demo Bouquet');
      await adminCard.getByRole('button', { name: '+5 Stock' }).first().click();
      await expect(adminCard).toContainText('stock');
    });
    await logUserStory(test, 'G-6-US-37', 'update order statuses', async () => {
      await adminCard.getByRole('button', { name: 'Mark Out for Delivery' }).first().click();
      await expect(adminCard).toContainText('out_for_delivery');
    });
  });
});
