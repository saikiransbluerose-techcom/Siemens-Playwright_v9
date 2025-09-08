// IntelligentHealthCare/tests/patient-onboarding.spec.js
import { test, expect } from '@playwright/test';
test.describe.configure({ retries: 0 });

test('Patient Onboarding flow for IntelligentHealthCare', async ({ page }, testInfo) => {

  // ---- login screen
  await page.goto('https://pegalabs.pega.com/ui/system/cddd8f50-0220-47b5-9954-62beb8c85e1b');
  await page.getByRole('textbox', { name: 'Company Email' }).fill('vineeti_hemdani@bluerose-tech.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Vani@4411');
  await page.getByRole('button', { name: 'Verify' }).click();

  // Wait for the popup and the click in parallel
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Open' }).click();
  const page1 = await page1Promise;

  await page1.getByRole('textbox', { name: 'User name *' }).fill('HospitalAdmin@bluerose-tech.com');
  await page1.getByRole('textbox', { name: 'Password *' }).fill('rules@123!12');
  await page1.getByRole('button', { name: 'Log in' }).click();
  await page1.locator('[data-testid=":privacy-dialog:accept"]').click();
  await page1.getByRole('button', { name: 'Create' }).click();
  await page1.locator('[data-testid=":menu-item:"]').getByText('Onboarding').click();
  await page1.getByRole('button', { name: 'Fill form with AI' }).click();
  await page1.getByRole('button', { name: 'Next' }).click();

  // ---- uploads (direct to input; no native dialog)
  await page1.getByLabel('Upload Driving License')
    .setInputFiles('C:/Vineeti/Project/Upload Documents/FOLDER TO UPLOAD/1  - Copy.pdf');
  await page1.getByLabel('Upload Passport')
    .setInputFiles('C:/Vineeti/Project/Upload Documents/FOLDER TO UPLOAD/2- Copy .pdf');

  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.getByRole('button', { name: 'Next' }).click();

  // ✅ Disambiguate the status (avoid aria-hidden duplicate)
  const status = page1.locator('span:not([aria-hidden="true"])', { hasText: 'Resolved-Completed' }).first();
  
  await test.step('Assert case status is Resolved-Completed', async () => {
    await expect(status).toBeVisible({ timeout: 30_000 });

  // Optional: attach a short “success” note
    await testInfo.attach('Assertion', {
      body: '✅ Assertion successful: Case status is Resolved-Completed',
      contentType: 'text/plain'
    });

    // Optional: attach a small screenshot of the status chip
    const png = await status.screenshot();
    await testInfo.attach('Status chip', { body: png, contentType: 'image/png' });
  });


  // Give the view time to settle before reading the Case ID
  await page1.waitForLoadState('networkidle', { timeout: 30_000 });

  // ✅ Case ID: try page first, then first iframe; support both test-id attrs
  const sel = '[data-testid=":case-view:subheading"], [data-test-id=":case-view:subheading"]';

  let caseIdLocator = page1.locator(sel).first();
  if (!(await caseIdLocator.count())) {
    const appFrame = page1.frameLocator('iframe').first();
    caseIdLocator = appFrame.locator(sel).first();
  }

  await expect(caseIdLocator).toBeVisible({ timeout: 30_000 });

  const onboardingCaseID = (await caseIdLocator.innerText()).trim();
  console.log(`Onboarding case ID: ${onboardingCaseID}`);
  await testInfo.attach('Onboarding Case ID', { body: onboardingCaseID, contentType: 'text/plain' });



  // ---- logout
  await page1.getByRole('banner').getByRole('button', { name: 'HospitalAdmin' }).click();
  await page1.getByText('Log off').click();
});
