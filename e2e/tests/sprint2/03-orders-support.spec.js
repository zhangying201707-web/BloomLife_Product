const { test, expect } = require('@playwright/test');
const { loginAsNewUser } = require('../helpers/auth');
const { logUserStory } = require('../helpers/storyLogger');

test.describe('Sprint 2 Demo 03 - Orders And Support', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsNewUser(page);
    await expect(page.getByRole('button', { name: 'Shop' })).toBeVisible();
  });

  test('G-6-US-25 and G-6-US-33: subscriptions, support, tracking and notifications', async ({ page }) => {
    await page.getByRole('button', { name: 'Orders' }).click();
    await expect(page.getByRole('heading', { name: 'Orders', exact: true })).toBeVisible();

    const trackerCard = page.locator('article.journey-card').filter({ hasText: 'Order Tracking' });
    console.log('[Sprint2] Checking order tracking experience');
    await test.step('Track a recent order', async () => {
      await trackerCard.getByPlaceholder('Order ID').fill('12');
      await trackerCard.getByRole('button', { name: 'Track Order' }).click();
      await expect(trackerCard).toContainText('Status:');
    });

    const availabilityCard = page.locator('article.journey-card').filter({ hasText: 'Delivery Availability' });
    await availabilityCard.getByPlaceholder('ZIP code').fill('100000');
    await availabilityCard.getByRole('button', { name: 'Check Delivery' }).click();
    await expect(availabilityCard).toContainText('Available: Yes');

    const subscriptionCard = page.locator('article.journey-card').filter({ hasText: 'Subscription & Support' }).first();
    await logUserStory(test, 'G-6-US-25', 'subscribe to monthly flower boxes', async () => {
      await subscriptionCard.getByPlaceholder('Monthly box address').fill('88 Flower Avenue');
      await subscriptionCard.getByRole('button', { name: 'Subscribe Monthly Box' }).click();
      await expect(subscriptionCard).toContainText('scheduled');
    });
    await logUserStory(test, 'G-6-US-33', 'get easy access to customer support', async () => {
      await expect(subscriptionCard).toContainText('Live Chat');
    });

    await page.getByRole('button', { name: 'Inbox' }).click();
    await expect(page.getByRole('heading', { name: 'Inbox' })).toBeVisible();
    const notificationCard = page.locator('article.journey-card').filter({ hasText: 'Notifications' });
    console.log('[Sprint2] Refreshing notification center');
    await test.step('Refresh inbox notifications', async () => {
      await notificationCard.getByRole('button', { name: 'Refresh' }).click();
      await expect(notificationCard).toContainText('Order Confirmed');
    });
  });
});
