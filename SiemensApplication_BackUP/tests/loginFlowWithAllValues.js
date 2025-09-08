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


  await gadget.locator('[data-test-id="20150901090134014230100"]').selectOption('SIE-GWSS-Work-IDT-Flow');
  await gadget.locator('[data-test-id="20150901090134014631857"]').selectOption('Automation Pilot Workflow');

  
  await gadget.getByRole('button', { name: 'Start Workflow' }).click();
  await gadget.getByRole('combobox', { name: 'Item No. / Index' }).click();
  await gadget.getByRole('combobox', { name: 'Item No. / Index' }).fill('12');
  await gadget.getByRole('combobox', { name: 'Item No. / Index' }).press('Tab');
  await gadget.getByRole('combobox', { name: 'Article title' }).fill('Test');
  await gadget.getByRole('combobox', { name: 'Article title' }).press('Tab');
  await gadget.getByRole('textbox', { name: 'Specification / Target state' }).fill('VA');
  await gadget.getByRole('textbox', { name: 'Specification / Target state' }).press('Tab');
  await gadget.getByRole('textbox', { name: 'Description of the deviation' }).fill('Testing');
  await gadget.getByRole('textbox', { name: 'Description of the deviation' }).press('Tab');
  await gadget.getByRole('textbox', { name: 'Number of parts checked' }).fill('12');
  await gadget.getByRole('textbox', { name: 'Number of parts checked' }).press('Tab');
  await gadget.getByRole('textbox', { name: 'Failure rate' }).fill('1');
  await gadget.getByRole('textbox', { name: 'Failure rate' }).press('Tab');
  // await gadget.getByLabel('Is the cause known?').press('ArrowDown');
  // await gadget.getByLabel('Is the cause known?').selectOption('Yes');
  // await gadget.getByLabel('Is the cause known?').press('ArrowUp');
  // await gadget.getByLabel('Is the cause known?').selectOption('');
  await gadget.getByLabel('Is the cause known?').selectOption('No');
  await gadget.getByRole('textbox', { name: 'Lastname, Firstname,' }).click();
  await gadget.getByRole('textbox', { name: 'Lastname, Firstname,' }).fill('Z003M3XH');
  await gadget.getByText('ACES Testuser01 / IT APS LCW').click();
  await gadget.getByLabel('Corrective action defined?').selectOption('No');
  await gadget.getByRole('textbox', { name: 'Lastname, Firstname,' }).nth(1).click();
  await gadget.getByRole('textbox', { name: 'Lastname, Firstname,' }).nth(1).fill('Z003M3XE');
  await gadget.getByText('ACES Testuser02 / IT APS LCW').click();
  await gadget.getByRole('textbox', { name: 'Quantity' }).click();
  await gadget.getByRole('textbox', { name: 'Quantity' }).fill('10');
  await gadget.getByRole('textbox', { name: 'Quantity' }).press('Tab');
  await gadget.locator('[data-test-id="20200701144756084279306-DatePicker"]').click();
  await gadget.getByRole('button', { name: 'Aug 23,' }).click();
  await gadget.getByRole('textbox', { name: 'Change number' }).click();
  await gadget.getByRole('textbox', { name: 'Change number' }).fill('2');
  await gadget.locator('[data-test-id="20160721092326035219972"]').click();
  await gadget.locator('[data-test-id="2016072109335505834280"]').fill('10');
  await gadget.getByRole('textbox', { name: '3D - Corrective measures' }).click();
  await gadget.getByRole('textbox', { name: '3D - Corrective measures' }).fill('5');
  await gadget.getByRole('textbox', { name: 'Affected customer and / or' }).click();
  await gadget.getByRole('textbox', { name: 'Affected customer and / or' }).fill('2');
  await gadget.getByLabel('Causing process').selectOption('Design');
  await gadget.getByLabel('Requirements for special').selectOption('Yes');
  await gadget.getByRole('textbox', { name: 'Requirements' }).click();
  await gadget.getByRole('textbox', { name: 'Requirements' }).fill('Special Release');
  await gadget.getByRole('textbox', { name: 'Lastname, Firstname,' }).nth(2).click();
  await gadget.getByRole('textbox', { name: 'Lastname, Firstname,' }).nth(2).click();
  await gadget.getByRole('textbox', { name: 'Lastname, Firstname,' }).nth(2).fill('Z003M3XD');
  await gadget.getByText('ACES Testuser03 / IT APS LCW').click();
  await gadget.getByLabel('Is there a need for changes').selectOption('Yes');
  await gadget.getByRole('textbox', { name: 'Update FMEA / PLP' }).dblclick();
  await gadget.getByRole('textbox', { name: 'Update FMEA / PLP' }).fill('EMEA');
  await gadget.getByRole('textbox', { name: 'Lastname, Firstname,' }).nth(3).click();
  await gadget.getByRole('textbox', { name: 'Lastname, Firstname,' }).nth(3).click({
    modifiers: ['ControlOrMeta']
  });
  await gadget.getByRole('textbox', { name: 'Lastname, Firstname,' }).nth(3).fill('Z003TKKM');
  await gadget.getByText('ACES Testuser04 / IT APS LCW').click();
  await gadget.getByLabel('Does the delivery to the').selectOption('Yes');
  await gadget.getByRole('textbox', { name: 'Mark delivery' }).click();
  await gadget.getByRole('textbox', { name: 'Mark delivery' }).fill('Mark For Delivery');
  await gadget.getByRole('textbox', { name: 'Lastname, Firstname,' }).nth(4).click();
  await gadget.getByRole('textbox', { name: 'Lastname, Firstname,' }).nth(4).fill('Z003M3XH');
  await gadget.getByText('ACES Testuser01 / IT APS LCW').click();
  await gadget.getByRole('textbox', { name: 'Root cause analysis' }).click();
  await gadget.getByRole('textbox', { name: 'Root cause analysis' }).fill('Root Cause Analysis');
  await gadget.getByRole('textbox', { name: 'Corrective action' }).click();
  await gadget.getByRole('textbox', { name: 'Corrective action' }).fill('Corrective Action');

  //Upload Documents
  await gadget.locator('[data-test-id="2015111614330806168211"]').click();
   
  const filePath = 'C:/Vineeti/Project/Upload Documents/FOLDER TO UPLOAD/1  - Copy.pdf';  
  await gadget.getByLabel('Select file(s)').setInputFiles(filePath);

  
  const filePath2 = 'C:/Vineeti/Project/Upload Documents/FOLDER TO UPLOAD/2- Copy .pdf';  
  await gadget.getByLabel('Select file(s)').setInputFiles(filePath2);

  await gadget.getByRole('button', { name: 'Attach' }).click();

    await gadget.locator('[data-test-id="20150908171228012736690"]').click();



// Code to check extra Root Cause Stage is appearing
// Locators
const stageHeader = gadget.getByRole('heading', { name: 'Root cause analyze', exact: true });
const stageBlock  = gadget.locator('[data-test-id="201810251843350638136498"]');


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



   await page.waitForTimeout(800);
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
  await gadget.getByTestId('20160908075844034240762').click();
  await gadget.getByTestId('20160908075844034240762').click();
  await gadget.getByTestId('20160908075844034240762').fill('vineeti_hemdani@bluerose-tech.com');
  await gadget.getByTestId('20150908171228012736690').click();
  await gadget.locator('#pyFlowActionHTML div').filter({ hasText: 'Review the information below before submitting. Work details Case details' }).first().click();
  await gadget.getByRole('button', { name: 'Submit workflow' }).click();

// Retrieve and Store Case ID
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