export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Company Email' });
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.verifyButton = page.getByRole('button', { name: 'Verify' });
  }

  async login(email, password) {
    await this.page.goto('https://pegalabs.pega.com/ui/system/cddd8f50-0220-47b5-9954-62beb8c85e1b');
    await this.emailInput.fill(email);
    await this.nextButton.click();
    await this.passwordInput.fill(password);
    await this.verifyButton.click();
  }
}
