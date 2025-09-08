import { test, expect } from '@playwright/test';
import { authenticator } from 'otplib';

test.use({ actionTimeout: 30_000 });

const TOTP_SECRET = process.env.TOTP_SECRET || 'MNAEAQDLMV2USSTDJFCWYTZTEUWDKMKW';

async function getGadgets(page) {
  await page.waitForLoadState('domcontentloaded');
  return {
    gadget0: page.frameLocator('iframe[name="PegaGadget0Ifr"]'),
    gadget1: page.frameLocator('iframe[name="PegaGadget1Ifr"]'),
    gadget2: page.frameLocator('iframe[name="PegaGadget2Ifr"]'),
  };
}

test('RiskStage submit + approvals (no filter; open via Recents)', async ({ page }) => {
  // ===== Login with SiemensID + MFA =====
  await page.goto('https://siemens-dev1.pegacloud.com/prweb/PRAuth/app/GWSS/WufOMs17lxZjy1fI-RH7kXW6DtwPXjuN*/!STANDARD?pzuiactionrrr=CXtpbn1yblhJcEYzRHZaSUFPUGUvcE5ZV2xqTS9rSHJKSTQreE9CL1Zaa3FPZDI2MFZ6dUY2MzVJek5OdklKYWZ4S3hXc082OHRHVVg3VGZmRE8rYnkxM2xvZz09*');
  await page.getByRole('link', { name: 'Login with SiemensID' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('vineeti_hemdani@bluerose-tech.com');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Vani@44112011');
  await page.getByRole('button', { name: 'Log in' }).click();

  await page.getByRole('textbox', { name: 'Enter your one-time code' }).waitFor();
  authenticator.options = { step: 30, digits: 6, window: 1 };
  const code = authenticator.generate(TOTP_SECRET);
  await page.getByRole('textbox', { name: 'Enter your one-time code' }).fill(code);
  await page.getByRole('button', { name: 'Continue' }).click();

  // ===== Navigate to Start Workflow =====
  await expect(page.getByRole('button', { name: 'Toggle Left Navigation' })).toBeVisible({ timeout: 20000 });
  await page.locator('[data-test-id="202107280807300617678"]').click();
  await page.getByRole('button', { name: 'Toggle Left Navigation' }).click();
  await page.getByRole('menuitem', { name: ' New' }).click();
  await page.getByRole('menuitem', { name: 'Start Workflow' }).click();

  // ===== RISK STAGE — kept as-is (including the refresh) =====
  const g1 = page.frameLocator('iframe[name="PegaGadget1Ifr"]');

  await g1.getByTestId('20150901090134014230100').selectOption('SIE-GWSS-Work-IDT-Flow');
  await g1.getByTestId('20150901090134014631857').selectOption('Automation Pilot Workflow');
  await g1.getByRole('button', { name: 'Start Workflow' }).click();

  await g1.getByRole('combobox', { name: 'Item No. / Index' }).click();
  await g1.getByRole('combobox', { name: 'Item No. / Index' }).fill('Test');
  await g1.getByRole('combobox', { name: 'Item No. / Index' }).press('Tab');
  await g1.getByRole('combobox', { name: 'Article title' }).fill('Test');
  await g1.getByRole('combobox', { name: 'Article title' }).press('Tab');

  await g1.getByRole('textbox', { name: 'Specification / Target state' }).fill('VA');
  await g1.getByRole('textbox', { name: 'Specification / Target state' }).press('Tab');
  await g1.getByRole('textbox', { name: 'Description of the deviation' }).fill('Test');
  await g1.getByRole('textbox', { name: 'Description of the deviation' }).press('Tab');
  await g1.getByRole('textbox', { name: 'Number of parts checked' }).fill('10');
  await g1.getByRole('textbox', { name: 'Number of parts checked' }).press('Tab');
  await g1.getByRole('textbox', { name: 'Failure rate' }).fill('1');

  await g1.getByLabel('Is the cause known?').selectOption('No');
  await g1.getByRole('textbox', { name: 'Lastname, Firstname,' }).click();
  await g1.getByRole('textbox', { name: 'Lastname, Firstname,' }).fill('Hemdani');
  await g1.getByText('Hemdani Vineeti / SIEMENS').click();

  await g1.getByLabel('Corrective action defined?').selectOption('Yes');
  await g1.getByRole('textbox', { name: 'Quantity' }).fill('11');
  await g1.getByRole('textbox', { name: 'Quantity' }).press('Tab');
  await g1.getByTestId('20200701144756084279306-DatePicker').click();
  await g1.getByRole('button', { name: 'Aug 26,' }).click();
  await g1.getByRole('textbox', { name: 'Change number' }).fill('1');
  await g1.getByTestId('20160721092326035219972').click();
  await g1.getByTestId('2016072109335505834280').click();
  await g1.getByTestId('2016072109335505834280').fill('10');
  await g1.getByRole('textbox', { name: '3D - Corrective measures' }).click();
  await g1.getByRole('textbox', { name: '3D - Corrective measures' }).fill('11');
  await g1.getByRole('textbox', { name: 'Affected customer and / or' }).click();
  await g1.getByRole('textbox', { name: 'Affected customer and / or' }).fill('2');
  await g1.getByLabel('Causing process').selectOption('Design');
  await g1.getByLabel('Requirements for special').selectOption('No');
  await g1.getByLabel('Is there a need for changes').selectOption('No');
  await g1.getByLabel('Does the delivery to the').selectOption('No');
  await g1.getByRole('textbox', { name: 'Root cause analysis' }).fill('Test');
  await g1.getByRole('textbox', { name: 'Corrective action' }).fill('Test');

  // Upload
  await g1.getByTestId('2015111614330806168211').click();
  await g1.getByLabel('Select file(s)').setInputFiles('C:/Vineeti/Project/Upload Documents/FOLDER TO UPLOAD/1  - Copy.pdf');
  await g1.getByRole('button', { name: 'Attach' }).click();

  // Next page
  await g1.getByTestId('20150908171228012736690').click();

   // Code to check extra Root Cause Stage is appearing
// Locators
const stageHeader = g1.getByRole('heading', { name: 'Root cause analyze', exact: true });
const stageBlock  = g1.locator('[data-test-id="201810251843350638136498"]');


// Assert the state change
await expect(stageHeader).toBeVisible();       // semantic check
await expect(stageBlock).toBeVisible();        // structural check

// (Optional) capture proof in the report
await test.info().attach('Root cause analyze State appears', {
  body: await stageBlock.screenshot(),
  contentType: 'image/png'
});

// bring it to the center and outline briefly
await stageBlock.scrollIntoViewIfNeeded();
await stageBlock.evaluate(el => { el.style.outline = '3px solid #FFD400'; });
await page.waitForTimeout(600);   // brief pause for demo
await stageBlock.evaluate(el => { el.style.outline = ''; });


  // Add Approvers
  await g1.getByTestId('201909111935010721260-R2-L1R1').getByTestId('20151130155332032025152').click();
  await g1.getByTestId('201909111935010721260-R2-L1R1').locator('i').nth(1).click();
  await g1.getByRole('textbox', { name: 'Lastname, Firstname,' }).fill('Z003M3XH');
  await g1.getByText('ACES Testuser01 / IT APS LCW').click();

  await g1.getByTestId('201909111935010721260-R3-L1R1').getByTestId('20151130155332032025152').click();
  await g1.getByTestId('201909111935010721260-R3-L1R1').locator('i').nth(1).click();
  await g1.getByRole('textbox', { name: 'Lastname, Firstname,' }).fill('Z003M3XE');
  await g1.getByText('ACES Testuser02 / IT APS LCW').click();

  await g1.getByTestId('201909111935010721260-R3-L1R2').getByTestId('20151130155332032025152').click();
  await g1.getByTestId('201909111935010721260-R3-L1R2').locator('i').nth(1).click();
  await g1.getByRole('textbox', { name: 'Lastname, Firstname,' }).fill('Z003M3XD');
  await g1.getByText('ACES Testuser03 / IT APS LCW').click();

  // --- This click takes you to the NEXT PAGE inside the iframe ---
  await g1.getByTestId('20150908171228012736690').click();

  //>>> RELIABLE WAIT for the next screen inside the iframe <<<
  //(pick an element that only exists on the next page)

  // *** critical refresh click you asked to keep ***
  await page.getByTestId('202108040831080324727').click();

  // re-grab gadget and finish RiskStage
  const g2 = page.frameLocator('iframe[name="PegaGadget1Ifr"]');
  await expect(g2.getByTestId('201609080744500837333')).toBeVisible({ timeout: 30000 });
  
  await g2.getByTestId('201609080744500837333').click();
  await g2.getByTestId('20160908075844034240762').fill('vineeti_hemdani@bluerose-tech.com');
  await g2.getByTestId('20150908171228012736690').click();

  await g2.locator('#pyFlowActionHTML div')
    .filter({ hasText: 'Review the information below before submitting. Work details Case details' })
    .first().click();
  await g2.getByRole('button', { name: 'Submit workflow' }).click();

  await g2.getByTestId('202203310845310836825').check();
  await g2.getByTestId('2016091407195807821936').fill('Notify');
  await g2.getByTestId('202203211023310169879').click();
  await g2.getByTestId('201609080744500837333').click();
  await g2.getByTestId('20160908075844034240762').fill('vineetihemdani009@gmail.com');
  await g2.getByRole('button', { name: 'Submit' }).click();
  await g2.getByRole('button', { name: 'Save & Send Comment' }).click();

  // --- Case ID retrieval ---
   //await page.getByTestId('202108040831080324727').click();
 
  const caseIdSpan = g2.getByTestId('20141009112850013217103');
  await expect(caseIdSpan).toBeVisible();
  const raw = (await caseIdSpan.textContent())?.trim() ?? '';
  const match = raw.match(/\(([^)]+)\)/);
  const caseId = match ? match[1] : raw.replace(/[()]/g, '');
  console.log('Captured Case ID:', caseId);
  await expect(caseIdSpan).toHaveText(/\(APW-\d+\)/);

  
  // Close
  await g2.getByTestId('201801251600250686412485').click();
  await page.getByTestId('202203110911550900696').click();

  // ===== APPROVALS — open case via Recents (no filter) =====

  // ---- Approver 1 (Z003M3XH) ----
  await page.goto('https://siemens-dev1.pegacloud.com/prweb/');
  await page.getByRole('textbox', { name: 'User name *' }).fill('Z003M3XH');
  await page.getByRole('textbox', { name: 'Password *' }).fill('Siemens@123Siemens@123Siemens@123');
  await page.getByRole('button', { name: 'Log in' }).click();

  // await expect(page.getByRole('link', { name: caseId, exact: true })).toBeVisible({ timeout: 20000 });
  // await page.getByRole('link', { name: caseId, exact: true }).click();

     const u1 = await getGadgets(page);
    await expect(
      u1.gadget0.getByTestId('20141008144226093346187').getByRole('link', { name: 'Click to filter' })
    ).toBeVisible({ timeout: 15000 });


  await u1.gadget0.getByTestId('20141008144226093346187').getByRole('link', { name: 'Click to filter' }).click();
  await u1.gadget0.getByTestId('201411181100280377101613').click();
  await u1.gadget0.getByTestId('201411181100280377101613').fill(caseId);
  await u1.gadget0.getByTestId('filterPopupOkButton').click();
  await u1.gadget0.getByTestId('20141008144226093953391').click();



    // comment + edit fields (your original choices)
    await u1.gadget1.getByTestId('20151221093021020184414').click();
    await u1.gadget1.getByTestId('20151221093021020184414').fill('Stage 1 Approval');
    await u1.gadget1.getByRole('button', { name: 'Edit Fields' }).click();
    await u1.gadget1.locator('select[name="$PInitialFormTemp$pTaskPriorityRatingsPageList$l3$pTask_ImpactProductPlant"]').selectOption('Very High');
    await u1.gadget1.locator('select[name="$PInitialFormTemp$pTaskPriorityRatingsPageList$l3$pTask_PredictionOfOccurrence"]').selectOption('Very High');
    await u1.gadget1.locator('select[name="$PInitialFormTemp$pTaskPriorityRatingsPageList$l3$pTask_DiscoveryAbility"]').selectOption('Medium');
    await u1.gadget1.locator('#bcf73433').fill('High');
    await u1.gadget1.getByTestId('2015090805444404955925').click();
    await u1.gadget1.getByTestId('201801251600250686412485').click();
    await page.getByTestId('202203110911550900696').click();

  






  // ---- Approver 2 (Z003M3XE) ----
  await page.goto('https://siemens-dev1.pegacloud.com/prweb/app/default/WufOMs17lxZjy1fI-RH7kXW6DtwPXjuN*/!STANDARD');
  await page.getByRole('textbox', { name: 'User name *' }).fill('Z003M3XE');
  await page.getByRole('textbox', { name: 'Password *' }).fill('Siemens@123Siemens@123Siemens@123');
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page.getByRole('link', { name: caseId, exact: true })).toBeVisible({ timeout: 20000 });
  await page.getByRole('link', { name: caseId, exact: true }).click();

  {
    const u2 = await getGadgets(page);

    await u2.gadget1.getByRole('button', { name: 'Edit Fields' }).click();
    await u2.gadget1.locator('select[name="$PInitialFormTemp$pImpactProductPlant"]').selectOption('High');
    await u2.gadget1.locator('select[name="$PInitialFormTemp$pPredictionOfOccurrence"]').selectOption('Low');
    await u2.gadget1.locator('select[name="$PInitialFormTemp$pDiscoveryAbility"]').selectOption('High');
    await u2.gadget1.getByLabel('Define action priority by AP-').selectOption('High');
    await u2.gadget1.getByLabel('Is customer approval required?').selectOption('No');
    await u2.gadget1.locator('select[name="$PInitialFormTemp$pReleaseRecommendation"]').selectOption('No');
    await u2.gadget1.getByTestId('20150908171228012330958').click();
    await u2.gadget1.getByTestId('20151221093021020184414').fill('Stage 2 Approval 1');
    await u2.gadget1.getByTestId('2015090805444404955925').click();
    await u2.gadget1.getByTestId('201801251600250686412485').click();
    await page.getByTestId('202203110911550900696').click();
    await page.getByRole('link', { name: 'here' }).click(); // keep your return step
  }

  // ---- Approver 3 (Z003M3XD) ----
  await page.goto('https://siemens-dev1.pegacloud.com/prweb/app/default/WufOMs17lxZjy1fI-RH7kXW6DtwPXjuN*/!STANDARD');
  await page.getByRole('textbox', { name: 'User name *' }).fill('Z003M3XD');
  await page.getByRole('textbox', { name: 'Password *' }).fill('Siemens@123Siemens@123Siemens@123');
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page.getByRole('link', { name: caseId, exact: true })).toBeVisible({ timeout: 20000 });
  await page.getByRole('link', { name: caseId, exact: true }).click();

  {
    const u3 = await getGadgets(page);

    await u3.gadget1.getByRole('button', { name: 'Edit Fields' }).click();
    await u3.gadget1.locator('select[name="$PInitialFormTemp$pPredictionOfOccurrence"]').selectOption('Medium');
    await u3.gadget1.locator('select[name="$PInitialFormTemp$pDiscoveryAbility"]').selectOption('Medium');
    await u3.gadget1.getByLabel('Define action priority by AP-').selectOption('Medium');
    await u3.gadget1.getByTestId('20150908171228012330958').click();
    await u3.gadget1.getByTestId('20151221093021020184414').fill('Stage 2 Approval 2');
    await u3.gadget1.getByTestId('2015090805444404955925').click();
    await u3.gadget1.getByTestId('201801251600250687413552').click();

    // optional: overview/audit proof
    await expect(u3.gadget2.getByText('Overview')).toBeVisible({ timeout: 15000 });

    await page.getByTestId('202203110911550900696').click();
  }
});
