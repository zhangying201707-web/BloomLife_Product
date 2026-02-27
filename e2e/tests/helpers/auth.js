const { expect } = require('@playwright/test');

async function loginAsNewUser(page) {
  const unique = Date.now();
  const username = `teacher_e2e_${unique}`;
  const email = `${username}@example.com`;
  const password = 'Pass123456';

  await page.goto('/');

  await page.getByRole('button', { name: /Don't have an account\? Register/i }).click();
  await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();

  const registerCard = page.locator('section.auth-card');
  await registerCard.getByPlaceholder('Username').fill(username);
  await registerCard.getByPlaceholder('Email').fill(email);
  await registerCard.getByPlaceholder('Password').fill(password);
  await registerCard.getByRole('button', { name: 'Register' }).click();

  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

  const loginCard = page.locator('section.auth-card');
  await loginCard.getByPlaceholder('Username').fill(username);
  await loginCard.getByPlaceholder('Password').fill(password);
  await loginCard.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  return { username };
}

module.exports = { loginAsNewUser };
