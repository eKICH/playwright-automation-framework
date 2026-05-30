import test from "@playwright/test";
import { LoginPage } from "../../src/pages/login/login.page";
import { DashboardPage } from "../../src/pages/dashboard/dashboard.page";
import { BillPay } from "../../src/pages/bill-pay/bill-pay.page";

import { readJSON } from "../../src/utils/json.helper";
import { PayeeDetails } from "../../src/interface/payee.interface";

const payees = readJSON<PayeeDetails[]>('tests/bill-payment/data/payee-details.json');

test('TC-BILL-PAY-01: Authenticated user can access bill payment page', { tag: ['@smoke', '@regression', '@billpay', '@critical'] }, async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const billPay = new BillPay(page);

    await test.step('Navigate to login page', async () => {
        await loginPage.navigate();
    });
    await test.step('Login with valid credentials', async () => {
        await loginPage.login(
            process.env.USERNAME_VALID!,
            process.env.PASSWORD_VALID!
        );
    });
    await test.step('Verify redirected to dashboard', async () => {
        await dashboardPage.verifyDashboardIsLoaded();
    });
    await test.step('Click bill pay link', async () => {
        await dashboardPage.navigateToPayBill();
    });
    await test.step('Verify URL contains /billpay', async () => {
        await billPay.verifyPageURLContainsBillPay();
    });
    await test.step('Verify Bill Pay page header is visible', async () => {
        await billPay.verifyBillPayPageHeader();
    });

});

test('TC-BILL-PAY-02: Authenticated user can make a single bill payment', { tag: ['@smoke', '@regression', '@billpay', '@critical'] }, async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const billPay = new BillPay(page);

    await test.step('Navigate to login page', async () => {
        await loginPage.navigate();
    });
    await test.step('Login with valid credentials', async () => {
        await loginPage.login(
            process.env.USERNAME_VALID!,
            process.env.PASSWORD_VALID!
        );
    });
    await test.step('Verify redirected to dashboard', async () => {
        await dashboardPage.verifyDashboardIsLoaded();
    });
    await test.step('Navigate to Bill Pay page', async () => {
        await dashboardPage.navigateToPayBill();
    });
    await test.step('Fill in all payee details', async () => {
        await billPay.fillPayeeDetails(
            'Test Payee',
            'Test',
            'Here',
            'There',
            '07362-test',
            '+1-001-8786'
        );
    });
    await test.step('Fill in account and verify account numbers', async () => {
        await billPay.fillInAccountAndVerifyAccount(1234, 1234)
    });
    const amount = await test.step('Fill in payment amount', async () => {
        return await billPay.fillPaymentAmount('100');
    });
    const selectedAccountFrom = await test.step('Select account from', async () => {
        return await billPay.selectFromAccount();
    });

    await test.step('Click Send Payment', async () => {
        await billPay.sendPayment();
    });
    await test.step('Verify success message contains payee name and amount', async () => {
        return await billPay.verifyPaymentSuccess('Test Payee', amount, selectedAccountFrom);
    });
});

test('TC-BILL-PAY-03: Authenticated user can make multiple bill payments', { tag: ['@regression', '@billpay'] }, async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const billPay = new BillPay(page);

    await test.step('Navigate to login page', async () => {
        await loginPage.navigate();
    });
    await test.step('Login with valid credentials', async () => {
        await loginPage.login(
            process.env.USERNAME_VALID!,
            process.env.PASSWORD_VALID!
        );
    });
    await test.step('Verify redirected to dashboard', async () => {
        await dashboardPage.verifyDashboardIsLoaded();
    });

    for (const payee of payees) {
        await test.step(`Navigate to Bill Pay page for ${payee.payeeName}`, async () => {
            await dashboardPage.navigateToPayBill();
        });
        await test.step(`Fill in payee details for ${payee.payeeName}`, async () => {
            await billPay.fillPayeeDetails(
                payee.payeeName,
                payee.address,
                payee.city,
                payee.state,
                payee.zipCode,
                payee.phone
            );
        });
        await test.step(`Fill in account details for ${payee.payeeName}`, async () => {
            await billPay.fillInAccountAndVerifyAccount(payee.account, payee.verifyAccount);
        });
        const amount = await test.step(`Fill in payment amount for ${payee.payeeName}`, async () => {
            return await billPay.fillPaymentAmount(payee.amount.toString());
        });
        const selectedAccountFrom = await test.step(`Select from account for ${payee.payeeName}`, async () => {
            return await billPay.selectFromAccount();
        });
        await test.step(`Send payment for ${payee.payeeName}`, async () => {
            await billPay.sendPayment();
        });
        await test.step(`Verify success for ${payee.payeeName}`, async () => {
            await billPay.verifyPaymentSuccess(payee.payeeName, amount, selectedAccountFrom);
        });
    }
});

