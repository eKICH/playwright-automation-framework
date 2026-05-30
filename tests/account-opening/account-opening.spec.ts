import { test, expect } from "@playwright/test";
import { DashboardPage } from "../../src/pages/dashboard/dashboard.page";
import { OpenNewAccount } from "../../src/pages/open-new-account/open-new-account.page";

test('TC-ACCOUNT-01: Authenticated user can access Open New Account page', { tag: ['@smoke', '@regression', '@account', '@critical'] }, async ({ page }) => {

    const dashboardPage = new DashboardPage(page);

    await test.step('Navigate to the app', async () => {
        await page.goto('/');
    });

    await test.step('Navigate to Open New Account page', async () => {
        await dashboardPage.navigateToOpenNewAccount();
    });

    await test.step('Verify Open Account page', async () => {
        await expect(page).toHaveURL(/openaccount/);
        await expect(page).toHaveTitle(/Open Account/);
    });
});

test('TC-ACCOUNT-02: Authenticated user can open new account', { tag: ['@smoke', '@regression', '@account', '@critical',] }, async ({ page }) => {

    const dashboardPage = new DashboardPage(page);
    const openNewAccount = new OpenNewAccount(page);

    await test.step('Navigate to the app', async () => {
        await page.goto('/');
    });

    await test.step('Navigate to Open New Account page', async () => {
        await dashboardPage.navigateToOpenNewAccount();
    });

    await test.step('Verify Open Account page', async () => {
        await expect(page).toHaveURL(/openaccount/);
        await expect(page).toHaveTitle(/Open Account/);
    });

    await test.step('Open Savings Account', async () => {
        await openNewAccount.openSavingsAccount();
    });

    await test.step('Validate account is opened successfully', async () => {
        await openNewAccount.confirmAccountOpenedTitleIsPresentAndAccountNumberIsPresent();
    });

});