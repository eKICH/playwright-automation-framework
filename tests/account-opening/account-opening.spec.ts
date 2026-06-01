import { test, expect } from "../../src/fixtures/index";

test('TC-ACCOUNT-01: Authenticated user can access Open New Account page', { tag: ['@smoke', '@regression', '@account', '@critical'] }, async ({ dashboardPage, openNewAccountPage }) => {

    await test.step('Navigate to Open New Account page', async () => {
        await dashboardPage.navigateToOpenNewAccount();
    });

    await test.step('Verify Open Account page', async () => {
        await openNewAccountPage.confirmURLContainsOpenAccountAndTitle();
    });
});

test('TC-ACCOUNT-02: Authenticated user can open new account', { tag: ['@smoke', '@regression', '@account', '@critical',] }, async ({ dashboardPage, openNewAccountPage }) => {

    await test.step('Navigate to Open New Account page', async () => {
        await dashboardPage.navigateToOpenNewAccount();
    });

    await test.step('Verify Open Account page', async () => {
        await openNewAccountPage.confirmURLContainsOpenAccountAndTitle();
    });

    await test.step('Open Savings Account', async () => {
        await openNewAccountPage.openSavingsAccount();
    });

    await test.step('Validate account is opened successfully', async () => {
        await openNewAccountPage.confirmAccountOpenedTitleIsPresentAndAccountNumberIsPresent();
    });

});