test('TC-BILL-PAY-04: Bill payment fails with mismatched account numbers', { tag: ['@regression', '@billpay', '@negative'] }, async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const billPay = new BillPay(page);

    await test.step('Navigate to login page', async () => {
        await loginPage.navigate();
    });
    await test.step('Login with valid credentials', async () => {
        await loginPage.login(
            process.env.USERNAME_VALID!,
            process.env.PASSWORD_VALID!
        );
    });
    await test.step('Verify redirected to dashboard', async () => {
        await dashboardPage.verifyDashboardIsLoaded();
    });
    await test.step('Navigate to Bill Pay page', async () => {
        await dashboardPage.navigateToPayBill();
    });
    await test.step('Fill in all payee details', async () => {
        await billPay.fillPayeeDetails(
            'Test Payee',
            'Test',
            'Here',
            'There',
            '07362-test',
            '+1-001-8786'
        );
    });
    await test.step('Fill in account and verify account numbers', async () => {
        await billPay.fillInAccountAndVerifyAccount(1234, 1235)
    });
    await test.step('Fill in payment amount', async () => {
        return await billPay.fillPaymentAmount('500');
    });
    await test.step('Select account from', async () => {
        return await billPay.selectFromAccount();
    });

    await test.step('Click Send Payment', async () => {
        await billPay.sendPayment();
    });
    await test.step('Verify error message for account mismatch', async () => {
        await billPay.verifyAccountMismatchErrorMessage();
    });

});

test('TC-BILL-PAY-05: Bill payment fails with missing required fields', { tag: ['@regression', '@billpay', '@negative'] }, async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const billPay = new BillPay(page);

    await test.step('Navigate to login page', async () => {
        await loginPage.navigate();
    });
    await test.step('Login with valid credentials', async () => {
        await loginPage.login(
            process.env.USERNAME_VALID!,
            process.env.PASSWORD_VALID!
        );
    });
    await test.step('Verify redirected to dashboard', async () => {
        await dashboardPage.verifyDashboardIsLoaded();
    });
    await test.step('Navigate to Bill Pay page', async () => {
        await dashboardPage.navigateToPayBill();
    });
    await test.step('Fill in all payee details', async () => {
        await billPay.fillPayeeDetails(
            '',
            '',
            'Here',
            'There',
            '07362-test',
            '+1-001-8786'
        );
    });
    await test.step('Fill in account and verify account numbers', async () => {
        await billPay.fillInAccountAndVerifyAccount(1234, 1234)
    });
    await test.step('Fill in payment amount', async () => {
        return await billPay.fillPaymentAmount('500');
    });
    await test.step('Select account from', async () => {
        return await billPay.selectFromAccount();
    });

    await test.step('Click Send Payment', async () => {
        await billPay.sendPayment();
    });
    await test.step('Verify validation error messages are displayed for each missing field', async () => {
        await billPay.missingRequiredFields();
    });

});

test('TC-BILL-PAY-06: Bill payment fails with invalid amount', { tag: ['@regression', '@billpay', '@negative'] }, async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const billPay = new BillPay(page);

    await test.step('Navigate to login page', async () => {
        await loginPage.navigate();
    });
    await test.step('Login with valid credentials', async () => {
        await loginPage.login(
            process.env.USERNAME_VALID!,
            process.env.PASSWORD_VALID!
        );
    });
    await test.step('Verify redirected to dashboard', async () => {
        await dashboardPage.verifyDashboardIsLoaded();
    });
    await test.step('Navigate to Bill Pay page', async () => {
        await dashboardPage.navigateToPayBill();
    });
    await test.step('Fill in all payee details', async () => {
        await billPay.fillPayeeDetails(
            'Test Payee',
            'here-there',
            'Here',
            'There',
            '07362-test',
            '+1-001-8786'
        );
    });
    await test.step('Fill in account and verify account numbers', async () => {
        await billPay.fillInAccountAndVerifyAccount(1234, 1234)
    });
    await test.step('Fill in payment amount', async () => {
        return await billPay.fillPaymentAmount('gssdgsdd');
    });
    await test.step('Select account from', async () => {
        return await billPay.selectFromAccount();
    });

    await test.step('Click Send Payment', async () => {
        await billPay.sendPayment();
    });
    await test.step('Verify validation error message for invalid amount', async () => {
        await billPay.invalidAmount();
    });

});