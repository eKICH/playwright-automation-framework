import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {

    protected readonly page: Page;
    protected readonly usernameInput: Locator;
    protected readonly passwordInput: Locator;
    protected readonly loginButton: Locator;
    protected readonly loginValidation: Locator;

    constructor(page: Page) {

        this.page = page;

        this.usernameInput = page.locator('[name="username"]');
        this.passwordInput = page.locator('[name="password"]');
        this.loginButton = page.getByRole('button', { name: 'Log In' });
        this.loginValidation = page.locator('.error')
    }

    async verifyLoginButtonIsVisible() {
        await expect(this.loginButton).toBeVisible();
    }

    async navigate() {
        await this.page.goto('/');
    }

    async login(username: string, password: string) {

        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async validateInvalidUserNameOrAndPassword(){
        await expect(this.loginValidation).toHaveText('The username and password could not be verified.');
    }
}