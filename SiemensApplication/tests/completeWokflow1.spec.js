import path from 'path';
import { test, expect } from '@playwright/test';
import { authenticator } from 'otplib';

const TOTP_SECRET = process.env.TOTP_SECRET || 'MNAEAQDLMV2USSTDJFCWYTZTEUWDKMKW';

test('test', async ({ page }) => {
  test.slow();
  test.setTimeout(5 * 60 * 1000);

  await page.goto('https://siemens-dev1.pegacloud.com/prweb/PRAuth/app/GWSS/WufOMs17lxZjy1fI-RH7kXW6DtwPXjuN*/!STANDARD?pzuiactionrrr=CXtpbn1yblhJcEYzRHZaSUFPUGUvcE5ZV2xqTS9rSHJKSTQreE9CL1Zaa3FPZDI2MFZ6dUY2MzVJek5OdklKYWZ4S3hXc082OHRHVVg3VGZmRE8rYnkxM2xvZz09*');
  await page.getByRole('link', { name: 'Login with SiemensID' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('vineeti_hemdani@bluerose-tech.com');
  await page.getByRole('button', { name: 'Continue' }).click();

  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Vani@44112011');
  await page.getByRole('button', { name: 'Log in' }).click();

  // MFA
  await page.getByRole('textbox', { name: 'Enter your one-time code' }).waitFor();
  authenticator.options = { step: 30, digits: 6, window: 1 };
  const code = authenticator.generate(TOTP_SECRET);
  console.log('TOTP:', code);
  await page.getByRole('textbox', { name: 'Enter your one-time code' }).fill(code);
  await page.getByRole('button', { name: 'Continue' }).click();

  // Open "Start Workflow"
  await page.waitForTimeout(5000);
  await page.locator('[data-test-id="202107280807300617678"]').click();
  await expect(page.getByRole('button', { name: 'Toggle Left Navigation' })).toBeVisible({ timeout: 20000 });
  await page.getByRole('button', { name: 'Toggle Left Navigation' }).click();
  await page.getByRole('menuitem', { name: ' New' }).click();
  await page.getByRole('menuitem', { name: 'Start Workflow' }).click();

  // ===== Creator session (u0) =====
  const u0 = await getGadgets(page);
  await u0.gadget1.getByTestId('20150901090134014230100').selectOption('SIE-GWSS-Work-IDT-Flow');
  await u0.gadget1.getByTestId('20150901090134014631857').selectOption('Automation Pilot Workflow');
  await u0.gadget1.getByRole('button', { name: 'Start Workflow' }).click();

  await u0.gadget1.getByRole('combobox', { name: 'Item No. / Index' }).click();
  await u0.gadget1.getByRole('combobox', { name: 'Item No. / Index' }).fill('11');
  await u0.gadget1.getByRole('combobox', { name: 'Item No. / Index' }).press('Tab');
  await u0.gadget1.getByRole('combobox', { name: 'Article title' }).fill('test');
  await u0.gadget1.getByRole('combobox', { name: 'Article title' }).press('Tab');
  await u0.gadget1.getByRole('textbox', { name: 'Specification / Target state' }).fill('TA');
  await u0.gadget1.getByRole('textbox', { name: 'Specification / Target state' }).press('Tab');
  await u0.gadget1.getByRole('textbox', { name: 'Description of the deviation' }).fill('VV');
  await u0.gadget1.getByRole('textbox', { name: 'Description of the deviation' }).press('Tab');
  await u0.gadget1.getByRole('textbox', { name: 'Number of parts checked' }).fill('10');
  await u0.gadget1.getByRole('textbox', { name: 'Number of parts checked' }).press('Tab');
  await u0.gadget1.getByRole('textbox', { name: 'Failure rate' }).fill('1');
  await u0.gadget1.getByRole('textbox', { name: 'Failure rate' }).press('Tab');
  await u0.gadget1.getByLabel('Is the cause known?').selectOption('Yes');
  await u0.gadget1.getByLabel('Corrective action defined?').selectOption('Yes');
  await u0.gadget1.getByRole('textbox', { name: 'Quantity' }).click();
  await u0.gadget1.getByRole('textbox', { name: 'Quantity' }).fill('9');
  await u0.gadget1.getByRole('textbox', { name: 'Quantity' }).press('Tab');
  await u0.gadget1.getByTestId('20200701144756084279306-DatePicker').click();
  await u0.gadget1.getByRole('button', { name: 'Aug 23,' }).click();
  await u0.gadget1.getByRole('textbox', { name: 'Change number' }).click();
  await u0.gadget1.getByRole('textbox', { name: 'Change number' }).fill('1');
  await u0.gadget1.getByTestId('20160721092326035219972').click();
  await u0.gadget1.getByTestId('2016072109335505834280').click();
  await u0.gadget1.getByTestId('2016072109335505834280').fill('10');
  await u0.gadget1.getByRole('textbox', { name: '3D - Corrective measures' }).click();
  await u0.gadget1.getByRole('textbox', { name: '3D - Corrective measures' }).fill('5');
  await u0.gadget1.getByRole('textbox', { name: 'Affected customer and / or' }).click();
  await u0.gadget1.getByRole('textbox', { name: 'Affected customer and / or' }).fill('1');
  await u0.gadget1.getByLabel('Causing process').selectOption('Design');
  await u0.gadget1.getByLabel('Requirements for special').selectOption('No');
  await u0.gadget1.getByLabel('Is there a need for changes').selectOption('No');
  await u0.gadget1.getByLabel('Does the delivery to the').selectOption('No');
  await u0.gadget1.getByRole('textbox', { name: 'Corrective action' }).click();
  await u0.gadget1.getByRole('textbox', { name: 'Corrective action' }).fill('Test');

  // Upload
  await u0.gadget1.getByTestId('2015111614330806168211').click();
  const filePath = 'C:/Vineeti/Project/Upload Documents/FOLDER TO UPLOAD/1  - Copy.pdf';
  await u0.gadget1.getByLabel('Select file(s)').setInputFiles(filePath);
  await u0.gadget1.getByRole('button', { name: 'Attach' }).click();

  // Assignees
  await u0.gadget1.getByTestId('20150908171228012736690').click();
  await u0.gadget1.getByTestId('201909111935010721260-R1-L1R1').getByTestId('20151130155332032025152').click();
  await u0.gadget1.getByTestId('201909111935010721260-R1-L1R1').locator('i').nth(1).click();
  await u0.gadget1.getByRole('textbox', { name: 'Lastname, Firstname,' }).fill('Z003M3XH');
  await u0.gadget1.getByText('ACES Testuser01 / IT APS LCW').click();

  await u0.gadget1.getByTestId('201909111935010721260-R2-L1R1').getByTestId('20151130155332032025152').click();
  await u0.gadget1.getByTestId('201909111935010721260-R2-L1R1').locator('i').nth(1).click();
  await u0.gadget1.getByRole('textbox', { name: 'Lastname, Firstname,' }).fill('Z003M3XE');
  await u0.gadget1.getByText('ACES Testuser02 / IT APS LCW').click();

  await u0.gadget1.getByTestId('201909111935010721260-R2-L1R2').getByTestId('20151130155332032025152').click();
  await u0.gadget1.getByTestId('201909111935010721260-R2-L1R2').locator('i').nth(1).click();
  await u0.gadget1.getByRole('textbox', { name: 'Lastname, Firstname,' }).fill('Z003M3XD');
  await u0.gadget1.getByText('ACES Testuser03 / IT APS LCW').click();

  await u0.gadget1.getByTestId('20150908171228012736690').click();
  await u0.gadget1.getByRole('link', { name: 'Add user', exact: true }).click();
  await u0.gadget1.getByRole('textbox', { name: 'Lastname, Firstname,' }).fill('Z003TKKM');
  await u0.gadget1.getByText('ACES Testuser04 / IT APS LCW').click();
  await u0.gadget1.getByTestId('201609080744500837333').click();
  await u0.gadget1.getByTestId('20160908075844034240762').click();
  await u0.gadget1.getByTestId('20160908075844034240762').fill('vineeti_hemdani@bluerose-tech.com');

  // Submit
  await u0.gadget1.getByTestId('20150908171228012736690').click();
  await u0.gadget1.locator('#pyFlowActionHTML div')
    .filter({ hasText: 'Review the information below before submitting. Work details Case details' })
    .first().click();
  await u0.gadget1.getByRole('button', { name: 'Submit workflow' }).click();

  // Case ID
  const caseIdSpan = u0.gadget1.getByTestId('20141009112850013217103');
  await expect(caseIdSpan).toBeVisible();
  const raw = (await caseIdSpan.textContent())?.trim() ?? '';
  const match = raw.match(/\(([^)]+)\)/);
  const caseId = match ? match[1] : raw.replace(/[()]/g, '');
  console.log('Captured Case ID:', caseId);
  await expect(caseIdSpan).toHaveText(/\(APW-\d+\)/);

  await u0.gadget1.getByTestId('201801251600250686412485').click();
  await page.getByTestId('202203110911550900696').click();

  // ===== Switch user 1 (u1) =====
  await page.goto('https://siemens-dev1.pegacloud.com/prweb/');
  await page.getByRole('textbox', { name: 'User name *' }).fill('Z003M3XH');
  await page.getByRole('textbox', { name: 'Password *' }).fill('Siemens@123Siemens@123Siemens@123');
  await page.getByRole('button', { name: 'Log in' }).click();

  const u1 = await getGadgets(page);
  await expect(
    u1.gadget0.getByTestId('20141008144226093346187').getByRole('link', { name: 'Click to filter' })
  ).toBeVisible({ timeout: 15000 });
  await u1.gadget0.getByTestId('20141008144226093346187').getByRole('link', { name: 'Click to filter' }).click();
  await u1.gadget0.getByTestId('201411181100280377101613').click();
  await u1.gadget0.getByTestId('201411181100280377101613').fill(caseId);
  await u1.gadget0.getByTestId('filterPopupOkButton').click();
  await u1.gadget0.getByTestId('20141008144226093953391').click();

  await u1.gadget1.getByRole('button', { name: 'Edit Fields' }).click();
  await u1.gadget1.locator('select[name="$PInitialFormTemp$pTaskPriorityRatingsPageList$l3$pTask_ImpactProductPlant"]').selectOption('Very High');
  await u1.gadget1.locator('select[name="$PInitialFormTemp$pTaskPriorityRatingsPageList$l3$pTask_PredictionOfOccurrence"]').selectOption('Medium');
  await u1.gadget1.locator('select[name="$PInitialFormTemp$pTaskPriorityRatingsPageList$l3$pTask_DiscoveryAbility"]').selectOption('High');
  await u1.gadget1.locator('#bcf73433').fill('Test');
  await u1.gadget1
    .locator('[data-test-id="202001221218350042646"] [data-test-id="202406271456180413143-R3"]')
    .getByRole('cell', { name: 'Please Select...' })
    .locator('[data-test-id="2016072109335505834280"]').selectOption('No');
  await u1.gadget1.locator('input[name="$PInitialFormTemp$pTaskPriorityRatingsPageList$l3$pTask_Remarks"]').fill('Testing');
  await u1.gadget1.getByTestId('20150908171228012330958').click();
  await u1.gadget1.getByTestId('20151221093021020184414').fill('Approved Stage 1');
  await u1.gadget1.getByTestId('2015090805444404955925').click();
  await u1.gadget1.getByTestId('201801251600250687413552').click();
  await page.getByTestId('202203110911550900696').click();

  // ===== Switch user 2 (u2) =====
  await page.goto('https://siemens-dev1.pegacloud.com/prweb/app/default/WufOMs17lxZjy1fI-RH7kXW6DtwPXjuN*/!STANDARD');
  await page.getByRole('textbox', { name: 'User name *' }).fill('Z003M3XE');
  await page.getByRole('textbox', { name: 'Password *' }).fill('Siemens@123Siemens@123Siemens@123');
  await page.getByRole('button', { name: 'Log in' }).click();

  const u2 = await getGadgets(page);
  await u2.gadget0.getByTestId('20141008144226093346187').getByRole('link', { name: 'Click to filter' }).click();
  await u2.gadget0.getByTestId('201411181100280377101613').click();
  await u2.gadget0.getByTestId('201411181100280377101613').fill(caseId);
  await u2.gadget0.getByTestId('filterPopupOkButton').click();
  await u2.gadget0.getByTestId('20141008144226093953391').click();

  await u2.gadget1.getByRole('button', { name: 'Edit Fields' }).click();
  await u2.gadget1.locator('select[name="$PInitialFormTemp$pImpactProductPlant"]').selectOption('High');
  await u2.gadget1.locator('select[name="$PInitialFormTemp$pPredictionOfOccurrence"]').selectOption('Medium');
  await u2.gadget1.locator('select[name="$PInitialFormTemp$pDiscoveryAbility"]').selectOption('Low');
  await u2.gadget1.getByLabel('Define action priority by AP-').selectOption('Low');
  await u2.gadget1.getByLabel('Is customer approval required?').selectOption('No');
  await u2.gadget1.locator('select[name="$PInitialFormTemp$pReleaseRecommendation"]').selectOption('No');
  await u2.gadget1.getByTestId('20150908171228012330958').click();
  await u2.gadget1.getByTestId('20151221093021020184414').fill('Approved Stage 2 Approval 1');
  await u2.gadget1.getByTestId('2015090805444404955925').click();
  await u2.gadget1.getByTestId('201801251600250687413552').click();
  await page.getByTestId('202203110911550900696').click();
  await page.getByRole('link', { name: 'here' }).click();

  // ===== Switch user 3 (u3) =====
  await page.goto('https://siemens-dev1.pegacloud.com/prweb/app/default/WufOMs17lxZjy1fI-RH7kXW6DtwPXjuN*/!STANDARD');
  await page.getByRole('textbox', { name: 'User name *' }).fill('Z003M3XD');
  await page.getByRole('textbox', { name: 'Password *' }).fill('Siemens@123Siemens@123Siemens@123');
  await page.getByRole('button', { name: 'Log in' }).click();

  const u3 = await getGadgets(page);
  await u3.gadget0.getByTestId('20141008144226093346187').getByRole('link', { name: 'Click to filter' }).click();
  await u3.gadget0.getByTestId('201411181100280377101613').click();
  await u3.gadget0.getByTestId('201411181100280377101613').fill(caseId);
  await u3.gadget0.getByTestId('filterPopupOkButton').click();
  await u3.gadget0.getByTestId('20141008144226093953391').click();

  await u3.gadget1.getByRole('button', { name: 'Edit Fields' }).click();
  await u3.gadget1.locator('select[name="$PInitialFormTemp$pImpactProductPlant"]').selectOption('Very High');
  await u3.gadget1.locator('select[name="$PInitialFormTemp$pPredictionOfOccurrence"]').selectOption('High');
  await u3.gadget1.locator('select[name="$PInitialFormTemp$pDiscoveryAbility"]').selectOption('High');
  await u3.gadget1.getByLabel('Define action priority by AP-').selectOption('Medium');
  await u3.gadget1.getByLabel('Is customer approval required?').selectOption('No');
  await u3.gadget1.locator('select[name="$PInitialFormTemp$pReleaseRecommendation"]').selectOption('Yes');
  await u3.gadget1.getByTestId('20150908171228012330958').click();

  await page.waitForTimeout(500);
  await u3.gadget1.getByTestId('20151221093021020184414').fill('Approved Stage 2 -Approval 2');
  await u3.gadget1.getByTestId('2015090805444404955925').click();
  await u3.gadget1.getByTestId('201801251600250687413552').click();

  // Overview / Audit
  await u3.gadget2.getByText('Overview').click();
  await u3.gadget2.locator('[data-test-id="202105050818560080933_header"]').getByText('Case details').click();
  await u3.gadget2.getByText('Audit').click();
  await page.getByTestId('202203110911550900696').click();
});

// --- helper ---
/** @param {import('@playwright/test').Page} page */
async function getGadgets(page) {
  await page.waitForLoadState('domcontentloaded');
  return {
    gadget0: page.frameLocator('iframe[name="PegaGadget0Ifr"]'),
    gadget1: page.frameLocator('iframe[name="PegaGadget1Ifr"]'),
    gadget2: page.frameLocator('iframe[name="PegaGadget2Ifr"]'),
  };
}

