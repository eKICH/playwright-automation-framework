import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login/login.page';
import { DashboardPage } from '../../src/pages/dashboard/dashboard.page';


test('TC-LOGIN-01: Valid user can login successfully', { tag: ['@smoke', '@login', '@regression', '@critical'] }, async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await test.step('Navigate to login page', async () => {
        await loginPage.navigate();
    });

    await test.step('Login with valid credentials', async () => {
        await loginPage.login(
            process.env.USERNAME_VALID!,
            process.env.PASSWORD_VALID!
        );
    });

    await test.step('validate dashboard page is loaded', async () => {
        await dashboardPage.verifyDashboardIsLoaded();
    });

    await test.step('Verify overview page', async () => {
        await expect(page).toHaveURL(/overview/);
        await expect(page).toHaveTitle(/Accounts Overview/);
    });

});

test("TC-LOGIN-02: Invalid username", { tag: ['@login', '@regression', '@negative', '@security'] }, async ({ page }) => {

    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
        await loginPage.navigate();
    });
    await test.step('Login with invalid username', async () => {
        await loginPage.login(
            process.env.USERNAME_INVALID!,
            process.env.PASSWORD_VALID!
        );
    });
    await test.step('Verify validation error message for invalid username', async () => {
        await loginPage.validateInvalidUserNameOrAndPassword();
    });

});

test("TC-LOGIN-03: Invalid password", { tag: ['@login', '@regression', '@negative', '@security'] }, async ({ page }) => {

    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
        await loginPage.navigate();
    });
    await test.step('Login with invalid username', async () => {
        await loginPage.login(
            process.env.USERNAME_VALID!,
            process.env.PASSWORD_INVALID!
        );
    });
    await test.step('Verify validation error message for invalid password', async () => {
        await loginPage.validateInvalidUserNameOrAndPassword();
    });

});

test("TC-LOGIN-04: Invalid username + password", { tag: ['@login', '@regression', '@negative', '@security'] }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
        await loginPage.navigate();
    });
    await test.step('Login with invalid username', async () => {
        await loginPage.login(
            process.env.USERNAME_INVALID!,
            process.env.PASSWORD_INVALID!
        );
    });
    await test.step('Verify validation error message for invalid username + password', async () => {
        await loginPage.validateInvalidUserNameOrAndPassword();
    });

});

test("TC-LOGIN-05: Empty username", { tag: ['@login', '@regression', '@validation'] }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
        await loginPage.navigate();
    });

    await test.step('Login with empty username', async () => {

        await loginPage.login(
            process.env.USERNAME_EMPTY!,
            process.env.PASSWORD_VALID!
        );

    });

    await test.step('Verify error message is shown', async () => {
        await expect(page.locator('.error')).toContainText('Please enter a username and password.');
    });
});

test("TC-LOGIN-06: Empty password", { tag: ['@login', '@regression', '@validation'] }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
        await loginPage.navigate();
    });

    await test.step('Login with empty username', async () => {

        await loginPage.login(
            process.env.USERNAME_VALID!,
            process.env.PASSWORD_EMPTY!
        );

    });

    await test.step('Verify error message is shown', async () => {
        await expect(page.locator('.error')).toContainText('Please enter a username and password.');
    });

});

test("TC-LOGIN-07: Empty username + password", { tag: ['@login', '@regression', '@validation'] }, async ({ page }) => {

    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
        await loginPage.navigate();
    });

    await test.step('Login with empty username', async () => {

        await loginPage.login(
            process.env.USERNAME_EMPTY!,
            process.env.PASSWORD_EMPTY!
        );

    });

    await test.step('Verify error message is shown', async () => {
        await expect(page.locator('.error')).toContainText('Please enter a username and password.');
    });

});

test("TC-LOGIN-08: Authenticated user can logout successfully", { tag: ['@login', '@security', '@critical'] }, async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await test.step('Navigate to login page', async () => {
        await loginPage.navigate();
    });

    await test.step('Login with valid credentials', async () => {
        await loginPage.login(
            process.env.USERNAME_VALID!,
            process.env.PASSWORD_VALID!
        );
    });

    await test.step('validate dashboard page is loaded', async () => {
        await dashboardPage.verifyDashboardIsLoaded();
    });

    await test.step('Verify overview page', async () => {
        await expect(page).toHaveURL(/overview/);
        await expect(page).toHaveTitle(/Accounts Overview/);
    });

    await test.step('logout', async () => {
        await dashboardPage.logout();
    });

    await test.step('Verify Login Page is loaded', async () => {
        await loginPage.verifyLoginButtonIsVisible();
    });

});