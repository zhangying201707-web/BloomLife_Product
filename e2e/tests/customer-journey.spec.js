const { test, expect } = require('@playwright/test');
const { loginAsNewUser } = require('./helpers/auth');

test.describe('Customer Journey Sprint Stories', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsNewUser(page);
    await expect(page.getByRole('button', { name: 'Shop' })).toBeVisible();
  });

  test('US-001/002/006 filters and pricing on home page', async ({ page }) => {
    const occasionCard = page.locator('article.journey-card').filter({ hasText: 'Occasion & Mood' });
    await occasionCard.locator('select').nth(1).selectOption('Romantic');
    await occasionCard.locator('select').nth(2).selectOption('Love');
    await occasionCard.getByRole('button', { name: 'Apply Filters' }).click();

    await expect(page.locator('.toast-message')).toContainText('Filter result:');

    const pricingCard = page.locator('article.journey-card').filter({ hasText: 'Pricing Breakdown' });
    await pricingCard.getByRole('button', { name: 'View Price Details' }).click();
    await expect(pricingCard).toContainText('Total:');
  });

  test('US-011/012/016/017 on cart page', async ({ page }) => {
    await page.locator('.product-card').first().getByRole('button', { name: 'Add to Cart' }).click();
    await page.getByRole('button', { name: /^Checkout \(\d+\)$/ }).click();
    await expect(page.getByRole('heading', { name: 'Shopping Cart' })).toBeVisible();

    const greetingCard = page.locator('article.journey-card').filter({ hasText: 'Greeting Card' });
    await greetingCard.getByPlaceholder('Recipient').fill('Alex');
    await greetingCard.getByPlaceholder('Sender (optional)').fill('BloomLife');
    await greetingCard.getByPlaceholder('Message').fill('Happy Birthday and best wishes!');
    await greetingCard.getByRole('button', { name: 'Save Card' }).click();
    await expect(greetingCard).toContainText('To Alex:');

    const giftCard = page.locator('article.journey-card').filter({ hasText: 'Optional Gifts' });
    await giftCard.getByRole('button', { name: /Chocolate/ }).click();
    await expect(page.locator('.toast-message')).toContainText('added to your order');

    const deliveryCard = page.locator('article.journey-card').filter({ hasText: 'Delivery Details' });
    await deliveryCard.getByPlaceholder('Recipient').fill('Alex');
    await deliveryCard.getByPlaceholder('Phone (11 digits)').fill('13800000000');
    await deliveryCard.getByPlaceholder('Address').fill('No.1 Flower Street');
    await deliveryCard.getByRole('button', { name: 'Save Delivery Info' }).click();
    await expect(deliveryCard).toContainText('Saved:');
  });

  test('US-007/021/022 on orders page', async ({ page }) => {
    await page.getByRole('button', { name: 'Shop' }).click();
    await page.getByRole('button', { name: 'Orders' }).click();
    await expect(page.getByRole('heading', { name: 'Orders' })).toBeVisible();

    const trackerCard = page.locator('article.journey-card').filter({ hasText: 'Order Tracking' });
    await trackerCard.getByPlaceholder('Order ID').fill('12');
    await trackerCard.getByRole('button', { name: 'Track Order' }).click();
    await expect(trackerCard).toContainText('Status:');

    const availabilityCard = page
      .locator('article.journey-card')
      .filter({ hasText: 'Delivery Availability' });
    await availabilityCard.getByPlaceholder('ZIP code').fill('100000');
    await availabilityCard.getByRole('button', { name: 'Check Delivery' }).click();
    await expect(availabilityCard).toContainText('Available: Yes');

    await page.getByRole('button', { name: 'Inbox' }).click();
    await expect(page.getByRole('heading', { name: 'Inbox' })).toBeVisible();
    const notificationCard = page
      .locator('article.journey-card')
      .filter({ hasText: 'Notifications' });
    await notificationCard.getByRole('button', { name: 'Refresh' }).click();
    await expect(notificationCard).toContainText('Order Confirmed');
  });
});
