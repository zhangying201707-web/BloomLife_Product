const { test, expect } = require('@playwright/test');
const { loginAsNewUser } = require('../helpers/auth');
const { logUserStory } = require('../helpers/storyLogger');

test.describe('Sprint 2 Demo 02 - Checkout', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsNewUser(page);
    await expect(page.getByRole('button', { name: 'Shop' })).toBeVisible();
  });

  test('G-6-US-13 to G-6-US-20: cart experience with wrapping, message, favorites, promo and payment', async ({
    page,
  }) => {
    await page.locator('.product-card').first().getByRole('button', { name: 'Add to Cart' }).click();
    await page.getByRole('button', { name: /^Checkout \(\d+\)$/ }).click();
    await expect(page.getByRole('heading', { name: 'Shopping Cart' })).toBeVisible();

    const wrappingCard = page.locator('article.journey-card').filter({ hasText: 'Wrapping Styles' });
    await logUserStory(test, 'G-6-US-13', 'choose wrapping styles', async () => {
      await wrappingCard.getByRole('button', { name: 'View Wrapping Options' }).click();
      await expect(wrappingCard).toContainText('Selected wrap:');
    });

    const greetingCard = page.locator('article.journey-card').filter({ hasText: 'Greeting Card' });
    await logUserStory(test, 'G-6-US-14', 'preview personalized message', async () => {
      await greetingCard.getByPlaceholder('Recipient').fill('Alex');
      await greetingCard.getByPlaceholder('Sender (optional)').fill('BloomLife');
      await greetingCard.getByPlaceholder('Message').fill('Happy Birthday and best wishes!');
      await greetingCard.getByRole('button', { name: 'Save Card' }).click();
      await expect(greetingCard).toContainText('To Alex:');
    });
    await logUserStory(test, 'G-6-US-15', 'save favorite messages', async () => {
      await greetingCard.getByRole('button', { name: 'Save as Favorite' }).click();
      await greetingCard.getByRole('button', { name: 'Load Favorite Messages' }).click();
      await expect(greetingCard).toContainText("Alex's card");
    });

    const giftCard = page.locator('article.journey-card').filter({ hasText: 'Optional Gifts' });
    await giftCard.getByRole('button', { name: /Chocolate/ }).click();
    await expect(page.locator('.toast-message')).toContainText('added to your order');

    const deliveryCard = page.locator('article.journey-card').filter({ hasText: 'Delivery Details' });
    await logUserStory(test, 'G-6-US-18', 'choose delivery time windows', async () => {
      await deliveryCard.getByPlaceholder('Recipient').fill('Alex');
      await deliveryCard.getByPlaceholder('Phone (11 digits)').fill('13800000000');
      await deliveryCard.getByPlaceholder('Address').fill('No.1 Flower Street');
      await deliveryCard.locator('input[type="date"]').fill('2026-03-21');
      await deliveryCard.locator('select').selectOption('12:00-15:00');
      await deliveryCard.getByRole('button', { name: 'Save Delivery Info' }).click();
      await expect(deliveryCard).toContainText('Time window: 2026-03-21 12:00-15:00');
    });

    const promoCard = page.locator('article.journey-card').filter({ hasText: 'Promo & Payment' });
    await logUserStory(test, 'G-6-US-19', 'apply promo codes', async () => {
      await promoCard.getByPlaceholder('Promo code').fill('SAVE10');
      await promoCard.getByRole('button', { name: 'Apply Promo' }).click();
      await expect(promoCard).toContainText('SAVE10');
    });
    await logUserStory(test, 'G-6-US-20', 'choose from multiple payment methods', async () => {
      await promoCard.locator('select').selectOption('paypal');
      await expect(promoCard).toContainText('PayPal');
    });
  });
});
