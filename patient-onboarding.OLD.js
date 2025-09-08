// IntelligentHealthCare/tests/patient-onboarding.spec.js
const { test, expect } = require('@playwright/test');
const fs = require('fs/promises');

test('Patient Onboarding flow for IntelligentHealthCare', async ({ page }, testInfo) => {
  // ---- capture browser console/errors/failed requests and attach to report
  const logs = [];
  const wireConsole = p => {
    p.on('console', m => logs.push(`[${m.type()}] ${m.text()}`));
    p.on('pageerror', e => logs.push(`[pageerror] ${e.message}`));
    p.on('requestfailed', r => logs.
      push(`[requestfailed] ${r.method()} ${r.url()} :: ${r.failure()?.errorText}`));
  };
  wireConsole(page);

  // ---- login screen
  await page.goto('https://pegalabs.pega.com/ui/system/cddd8f50-0220-47b5-9954-62beb8c85e1b');
  await page.getByRole('textbox', { name: 'Company Email' }).fill('vineeti_hemdani@bluerose-tech.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Vani@4411');
  await page.getByRole('button', { name: 'Verify' }).click();

  // ---- popup app window
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: 'Open' }).click(),
  ]);
  wireConsole(page1);

  await page1.getByRole('textbox', { name: 'User name *' }).fill('HospitalAdmin@bluerose-tech.com');
  await page1.getByRole('textbox', { name: 'Password *' }).fill('rules@123!12');
  await page1.getByRole('button', { name: 'Log in' }).click();
  await page1.locator('[data-testid=":privacy-dialog:accept"]').click();
  await page1.getByRole('button', { name: 'Create' }).click();
  await page1.locator('[data-testid=":menu-item:"]').getByText('Onboarding').click();
  await page1.getByRole('button', { name: 'Fill form with AI' }).click();
  await page1.getByRole('button', { name: 'Next' }).click();

  // await page1.locator('[id="_mioa57pjx-field"]').getByText('Drop or choose files').click();
  // await page1.getByRole('button', { name: 'Upload Driving License' }).setInputFiles('1  - Copy.pdf');
  // await page1.locator('[id="_knml3idyf-field"]').getByText('Drop or choose files').click();
  // await page1.getByRole('button', { name: 'Upload Passport' }).setInputFiles('2- Copy .pdf');

    // ---- uploads (direct to input; no native dialog)
  await page1.getByLabel('Upload Driving License')
    .setInputFiles('C:/Vineeti/Project/Upload Documents/FOLDER TO UPLOAD/1  - Copy.pdf');
  await page1.getByLabel('Upload Passport')
    .setInputFiles('C:/Vineeti/Project/Upload Documents/FOLDER TO UPLOAD/2- Copy .pdf');



  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.getByRole('button', { name: 'Next' }).click();


//   // ---- wait for case view to settle (overlay gone) then assert
//   await page1.waitForLoadState('domcontentloaded');
//   await page1
//     .locator('[aria-busy="true"], .loadingMask, [data-test-id="app-shell-spinner"]')
//     .waitFor({ state: 'detached', timeout: 15_000 })
//     .catch(() => {});

//   await test.step('Verify case is Resolved-Completed', async () => {
//     const status = page1.getByText('Resolved-Completed').first(); // ✅ on page1
//     await expect(status).toBeVisible({ timeout: 30_000 });
//     await expect(status).toContainText('Resolved-Completed');
//   });

//   // ✅ ADD DEBUG SCREENSHOT HERE
// await page1.screenshot({ path: 'debug-before-case-id.png', fullPage: true });

  // ---- capture case ID (✅ from page1) and attach to report
  const idLocator = page1.getByTestId(':case-view:subheading');
  await expect(idLocator).toBeVisible({ timeout: 30_000 });
  const onboardingCaseID = (await idLocator.textContent() || '').trim();
  console.log('Onboarding case ID:', onboardingCaseID);
  await testInfo.attach('onboardingCaseID.txt', {
    body: onboardingCaseID,
    contentType: 'text/plain',
  });

  // optional: also persist to this test’s output folder
  await fs.writeFile(
    testInfo.outputPath('onboarding-ids.json'),
    JSON.stringify({ onboardingCaseID }, null, 2)
  );

  // ---- attach browser console log
  if (logs.length) {
    await testInfo.attach('browser-console.log', {
      body: logs.join('\n'),
      contentType: 'text/plain',
    });
  }

  // ---- logout
  await page1.getByRole('banner').getByRole('button', { name: 'HospitalAdmin' }).click();
  await page1.getByText('Log off').click();
});
