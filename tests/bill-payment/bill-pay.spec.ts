import {test} from "../../src/fixtures/index";

import { readJSON } from "../../src/utils/json.helper";
import { PayeeDetails } from "../../src/interface/payee.interface";

const payees = readJSON<PayeeDetails[]>('tests/bill-payment/data/payee-details.json');

test('TC-BILL-PAY-01: Authenticated user can access bill payment page', { tag: ['@smoke', '@regression', '@billpay', '@critical'] }, async ({ dashboardPage, billPayPage }) => {

    await test.step('Click bill pay link', async () => {
        await dashboardPage.navigateToPayBill();
    });
    await test.step('Verify URL contains /billpay', async () => {
        await billPayPage.verifyPageURLContainsBillPay();
    });
    await test.step('Verify Bill Pay page header is visible', async () => {
        await billPayPage.verifyBillPayPageHeader();
    });

});

test('TC-BILL-PAY-02: Authenticated user can make a single bill payment', { tag: ['@smoke', '@regression', '@billpay', '@critical'] }, async ({ dashboardPage, billPayPage }) => {

    await test.step('Navigate to Bill Pay page', async () => {
        await dashboardPage.navigateToPayBill();
    });
    await test.step('Fill in all payee details', async () => {
        await billPayPage.fillPayeeDetails(
            'Test Payee',
            'Test',
            'Here',
            'There',
            '07362-test',
            '+1-001-8786'
        );
    });
    await test.step('Fill in account and verify account numbers', async () => {
        await billPayPage.fillInAccountAndVerifyAccount(1234, 1234)
    });
    const amount = await test.step('Fill in payment amount', async () => {
        return await billPayPage.fillPaymentAmount('100');
    });
    const selectedAccountFrom = await test.step('Select account from', async () => {
        return await billPayPage.selectFromAccount();
    });

    await test.step('Click Send Payment', async () => {
        await billPayPage.sendPayment();
    });
    await test.step('Verify success message contains payee name and amount', async () => {
        return await billPayPage.verifyPaymentSuccess('Test Payee', amount, selectedAccountFrom);
    });
});

test('TC-BILL-PAY-03: Authenticated user can make multiple bill payments', { tag: ['@regression', '@billpay'] }, async ({ dashboardPage, billPayPage }) => {

    for (const payee of payees) {
        await test.step(`Navigate to Bill Pay page for ${payee.payeeName}`, async () => {
            await dashboardPage.navigateToPayBill();
        });
        await test.step(`Fill in payee details for ${payee.payeeName}`, async () => {
            await billPayPage.fillPayeeDetails(
                payee.payeeName,
                payee.address,
                payee.city,
                payee.state,
                payee.zipCode,
                payee.phone
            );
        });
        await test.step(`Fill in account details for ${payee.payeeName}`, async () => {
            await billPayPage.fillInAccountAndVerifyAccount(payee.account, payee.verifyAccount);
        });
        const amount = await test.step(`Fill in payment amount for ${payee.payeeName}`, async () => {
            return await billPayPage.fillPaymentAmount(payee.amount.toString());
        });
        const selectedAccountFrom = await test.step(`Select from account for ${payee.payeeName}`, async () => {
            return await billPayPage.selectFromAccount();
        });
        await test.step(`Send payment for ${payee.payeeName}`, async () => {
            await billPayPage.sendPayment();
        });
        await test.step(`Verify success for ${payee.payeeName}`, async () => {
            await billPayPage.verifyPaymentSuccess(payee.payeeName, amount, selectedAccountFrom);
        });
    }
});

test('TC-BILL-PAY-04: Bill payment fails with mismatched account numbers', { tag: ['@regression', '@billpay', '@negative'] }, async ({ dashboardPage, billPayPage }) => {

    await test.step('Navigate to Bill Pay page', async () => {
        await dashboardPage.navigateToPayBill();
    });
    await test.step('Fill in all payee details', async () => {
        await billPayPage.fillPayeeDetails(
            'Test Payee',
            'Test',
            'Here',
            'There',
            '07362-test',
            '+1-001-8786'
        );
    });
    await test.step('Fill in account and verify account numbers', async () => {
        await billPayPage.fillInAccountAndVerifyAccount(1234, 1235)
    });
    await test.step('Fill in payment amount', async () => {
        return await billPayPage.fillPaymentAmount('500');
    });
    await test.step('Select account from', async () => {
        return await billPayPage.selectFromAccount();
    });

    await test.step('Click Send Payment', async () => {
        await billPayPage.sendPayment();
    });
    await test.step('Verify error message for account mismatch', async () => {
        await billPayPage.verifyAccountMismatchErrorMessage();
    });

});

test('TC-BILL-PAY-05: Bill payment fails with missing required fields', { tag: ['@regression', '@billpay', '@negative'] }, async ({ dashboardPage, billPayPage }) => {

    await test.step('Navigate to Bill Pay page', async () => {
        await dashboardPage.navigateToPayBill();
    });
    await test.step('Fill in all payee details', async () => {
        await billPayPage.fillPayeeDetails(
            '',
            '',
            'Here',
            'There',
            '07362-test',
            '+1-001-8786'
        );
    });
    await test.step('Fill in account and verify account numbers', async () => {
        await billPayPage.fillInAccountAndVerifyAccount(1234, 1234)
    });
    await test.step('Fill in payment amount', async () => {
        return await billPayPage.fillPaymentAmount('500');
    });
    await test.step('Select account from', async () => {
        return await billPayPage.selectFromAccount();
    });

    await test.step('Click Send Payment', async () => {
        await billPayPage.sendPayment();
    });
    await test.step('Verify validation error messages are displayed for each missing field', async () => {
        await billPayPage.missingRequiredFields();
    });

});

test('TC-BILL-PAY-06: Bill payment fails with invalid amount', { tag: ['@regression', '@billpay', '@negative'] }, async ({ dashboardPage, billPayPage }) => {

    await test.step('Navigate to Bill Pay page', async () => {
        await dashboardPage.navigateToPayBill();
    });
    await test.step('Fill in all payee details', async () => {
        await billPayPage.fillPayeeDetails(
            'Test Payee',
            'here-there',
            'Here',
            'There',
            '07362-test',
            '+1-001-8786'
        );
    });
    await test.step('Fill in account and verify account numbers', async () => {
        await billPayPage.fillInAccountAndVerifyAccount(1234, 1234)
    });
    await test.step('Fill in payment amount', async () => {
        return await billPayPage.fillPaymentAmount('gssdgsdd');
    });
    await test.step('Select account from', async () => {
        return await billPayPage.selectFromAccount();
    });

    await test.step('Click Send Payment', async () => {
        await billPayPage.sendPayment();
    });
    await test.step('Verify validation error message for invalid amount', async () => {
        await billPayPage.invalidAmount();
    });

});