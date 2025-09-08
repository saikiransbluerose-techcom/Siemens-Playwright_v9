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

//await page.pause();
await page.waitForTimeout(5000);
await page.locator('[data-test-id="202107280807300617678"]').click();
  await page.getByRole('button', { name: 'Toggle Left Navigation' }).click();
  await page.getByRole('menuitem', { name: ' New' }).click();
  await page.getByRole('menuitem', { name: 'Start Workflow' }).click();



 const gadget = page.frameLocator('iframe[name="PegaGadget1Ifr"]');

  await gadget.getByTestId('20150901090134014230100').selectOption('SIE-GWSS-Work-IDT-Flow');
  await gadget.getByTestId('20150901090134014631857').selectOption('Automation Pilot Workflow');
  await gadget.getByRole('button', { name: 'Start Workflow' }).click();
  await gadget.getByRole('combobox', { name: 'Item No. / Index' }).click();
  await gadget.getByRole('combobox', { name: 'Item No. / Index' }).fill('11');
  await gadget.getByRole('combobox', { name: 'Item No. / Index' }).press('Tab');
  await gadget.getByRole('combobox', { name: 'Article title' }).fill('test');
  await gadget.getByRole('combobox', { name: 'Article title' }).press('Tab');
  await gadget.getByRole('textbox', { name: 'Specification / Target state' }).fill('TA');
  await gadget.getByRole('textbox', { name: 'Specification / Target state' }).press('Tab');
  await gadget.getByRole('textbox', { name: 'Description of the deviation' }).fill('VV');
  await gadget.getByRole('textbox', { name: 'Description of the deviation' }).press('Tab');
  await gadget.getByRole('textbox', { name: 'Number of parts checked' }).fill('10');
  await gadget.getByRole('textbox', { name: 'Number of parts checked' }).press('Tab');
  await gadget.getByRole('textbox', { name: 'Failure rate' }).fill('1');
  await gadget.getByRole('textbox', { name: 'Failure rate' }).press('Tab');
  await gadget.getByLabel('Is the cause known?').selectOption('Yes');
  await gadget.getByLabel('Corrective action defined?').selectOption('Yes');
  await gadget.getByRole('textbox', { name: 'Quantity' }).click();
  await gadget.getByRole('textbox', { name: 'Quantity' }).fill('9');
  await gadget.getByRole('textbox', { name: 'Quantity' }).press('Tab');
  await gadget.getByTestId('20200701144756084279306-DatePicker').click();
  await gadget.getByRole('button', { name: 'Aug 23,' }).click();
  await gadget.getByRole('textbox', { name: 'Change number' }).click();
  await gadget.getByRole('textbox', { name: 'Change number' }).fill('1');
  await gadget.getByTestId('20160721092326035219972').click();
  await gadget.getByTestId('2016072109335505834280').click();
  await gadget.getByTestId('2016072109335505834280').fill('10');
  await gadget.getByRole('textbox', { name: '3D - Corrective measures' }).click();
  await gadget.getByRole('textbox', { name: '3D - Corrective measures' }).fill('5');
  await gadget.getByRole('textbox', { name: 'Affected customer and / or' }).click();
  await gadget.getByRole('textbox', { name: 'Affected customer and / or' }).fill('1');
  await gadget.getByLabel('Causing process').selectOption('Design');
  await gadget.getByLabel('Requirements for special').selectOption('No');
  await gadget.getByLabel('Is there a need for changes').selectOption('No');
  await gadget.getByLabel('Does the delivery to the').selectOption('No');
  await gadget.getByRole('textbox', { name: 'Corrective action' }).click();
  await gadget.getByRole('textbox', { name: 'Corrective action' }).fill('Test');

  await gadget.getByTestId('2015111614330806168211').click();
  //await gadget.getByLabel('Select file(s)').click();
  
  const filePath = 'C:/Vineeti/Project/Upload Documents/FOLDER TO UPLOAD/1  - Copy.pdf';  
  await gadget.getByLabel('Select file(s)').setInputFiles(filePath);

  await gadget.getByRole('button', { name: 'Attach' }).click();

  page1.pause();

  await gadget.getByTestId('20150908171228012736690').click();

  await gadget.getByTestId('201909111935010721260-R1-L1R1').getByTestId('20151130155332032025152').click();
  await gadget.getByTestId('201909111935010721260-R1-L1R1').locator('i').nth(1).click();
  await gadget.getByRole('textbox', { name: 'Lastname, Firstname,' }).click();
  await gadget.getByRole('textbox', { name: 'Lastname, Firstname,' }).fill('Z003M3XH');
  await gadget.getByText('ACES Testuser01 / IT APS LCW').click();

  await gadget.getByTestId('201909111935010721260-R2-L1R1').getByTestId('20151130155332032025152').click();
  await gadget.getByTestId('201909111935010721260-R2-L1R1').locator('i').nth(1).click();
  await gadget.getByRole('textbox', { name: 'Lastname, Firstname,' }).click();
  await gadget.getByRole('textbox', { name: 'Lastname, Firstname,' }).fill('Z003M3XE');
  await gadget.getByText('ACES Testuser02 / IT APS LCW').click();

  await gadget.getByTestId('201909111935010721260-R2-L1R2').getByTestId('20151130155332032025152').click();
  await gadget.getByTestId('201909111935010721260-R2-L1R2').locator('i').nth(1).click();
  await gadget.getByRole('textbox', { name: 'Lastname, Firstname,' }).click();
  await gadget.getByRole('textbox', { name: 'Lastname, Firstname,' }).fill('Z003M3XD');
  await gadget.getByText('ACES Testuser03 / IT APS LCW').click();


  await gadget.getByTestId('20150908171228012736690').click();
  await gadget.getByRole('link', { name: 'Add user', exact: true }).click();
  await gadget.getByRole('textbox', { name: 'Lastname, Firstname,' }).click();
  await gadget.getByRole('textbox', { name: 'Lastname, Firstname,' }).fill('Z003TKKM');
  await gadget.getByText('ACES Testuser04 / IT APS LCW').click();

  await gadget.getByTestId('201609080744500837333').click();
  //await gadget.getByTestId('20160908075844034240762').click();
  await gadget.getByTestId('20160908075844034240762').click();
  await gadget.getByTestId('20160908075844034240762').fill('vineeti_hemdani@bluerose-tech.com');
  await gadget.getByTestId('20150908171228012736690').click();
  await gadget.locator('#pyFlowActionHTML div').filter({ hasText: 'Review the information below before submitting. Work details Case details' }).first().click();
  await gadget.getByRole('button', { name: 'Submit workflow' }).click();
  // await expect(gadget.getByTestId('20141009112850013217103')).toBeVisible();
  // await expect(gadget.getByTestId('2016083016191602341167946').nth(3)).toBeVisible();
  // await expect(gadget.getByTestId('201801251600250686412485')).toBeVisible();
  // await expect(gadget.getByTestId('201801251600250686412485')).toBeVisible();

  // capture Case ID
