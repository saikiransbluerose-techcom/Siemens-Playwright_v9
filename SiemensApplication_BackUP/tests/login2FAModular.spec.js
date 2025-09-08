import { test } from '@playwright/test';
import { authenticator } from 'otplib';
import { USER_EMAIL, USER_PASSWORD, TOTP_SECRET, LOGIN_URL } from '../utils/config.js';

test('login with MFA', async ({ page }) => {
  await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded' });

  await page.getByRole('link', { name: /login with siemensid/i }).click();
  await page.getByRole('textbox', { name: /email address/i }).fill(USER_EMAIL);
  await page.getByRole('button', { name: /continue/i }).click();

  
// (optional) console.log for debugging
console.log('Logged in User is:', USER_EMAIL);

  await page.getByRole('textbox', { name: /password/i }).fill(USER_PASSWORD);
  await page.getByRole('button', { name: /log in/i }).click();

  await page.getByRole('textbox', { name: /one-time code/i }).waitFor();
  authenticator.options = { step: 30, digits: 6, window: 1 };
  const code = authenticator.generate(TOTP_SECRET);
  await page.getByRole('textbox', { name: /one-time code/i }).fill(code);

  // (optional) console.log for debugging
console.log('TOPTP Code:', code);

  await Promise.all([
    page.waitForURL(/\/prweb\/(?!PRAuth)/i, { timeout: 60000 }), // wait for redirect
    page.getByRole('button', { name: /continue/i }).click(),
  ]);


 await page.waitForTimeout(20000); // keep the page open for ~30s

});
