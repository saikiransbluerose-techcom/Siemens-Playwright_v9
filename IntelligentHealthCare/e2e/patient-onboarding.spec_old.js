const { test, expect } = require('@playwright/test');

test('Patient Onboarding flow for IntelligentHealthCare', async ({ browser }) => {
  // Use browser context to handle popup manually
  const context = await browser.newContext();
  const page = await context.newPage();

  // Step 1: Go to Pega Labs system URL
  await page.goto('https://pegalabs.pega.com/ui/system/cddd8f50-0220-47b5-9954-62beb8c85e1b', {
    waitUntil: 'networkidle',
  });

  // ⚠️ Ensure JavaScript is enabled and ad blockers are off
  await page.waitForTimeout(2000); // Allow JS to load

  // Verify we're on the correct page
  await expect(page.getByText('Pega Infinity')).toBeVisible();

  // Step 2: Click "Open" link (triggers popup/new tab)
  const [popup] = await Promise.all([
    page.waitForEvent('popup'), // Wait for popup
    page.getByRole('link', { name: 'Open' }).click(),
  ]);

  const page1 = popup;

  // Step 3: Wait for popup to navigate and show "Pega Infinity" link
  await page1.waitForLoadState('networkidle');
  await page1.getByRole('link', { name: 'Pega Infinity' }).click();

  // Step 4: Now inside the actual Pega app – wait for login screen
  try {
    await page1.waitForURL('**/authlogin**', { timeout: 15000 });
  } catch (e) {
    console.warn('Did not detect authlogin URL, checking for login fields...');
  }

  // Step 5: Application login
  await page1.getByPlaceholder('User name').fill('HospitalAdmin@bluerose-tech.com');
  await page1.getByPlaceholder('Password', { exact: true }).fill('rules@123!12');
  await page1.getByRole('button', { name: 'Log in' }).click();

  // Wait for home screen or dashboard
  await page1.getByRole('button', { name: 'Create', exact: true }).waitFor({ state: 'visible', timeout: 20000 });

  // Step 6: Accept privacy dialog if present
  if (await page1.getByTestId(':privacy-dialog:accept').isVisible({ timeout: 5000 })) {
    await page1.getByTestId(':privacy-dialog:accept').click();
  }

  // Step 7: Start Onboarding case
  await page1.getByLabel('Create', { exact: true }).click();
  await page1.getByTestId(':menu-item:').getByText('Onboarding').click();
  await page1.getByRole('button', { name: 'Fill form with AI' }).click();

  // Wait for form to load
  await page1.waitForSelector('button:has-text("Next")', { state: 'visible', timeout: 30000 });

  // Step 8: Fill personal info
  await page1.getByTestId('First Name:input:control').fill('Vin');
  await page1.getByTestId('Last Name:input:control').fill('Test');
  await page1.getByTestId('Address Line 1:input:control').fill('testing');
  await page1.getByTestId('City:input:control').fill('Munich');

  // ✅ Use selectOption for Pega date fields (they are often dropdowns)
  // If fill() fails, these are likely <select> dropdowns, not inputs
  await page1.getByTestId(':date-input:control-month').selectOption('8');  // value or label
  await page1.getByTestId(':date-input:control-day').selectOption('27');
  await page1.getByTestId(':date-input:control-year').selectOption('1987');

  await page1.getByTestId('Email Address:input:control').fill('vineeti@test.com');
  await page1.getByTestId('Zip Code:input:control').fill('12345');

  // Step 9: Click Next
  await page1.getByRole('button', { name: 'Next' }).click();

  // Step 10: Upload documents
  await page1.getByLabel('Upload Driving License').setInputFiles(
    'C:/Vineeti/Project/Upload Documents/FOLDER TO UPLOAD/1  - Copy.pdf'
  );
  await page1.getByLabel('Upload Passport').setInputFiles(
    'C:/Vineeti/Project/Upload Documents/FOLDER TO UPLOAD/2- Copy .pdf'
  );

  // Step 11: Click Next 3 times
  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.getByRole('button', { name: 'Next' }).click();

  // Step 12: Validate completion
  const statusElement = page1.getByText('Resolved-Completed').first();
  await expect(statusElement).toBeVisible();
  await expect(statusElement).toHaveText(/Resolved-Completed/);

  console.log('✅ Onboarding Case is closed with Status: Resolved-Completed');

  // Step 13: Extract Case ID
  const caseIdElement = page1.getByTestId(':case-view:subheading');
  await caseIdElement.waitFor({ state: 'visible' });
  const onboardingCaseID = (await caseIdElement.textContent()).trim();
  console.log('🆔 Onboarding Case ID:', onboardingCaseID);

  // Step 14: Logout
  await page1.getByRole('banner').getByRole('button', { name: 'HospitalAdmin' }).click();
  await page1.getByText('Log off').click();

  // Cleanup
  await context.close();
});