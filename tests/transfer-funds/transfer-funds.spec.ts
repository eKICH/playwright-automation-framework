import test, { expect } from "@playwright/test";
import { DashboardPage } from "../../src/pages/dashboard/dashboard.page";
import { TransferFunds } from "../../src/pages/transfer-funds/transfer-funds.page";

test('TC-TRANSFER_FUNDS-01: Authenticated user can access transfer funds page', { tag: ['@smoke', '@regression', '@transfer', '@critical'] }, async ({ page }) => {

    const dashboardPage = new DashboardPage(page);
    const transferFunds = new TransferFunds(page);

    await test.step('Navigate to the app', async () => {
        await page.goto('/');
    });

    await test.step('Navigate to transfer funds page', async () => {
        await dashboardPage.navigateToTransferFunds();
    });

    await test.step('Verify user is redirected to the transfer funds page', async () => {
        await transferFunds.confirmPageURLContainsTransferText();
    });

});

test('TC-TRANSFER-FUNDS-02: Authenticated user can transfer funds', { tag: ['@smoke', '@regression', '@transfer', '@critical'] }, async ({ page }) => {

    const dashboardPage = new DashboardPage(page);
    const transferFunds = new TransferFunds(page);

    await test.step('Navigate to the app', async () => {
        await page.goto('/');
    });

    await test.step('Navigate to transfer funds page', async () => {
        await dashboardPage.navigateToTransferFunds();
    });

    await test.step('Verify user is redirected to the transfer funds page', async () => {
        await transferFunds.confirmPageURLContainsTransferText();
    });

    await test.step('Transfer funds', async () => {
        await transferFunds.transferFunds('10');
    });

    await test.step('Funds Transfer Confirmation', async () => {
        await transferFunds.confirmTransferCompleteHeaderText();
    });
});

test('TC-TRANSFER_FUNDS-03: Transfer funds fails with empty amount', { tag: ['@regression', '@transfer', '@negative'] }, async ({ page }) => {

    const dashboardPage = new DashboardPage(page);
    const transferFunds = new TransferFunds(page);

    await test.step('Navigate to the app', async () => {

        await page.goto('/');

    });


    await test.step('Navigate to transfer funds page', async () => {

        await dashboardPage.navigateToTransferFunds();

    });

    await test.step('Transfer Funds: Empty amount', async () => {

        await transferFunds.transferFunds('');

    });

    await test.step('Verify user is redirected to the transfer funds page', async () => {
        await transferFunds.confirmPageURLContainsTransferText();
    });

    await test.step('Verify error message for empty amount', async () => {
        await transferFunds.verifyErrorMessageForEmptyAmount();
    });

});