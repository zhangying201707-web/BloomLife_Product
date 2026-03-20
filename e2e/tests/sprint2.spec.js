const { test, expect } = require('@playwright/test');
const { loginAsNewUser, loginAsDemoAdmin } = require('./helpers/auth');
const { logUserStory } = require('./helpers/storyLogger');

test.describe('Sprint 2 Demo Flow', () => {
  test('Sprint 2 end-to-end demo with progress logs', async ({ page }) => {
    console.log('[Sprint2] Phase 1/4: Discovery and product research');
    await loginAsNewUser(page);
    await expect(page.getByRole('button', { name: 'Shop' })).toBeVisible();

    const discoveryCard = page
      .locator('article.journey-card')
      .filter({ hasText: 'Budget & Trending Discovery' });
    await logUserStory(test, 'US-001', 'filter recommendations by budget', async () => {
      await discoveryCard.locator('select').nth(1).selectOption('Romantic');
      await discoveryCard.locator('select').nth(2).selectOption('Love');
      await discoveryCard.getByPlaceholder('Max budget').fill('320');
      await discoveryCard.getByRole('button', { name: 'Apply Filters' }).click();
      await expect(page.locator('.product-card')).toHaveCount(1);
    });
    await logUserStory(test, 'US-002', 'view trending arrangements', async () => {
      await discoveryCard.getByRole('button', { name: 'Show Trending Arrangements' }).click();
      await expect(discoveryCard).toContainText('score');
    });

    const compareCard = page
      .locator('article.journey-card')
      .filter({ hasText: 'Arrangement Comparison' });
    await logUserStory(test, 'US-003', 'compare two flower arrangements', async () => {
      await compareCard.locator('select').nth(0).selectOption({ index: 1 });
      await compareCard.locator('select').nth(1).selectOption({ index: 2 });
      await compareCard.getByRole('button', { name: 'Compare Arrangements' }).click();
      await expect(compareCard).toContainText('stars');
    });

    const insightCard = page
      .locator('article.journey-card')
      .filter({ hasText: 'Product Details & Reviews' });
    await logUserStory(test, 'US-004', 'view detailed product descriptions', async () => {
      await insightCard.locator('select').selectOption({ index: 1 });
      await insightCard.getByRole('button', { name: 'Load Product Story' }).click();
      await expect(insightCard).toContainText('Description:');
    });
    await logUserStory(test, 'US-005', 'see customer reviews', async () => {
      await expect(insightCard).toContainText('Reviews:');
    });
    await logUserStory(test, 'US-006', 'see photos from different angles and price details', async () => {
      await expect(insightCard).toContainText('Angles:');
      const pricingCard = page.locator('article.journey-card').filter({ hasText: 'Pricing Breakdown' });
      await pricingCard.getByRole('button', { name: 'View Price Details' }).click();
      await expect(pricingCard).toContainText('Total:');
    });

    console.log('[Sprint2] Phase 2/4: Checkout personalization');
    await page.locator('.product-card').first().getByRole('button', { name: 'Add to Cart' }).click();
    await page.getByRole('button', { name: /^Checkout \(\d+\)$/ }).click();
    await expect(page.getByRole('heading', { name: 'Shopping Cart' })).toBeVisible();

    const wrappingCard = page.locator('article.journey-card').filter({ hasText: 'Wrapping Styles' });
    await logUserStory(test, 'US-007', 'choose wrapping styles', async () => {
      await wrappingCard.getByRole('button', { name: 'View Wrapping Options' }).click();
      await expect(wrappingCard).toContainText('Selected wrap:');
    });

    const greetingCard = page.locator('article.journey-card').filter({ hasText: 'Greeting Card' });
    await logUserStory(test, 'US-008', 'preview personalized message', async () => {
      await greetingCard.getByPlaceholder('Recipient').fill('Alex');
      await greetingCard.getByPlaceholder('Sender (optional)').fill('BloomLife');
      await greetingCard.getByPlaceholder('Message').fill('Happy Birthday and best wishes!');
      await greetingCard.getByRole('button', { name: 'Save Card' }).click();
      await expect(greetingCard).toContainText('To Alex:');
    });
    await logUserStory(test, 'US-009', 'save favorite messages', async () => {
      await greetingCard.getByRole('button', { name: 'Save as Favorite' }).click();
      await greetingCard.getByRole('button', { name: 'Load Favorite Messages' }).click();
      await expect(greetingCard).toContainText("Alex's card");
    });

    const giftCard = page.locator('article.journey-card').filter({ hasText: 'Optional Gifts' });
    await giftCard.getByRole('button', { name: /Chocolate/ }).click();
    await expect(page.locator('.toast-message')).toContainText('added to your order');

    const deliveryCard = page.locator('article.journey-card').filter({ hasText: 'Delivery Details' });
    await logUserStory(test, 'US-010', 'choose delivery time windows', async () => {
      await deliveryCard.getByPlaceholder('Recipient').fill('Alex');
      await deliveryCard.getByPlaceholder('Phone (11 digits)').fill('13800000000');
      await deliveryCard.getByPlaceholder('Address').fill('No.1 Flower Street');
      await deliveryCard.locator('input[type="date"]').fill('2026-03-21');
      await deliveryCard.locator('select').selectOption('12:00-15:00');
      await deliveryCard.getByRole('button', { name: 'Save Delivery Info' }).click();
      await expect(deliveryCard).toContainText('Time window: 2026-03-21 12:00-15:00');
    });

    const promoCard = page.locator('article.journey-card').filter({ hasText: 'Promo & Payment' });
    await logUserStory(test, 'US-011', 'apply promo codes', async () => {
      await promoCard.getByPlaceholder('Promo code').fill('SAVE10');
      await promoCard.getByRole('button', { name: 'Apply Promo' }).click();
      await expect(promoCard).toContainText('SAVE10');
    });
    await logUserStory(test, 'US-012', 'choose from multiple payment methods', async () => {
      await promoCard.locator('select').selectOption('paypal');
      await expect(promoCard).toContainText('PayPal');
    });

    console.log('[Sprint2] Phase 3/4: Orders, notifications, and support');
    await page.getByRole('button', { name: 'Orders' }).click();
    await expect(page.getByRole('heading', { name: 'Orders', exact: true })).toBeVisible();

    const trackerCard = page.locator('article.journey-card').filter({ hasText: 'Order Tracking' });
    await logUserStory(test, 'US-013', 'review ongoing order and subscription experience', async () => {
      await trackerCard.getByPlaceholder('Order ID').fill('12');
      await trackerCard.getByRole('button', { name: 'Track Order' }).click();
      await expect(trackerCard).toContainText('Status:');
    });

    const availabilityCard = page
      .locator('article.journey-card')
      .filter({ hasText: 'Delivery Availability' });
    await availabilityCard.getByPlaceholder('ZIP code').fill('100000');
    await availabilityCard.getByRole('button', { name: 'Check Delivery' }).click();
    await expect(availabilityCard).toContainText('Available: Yes');

    const subscriptionCard = page
      .locator('article.journey-card')
      .filter({ hasText: 'Subscription & Support' })
      .first();
    await logUserStory(test, 'US-013', 'subscribe to monthly flower boxes', async () => {
      await subscriptionCard.getByPlaceholder('Monthly box address').fill('88 Flower Avenue');
      await subscriptionCard.getByRole('button', { name: 'Subscribe Monthly Box' }).click();
      await expect(subscriptionCard).toContainText('scheduled');
    });
    await logUserStory(test, 'US-014', 'get easy access to customer support', async () => {
      await expect(subscriptionCard).toContainText('Live Chat');
    });

    await page.getByRole('button', { name: 'Inbox' }).click();
    await expect(page.getByRole('heading', { name: 'Inbox' })).toBeVisible();
    const notificationCard = page.locator('article.journey-card').filter({ hasText: 'Notifications' });
    await logUserStory(test, 'US-014', 'confirm support and notification follow-up', async () => {
      await notificationCard.getByRole('button', { name: 'Refresh' }).click();
      await expect(notificationCard).toContainText('Order Confirmed');
    });

    console.log('[Sprint2] Phase 4/4: Admin workflow');
    await page.getByRole('button', { name: 'Logout' }).click();
    await loginAsDemoAdmin(page);

    const adminCard = page.locator('article.journey-card').filter({ hasText: 'Admin Console' });
    await logUserStory(test, 'US-015', 'manage products from the admin console', async () => {
      await adminCard.getByRole('button', { name: 'Create Demo Product' }).click();
      await expect(adminCard).toContainText('Sprint 2 Demo Bouquet');
      await adminCard.getByRole('button', { name: '+5 Stock' }).first().click();
      await expect(adminCard).toContainText('stock');
    });
    await logUserStory(test, 'US-016', 'update order statuses', async () => {
      await adminCard.getByRole('button', { name: 'Mark Out for Delivery' }).first().click();
      await expect(adminCard).toContainText('out_for_delivery');
    });
  });
});
