import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://siemens-dev1.pegacloud.com/prweb/app/default/WufOMs17lxZjy1fI-RH7kXW6DtwPXjuN*/!STANDARD');
  await page.getByRole('textbox', { name: 'User name *' }).click();
  await page.getByRole('textbox', { name: 'User name *' }).fill('Z003M3XH');
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('Siemens@123Siemens@123Siemens@123');
  await page.getByRole('button', { name: 'Log in' }).click();


  await page.locator('iframe[name="PegaGadget0Ifr"]').contentFrame().locator('[data-test-id="20141008144226093346187"]').getByRole('link', { name: 'Click to filter' }).click();
  await page.locator('iframe[name="PegaGadget0Ifr"]').contentFrame().locator('[data-test-id="201411181100280377101613"]').click();


  const caseId = "APW-106" ;
 
  await page.locator('iframe[name="PegaGadget0Ifr"]').contentFrame().locator('[data-test-id="201411181100280377101613"]').fill(caseId);
  await page.locator('iframe[name="PegaGadget0Ifr"]').contentFrame().locator('[data-test-id="filterPopupOkButton"]').click();
  await page.locator('iframe[name="PegaGadget0Ifr"]').contentFrame().locator('[data-test-id="20141008144226093953391"]').click();
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().getByRole('button', { name: 'Edit Fields' }).click();
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('select[name="$PInitialFormTemp$pTaskPriorityRatingsPageList$l3$pTask_ImpactProductPlant"]').selectOption('Very High');
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('select[name="$PInitialFormTemp$pTaskPriorityRatingsPageList$l3$pTask_PredictionOfOccurrence"]').selectOption('Medium');
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('select[name="$PInitialFormTemp$pTaskPriorityRatingsPageList$l3$pTask_DiscoveryAbility"]').selectOption('High');
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('#bcf73433').click();
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('#bcf73433').fill('Test');
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('[data-test-id="202001221218350042646"] [data-test-id="202406271456180413143-R3"]').getByRole('cell', { name: 'Please Select...' }).locator('[data-test-id="2016072109335505834280"]').selectOption('No');
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('input[name="$PInitialFormTemp$pTaskPriorityRatingsPageList$l3$pTask_Remarks"]').click();
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('input[name="$PInitialFormTemp$pTaskPriorityRatingsPageList$l3$pTask_Remarks"]').fill('Testing');
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('[data-test-id="20150908171228012330958"]').click();
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('[data-test-id="20151221093021020184414"]').click();
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('[data-test-id="20151221093021020184414"]').fill('Approved Stage 1');
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('[data-test-id="2015090805444404955925"]').click();
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('[data-test-id="201801251600250687413552"]').click();
  await page.locator('[data-test-id="202203110911550900696"]').click();
  await page.goto('https://siemens-dev1.pegacloud.com/prweb/app/default/WufOMs17lxZjy1fI-RH7kXW6DtwPXjuN*/!STANDARD');
  await page.getByRole('textbox', { name: 'User name *' }).dblclick();
  await page.getByRole('textbox', { name: 'User name *' }).fill('Z003M3XE');
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('Siemens@123Siemens@123Siemens@123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.locator('iframe[name="PegaGadget0Ifr"]').contentFrame().locator('[data-test-id="20141008144226093346187"]').getByRole('link', { name: 'Click to filter' }).click();
  await page.locator('iframe[name="PegaGadget0Ifr"]').contentFrame().locator('[data-test-id="201411181100280377101613"]').click();
  await page.locator('iframe[name="PegaGadget0Ifr"]').contentFrame().locator('[data-test-id="201411181100280377101613"]').fill(caseId);
  await page.locator('iframe[name="PegaGadget0Ifr"]').contentFrame().locator('[data-test-id="filterPopupOkButton"]').click();
  await page.locator('iframe[name="PegaGadget0Ifr"]').contentFrame().locator('[data-test-id="20141008144226093953391"]').click();
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().getByRole('button', { name: 'Edit Fields' }).click();
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('select[name="$PInitialFormTemp$pImpactProductPlant"]').selectOption('High');
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('select[name="$PInitialFormTemp$pPredictionOfOccurrence"]').selectOption('Medium');
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('select[name="$PInitialFormTemp$pDiscoveryAbility"]').selectOption('Low');
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().getByLabel('Define action priority by AP-').selectOption('Low');
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().getByLabel('Is customer approval required?').selectOption('No');
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('select[name="$PInitialFormTemp$pReleaseRecommendation"]').selectOption('No');
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('[data-test-id="20150908171228012330958"]').click();
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('[data-test-id="20151221093021020184414"]').fill('Approved Stage 2 Approval 1');
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('[data-test-id="2015090805444404955925"]').click();
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('[data-test-id="201801251600250687413552"]').click();
  await page.locator('[data-test-id="202203110911550900696"]').click();
  await page.getByRole('link', { name: 'here' }).click();
  await page.goto('https://siemens-dev1.pegacloud.com/prweb/app/default/WufOMs17lxZjy1fI-RH7kXW6DtwPXjuN*/!STANDARD');
  await page.getByRole('textbox', { name: 'User name *' }).click();
  await page.getByRole('textbox', { name: 'User name *' }).fill('Z003M3XD');
  await page.getByRole('textbox', { name: 'Password *' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('Siemens@123Siemens@123Siemens@123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.locator('iframe[name="PegaGadget0Ifr"]').contentFrame().locator('[data-test-id="20141008144226093346187"]').getByRole('link', { name: 'Click to filter' }).click();
  await page.locator('iframe[name="PegaGadget0Ifr"]').contentFrame().locator('[data-test-id="201411181100280377101613"]').click();
  await page.locator('iframe[name="PegaGadget0Ifr"]').contentFrame().locator('[data-test-id="201411181100280377101613"]').fill(caseId);
  await page.locator('iframe[name="PegaGadget0Ifr"]').contentFrame().locator('[data-test-id="filterPopupOkButton"]').click();
  await page.locator('iframe[name="PegaGadget0Ifr"]').contentFrame().locator('[data-test-id="20141008144226093953391"]').click();
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().getByRole('button', { name: 'Edit Fields' }).click();
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('select[name="$PInitialFormTemp$pImpactProductPlant"]').selectOption('Very High');
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('select[name="$PInitialFormTemp$pPredictionOfOccurrence"]').selectOption('High');
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('select[name="$PInitialFormTemp$pDiscoveryAbility"]').selectOption('High');
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().getByLabel('Define action priority by AP-').selectOption('Medium');
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('select[name="$PInitialFormTemp$pReleaseRecommendation"]').selectOption('Yes');
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('[data-test-id="20150908171228012330958"]').click();


await page.waitForTimeout(500);

  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('[data-test-id="20151221093021020184414"]').fill('Approved Stage 2 -Approval 2');
  
  
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('[data-test-id="2015090805444404955925"]').click();
  await page.locator('iframe[name="PegaGadget1Ifr"]').contentFrame().locator('[data-test-id="201801251600250687413552"]').click();
//  await expect(page.locator('iframe[name="PegaGadget2Ifr"]').contentFrame().locator('[data-test-id="2016083016191602341167946"]').nth(1)).toBeVisible();
  await page.locator('iframe[name="PegaGadget2Ifr"]').contentFrame().getByText('Overview').click();
  await page.locator('iframe[name="PegaGadget2Ifr"]').contentFrame().locator('[data-test-id="202105050818560080933_header"]').getByText('Case details').click();
  await page.locator('iframe[name="PegaGadget2Ifr"]').contentFrame().getByText('Audit').click();
  await page.locator('[data-test-id="202203110911550900696"]').click();
});