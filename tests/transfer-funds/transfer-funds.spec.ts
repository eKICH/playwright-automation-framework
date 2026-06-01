import { test, expect } from "../../src/fixtures/index";

test('TC-TRANSFER_FUNDS-01: Authenticated user can access transfer funds page', { tag: ['@smoke', '@regression', '@transfer', '@critical'] }, async ({ dashboardPage, transferFundsPage }) => {

    await test.step('Navigate to transfer funds page', async () => {
        await dashboardPage.navigateToTransferFunds();
    });

    await test.step('Verify user is redirected to the transfer funds page', async () => {
        await transferFundsPage.confirmPageURLContainsTransferText();
    });

});

test('TC-TRANSFER-FUNDS-02: Authenticated user can transfer funds', { tag: ['@smoke', '@regression', '@transfer', '@critical'] }, async ({ dashboardPage, transferFundsPage }) => {

    await test.step('Navigate to transfer funds page', async () => {
        await dashboardPage.navigateToTransferFunds();
    });

    await test.step('Verify user is redirected to the transfer funds page', async () => {
        await transferFundsPage.confirmPageURLContainsTransferText();
    });

    await test.step('Transfer funds', async () => {
        await transferFundsPage.transferFunds('10');
    });

    await test.step('Funds Transfer Confirmation', async () => {
        await transferFundsPage.confirmTransferCompleteHeaderText();
    });
});

test('TC-TRANSFER_FUNDS-03: Transfer funds fails with empty amount', { tag: ['@regression', '@transfer', '@negative'] }, async ({ dashboardPage, transferFundsPage }) => {

    await test.step('Navigate to transfer funds page', async () => {

        await dashboardPage.navigateToTransferFunds();

    });

    await test.step('Transfer Funds: Empty amount', async () => {

        await transferFundsPage.transferFunds('');

    });

    await test.step('Verify user is redirected to the transfer funds page', async () => {
        await transferFundsPage.confirmPageURLContainsTransferText();
    });

    await test.step('Verify error message for empty amount', async () => {
        await transferFundsPage.verifyErrorMessageForEmptyAmount();
    });

});