import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login/login.page';
import { DashboardPage } from '../pages/dashboard/dashboard.page';
import { OpenNewAccount } from '../pages/open-new-account/open-new-account.page';
import { BillPay } from '../pages/bill-pay/bill-pay.page';
import { TransferFunds } from '../pages/transfer-funds/transfer-funds.page';

type Pages = {

    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    openNewAccountPage: OpenNewAccount;
    billPayPage: BillPay;
    transferFundsPage: TransferFunds;

};

export const test = base.extend<Pages>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    dashboardPage: async ({ page }, use) => {
        const dashboard = new DashboardPage(page);
        await page.goto('/');
        await use(dashboard);
    },

    openNewAccountPage: async ({ page }, use) => {
        await use(new OpenNewAccount(page));
    },

    billPayPage: async ({ page }, use) => {
        await use(new BillPay(page));
    },

    transferFundsPage: async ({ page }, use) => {
        await use(new TransferFunds(page));
    }
});

export { expect } from '@playwright/test';