//  const CASE_ID_TESTID = '20141009112850013217103';

// const caseIdSpan = page.getByTestId(CASE_ID_TESTID);
// await expect(caseIdSpan).toBeVisible();

// // e.g. "(APW-50)" → "APW-50"
// const raw = (await caseIdSpan.textContent())?.trim() ?? '';
// const caseId = (raw.match(/\(([^)]+)\)/) || [])[1] ?? raw.replace(/[()]/g, '');

// console.log('Captured Case ID:', caseId);
// await expect(caseIdSpan).toHaveText(/\(APW-\d+\)/);


// // --- Status badge e.g. "OPEN"
// const statusEl = page.getByTestId('2016083016191602341167946').first();
// // If multiple badges exist on the page, prefer filtering by likely values:
// /// const statusEl = page.getByTestId('2016083016191602341167946').filter({ hasText: /\b(OPEN|DRAFT|RESOLVED|APPROVED|REJECTED|CLOSED)\b/i }).first();

// await expect(statusEl).toBeVisible();
// const status = (await statusEl.innerText()).trim();
// console.log('status:', status);


 // If the span is inside the gadget iframe:
const caseIdSpan = page
  .frameLocator('iframe[name="PegaGadget1Ifr"]')
  .getByTestId('20141009112850013217103');

// Wait for it and extract the text "(APW-50)"
await expect(caseIdSpan).toBeVisible();

const raw = (await caseIdSpan.textContent())?.trim() ?? '';
// Prefer the text inside the parentheses
const match = raw.match(/\(([^)]+)\)/);
const caseId = match ? match[1] : raw.replace(/[()]/g, '');

console.log('Captured Case ID:', caseId);

// Use it later in the same test
// e.g., type it somewhere or assert a pattern
await expect(caseIdSpan).toHaveText(/\(APW-\d+\)/);

 await gadget.getByTestId('201801251600250686412485').click();
  await page.getByTestId('202203110911550900696').click();



  
});