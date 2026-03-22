const { test, expect } = require('@playwright/test');
const { loginAsNewUser } = require('../helpers/auth');
const { logUserStory } = require('../helpers/storyLogger');

test.describe('Sprint 2 Demo 01 - Discovery', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsNewUser(page);
    await expect(page.getByRole('button', { name: 'Shop' })).toBeVisible();
  });

  test('G-6-US-3 to G-6-US-10: discovery, trending, comparison, details and reviews', async ({ page }) => {
    const discoveryCard = page.locator('article.journey-card').filter({ hasText: 'Budget & Trending Discovery' });
    await logUserStory(test, 'G-6-US-3', 'filter recommendations by budget', async () => {
      await discoveryCard.locator('select').nth(1).selectOption('Romantic');
      await discoveryCard.locator('select').nth(2).selectOption('Love');
      await discoveryCard.getByPlaceholder('Max budget').fill('320');
      await discoveryCard.getByRole('button', { name: 'Apply Filters' }).click();
      await expect(page.locator('.product-card')).toHaveCount(1);
    });
    await logUserStory(test, 'G-6-US-4', 'view trending arrangements', async () => {
      await discoveryCard.getByRole('button', { name: 'Show Trending Arrangements' }).click();
      await expect(discoveryCard).toContainText('score');
    });

    const compareCard = page.locator('article.journey-card').filter({ hasText: 'Arrangement Comparison' });
    await logUserStory(test, 'G-6-US-5', 'compare two flower arrangements', async () => {
      await compareCard.locator('select').nth(0).selectOption({ index: 1 });
      await compareCard.locator('select').nth(1).selectOption({ index: 2 });
      await compareCard.getByRole('button', { name: 'Compare Arrangements' }).click();
      await expect(compareCard).toContainText('stars');
    });

    const insightCard = page.locator('article.journey-card').filter({ hasText: 'Product Details & Reviews' });
    await logUserStory(test, 'G-6-US-8', 'view detailed product descriptions', async () => {
      await insightCard.locator('select').selectOption({ index: 1 });
      await insightCard.getByRole('button', { name: 'Load Product Story' }).click();
      await expect(insightCard).toContainText('Description:');
    });
    await logUserStory(test, 'G-6-US-9', 'see customer reviews', async () => {
      await expect(insightCard).toContainText('Reviews:');
    });
    await logUserStory(test, 'G-6-US-10', 'see photos from different angles and price details', async () => {
      await expect(insightCard).toContainText('Angles:');
    });

    const pricingCard = page.locator('article.journey-card').filter({ hasText: 'Pricing Breakdown' });
    await logUserStory(test, 'G-6-US-10', 'view pricing breakdown details', async () => {
      await pricingCard.getByRole('button', { name: 'View Price Details' }).click();
      await expect(pricingCard).toContainText('Total:');
    });
  });
});
