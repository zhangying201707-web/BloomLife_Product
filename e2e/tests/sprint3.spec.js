const { test, expect } = require('@playwright/test');
const { loginAsDemoAdmin, loginAsNewUser } = require('./helpers/auth');
const { logUserStory } = require('./helpers/storyLogger');

test.describe('Sprint 3 Demo Flow', () => {
  test('Sprint 3 end-to-end demo with progress logs', async ({ page }) => {
    console.log('[Sprint3] Phase 1/3: Orders, proof of delivery, and reorder');
    const { username } = await loginAsNewUser(page);
    await expect(page.getByRole('button', { name: 'Shop' })).toBeVisible();

    await page.locator('.product-card').first().getByRole('button', { name: 'Add to Cart' }).click();
    await page.getByRole('button', { name: /^Checkout \(\d+\)$/ }).click();
    await page.getByPlaceholder('Delivery address').fill('101 Sprint03 Road');
    await page.getByRole('button', { name: 'Place Order' }).click();
    await expect(page.getByRole('heading', { name: 'Orders', exact: true })).toBeVisible();

    const firstOrder = page.locator('.order-item').first();
    await logUserStory(
      test,
      'G-6-US-29',
      'view order history',
      async () => {
        await expect(firstOrder).toContainText('Order #');
        await expect(firstOrder).toContainText('Items:');
      },
      { sprintLabel: 'Sprint3' }
    );

    await logUserStory(
      test,
      'G-6-US-30',
      'reorder previous purchases',
      async () => {
        await firstOrder.getByRole('button', { name: 'Reorder Items' }).click();
        await expect(page.getByRole('heading', { name: 'Shopping Cart' })).toBeVisible();
        await expect(page.locator('.cart-item')).toHaveCount(1);
      },
      { sprintLabel: 'Sprint3' }
    );

    await page.getByRole('button', { name: 'Orders' }).click();
    const proofCard = page.locator('article.journey-card').filter({
      has: page.getByRole('heading', { name: 'Delivery Proof & Delay Alerts' }),
    });
    await logUserStory(
      test,
      'G-6-US-23',
      'receive a photo of the delivered flowers',
      async () => {
        await proofCard.locator('select').selectOption({ index: 1 });
        await proofCard.getByRole('button', { name: 'Load Delivery Update' }).click();
        await expect(proofCard.locator('img')).toBeVisible();
        await expect(proofCard).toContainText('delivered successfully');
      },
      { sprintLabel: 'Sprint3' }
    );
    await logUserStory(
      test,
      'G-6-US-24',
      'receive delay alerts',
      async () => {
        await expect(proofCard).toContainText('Delay Alert:');
        await expect(proofCard).toContainText('Updated arrival window');
      },
      { sprintLabel: 'Sprint3' }
    );

    console.log('[Sprint3] Phase 2/3: Subscription, account, FAQ, and support');
    await page.getByRole('button', { name: 'Inbox' }).click();
    await expect(page.getByRole('heading', { name: 'Inbox' })).toBeVisible();

    const notificationCard = page.locator('article.journey-card').filter({
      has: page.getByRole('heading', { name: 'Notifications' }),
    });
    await notificationCard.getByRole('button', { name: 'Refresh' }).click();
    await expect(notificationCard).toContainText('Delivery Photo Received');
    await expect(notificationCard).toContainText('Delay Alert');

    const subscriptionCard = page.locator('article.journey-card').filter({
      has: page.getByRole('heading', { name: 'Subscription Manager' }),
    });
    await logUserStory(
      test,
      'G-6-US-26',
      'manage my subscription',
      async () => {
        await subscriptionCard.getByPlaceholder('Subscription delivery address').fill('88 Renewal Avenue');
        await subscriptionCard.getByRole('button', { name: 'Start Subscription' }).click();
        await expect(subscriptionCard).toContainText('Status: active');
        await subscriptionCard.getByRole('button', { name: 'Pause Plan' }).click();
        await expect(subscriptionCard).toContainText('Status: paused');
        await subscriptionCard.getByRole('button', { name: 'Resume Plan' }).click();
        await expect(subscriptionCard).toContainText('Status: active');
      },
      { sprintLabel: 'Sprint3' }
    );
    await logUserStory(
      test,
      'G-6-US-27',
      'preview upcoming themes',
      async () => {
        await expect(subscriptionCard).toContainText('Upcoming themes:');
        await expect(subscriptionCard).toContainText('Month 1:');
      },
      { sprintLabel: 'Sprint3' }
    );
    await logUserStory(
      test,
      'G-6-US-28',
      'update my delivery address for subscriptions',
      async () => {
        await subscriptionCard.locator('select').selectOption('Luxury Signature');
        await subscriptionCard.getByPlaceholder('Subscription delivery address').fill('99 Updated Blossom Lane');
        await subscriptionCard.getByRole('button', { name: 'Save Subscription Changes' }).click();
        await expect(subscriptionCard).toContainText('99 Updated Blossom Lane');
      },
      { sprintLabel: 'Sprint3' }
    );

    const accountCard = page.locator('article.journey-card').filter({
      has: page.getByRole('heading', { name: 'Account Center' }),
    });
    await logUserStory(
      test,
      'G-6-US-31',
      'save favorite products',
      async () => {
        await accountCard.locator('select').selectOption({ index: 1 });
        await accountCard.getByRole('button', { name: 'Save Favorite Product' }).click();
        await expect(accountCard).toContainText('Morning Dew Rose Bouquet');
      },
      { sprintLabel: 'Sprint3' }
    );
    await logUserStory(
      test,
      'G-6-US-32',
      'update my personal information',
      async () => {
        const updatedUsername = `${username}_vip`;
        await accountCard.getByPlaceholder('Username').fill(updatedUsername);
        await accountCard.getByPlaceholder('Email').fill(`${updatedUsername}@example.com`);
        await accountCard.getByRole('button', { name: 'Save Personal Info' }).click();
        await expect(accountCard).toContainText(updatedUsername);
        await expect(page.locator('.nav-user')).toContainText(updatedUsername);
      },
      { sprintLabel: 'Sprint3' }
    );

    const supportCard = page.locator('article.journey-card').filter({
      has: page.getByRole('heading', { name: 'FAQ & Live Support' }),
    });
    await logUserStory(
      test,
      'G-6-US-34',
      'browse FAQs',
      async () => {
        await expect(supportCard).toContainText('same-day delivery');
      },
      { sprintLabel: 'Sprint3' }
    );
    await logUserStory(
      test,
      'G-6-US-35',
      'chat with a support agent',
      async () => {
        await supportCard.getByPlaceholder('Ask a support agent').fill('Can you confirm my next subscription shipment?');
        await supportCard.getByRole('button', { name: 'Chat With Support' }).click();
        await expect(supportCard).toContainText('Support Agent');
      },
      { sprintLabel: 'Sprint3' }
    );

    console.log('[Sprint3] Phase 3/3: Admin shipment and analytics workflow');
    await page.getByRole('button', { name: 'Logout' }).click();
    await loginAsDemoAdmin(page);

    const adminCard = page.locator('article.journey-card').filter({
      has: page.getByRole('heading', { name: 'Admin Console' }),
    });
    await logUserStory(
      test,
      'G-6-US-38',
      'manage subscription shipments',
      async () => {
        await adminCard.getByRole('button', { name: 'Refresh Admin Data' }).click();
        await adminCard.getByRole('button', { name: 'Dispatch Shipment' }).first().click();
        await expect(adminCard).toContainText('dispatched');
      },
      { sprintLabel: 'Sprint3' }
    );
    await logUserStory(
      test,
      'G-6-US-39',
      'view sales analytics',
      async () => {
        await expect(adminCard).toContainText('Total revenue:');
        await expect(adminCard).toContainText('Morning Dew Rose Bouquet');
      },
      { sprintLabel: 'Sprint3' }
    );
  });
});
