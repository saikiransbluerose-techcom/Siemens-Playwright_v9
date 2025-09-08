import { test, expect } from '@playwright/test';
test.describe.configure({ retries: 0 });


test('Loan Management flow for LoanManagement', async ({ page }, testInfo) => {
  await page.goto('https://pegalabs.pega.com/ui/system/4df42146-293f-4025-bd60-f289d551a2dd?tab=info');
  await page.getByRole('textbox', { name: 'Company Email' }).fill('vineeti_hemdani@bluerose-tech.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Vani@4411');
  await page.getByRole('button', { name: 'Verify' }).click();

  // Wait for the popup and the click in parallel
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Open' }).click();
  const page1 = await page1Promise;

  await page1.getByRole('textbox', { name: 'User name *' }).fill('LoanOriginator');
  await page1.getByRole('textbox', { name: 'Password *' }).click();
  await page1.getByRole('textbox', { name: 'Password *' }).fill('pega@123');
  await page1.getByRole('button', { name: 'Log in' }).click();

//  await page1.getByTestId(':privacy-dialog:accept').click();
  await page1.locator('[data-testid=":privacy-dialog:accept"]').click();

  await page1.getByRole('button', { name: 'Create' }).click();
  await page1.locator('[data-testid=":menu:"]').getByText('Loan request').click();
   
  //await page1.goto('https://bluerosetech02.pegalabs.io/prweb/app/loan-management/loan-requests/L-46001');

  await page1.getByRole('button', { name: 'Fill form with AI' }).click();
  await page1.getByRole('button', { name: 'Next' }).click();


  await page1.pause() ;
  await page1.getByRole('button', { name: 'Fill form with AI' }).click();
  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.getByRole('button', { name: 'Fill form with AI' }).click();
  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.locator('[data-testid=":form:"]').getByRole('button', { name: 'Submit' }).click();

   
await page1.pause();  
  // 1) Click "Fill form with AI"
await page1.getByRole('button', { name: 'Fill form with AI' }).click();

// 2) Click "Next" (first time)
await page1.getByRole('button', { name: 'Next' }).click();

// 3) Click "Next" (first time)
await page1.getByRole('button', { name: 'Next' }).click();

// await page1.pause();
// // 4) Click "Next" (first time)
// await page1.getByRole('button', { name: 'Next' }).click();

// // 5. Fill the Turnover Amount input





});

