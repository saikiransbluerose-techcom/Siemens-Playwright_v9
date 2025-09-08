import path from 'path';
import { test, expect } from '@playwright/test';
import { authenticator } from 'otplib';
const TOTP_SECRET = process.env.TOTP_SECRET || 'MNAEAQDLMV2USSTDJFCWYTZTEUWDKMKW';

test('test', async ({ page }) => {
  await page.goto('https://siemens-dev1.pegacloud.com/prweb/PRAuth/app/GWSS/WufOMs17lxZjy1fI-RH7kXW6DtwPXjuN*/!STANDARD?pzuiactionrrr=CXtpbn1yblhJcEYzRHZaSUFPUGUvcE5ZV2xqTS9rSHJKSTQreE9CL1Zaa3FPZDI2MFZ6dUY2MzVJek5OdklKYWZ4S3hXc082OHRHVVg3VGZmRE8rYnkxM2xvZz09*');
  await page.getByRole('link', { name: 'Login with SiemensID' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('vineeti_hemdani@bluerose-tech.com');
  await page.getByRole('button', { name: 'Continue' }).click();

  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Vani@44112011');
  
 
  await page.getByRole('button', { name: 'Log in' }).click();

  // wait for mfa input to appear
  await page.getByRole('textbox', { name: 'Enter your one-time code' }).waitFor(); 
  
  // small skew tolerance helps if clocks drift a bit
authenticator.options = { step: 30, digits: 6, window: 1 };

// generate fresh TOTP
const code = authenticator.generate(TOTP_SECRET);

// (optional) console.log for debugging
console.log('TOTP:', code);

// fill the generated code (use the variable, not the string)
await page.getByRole('textbox', { name: 'Enter your one-time code' }).fill(code);

await page.getByRole('button', { name: 'Continue' }).click();


});