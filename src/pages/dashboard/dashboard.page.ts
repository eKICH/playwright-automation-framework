import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {

    protected readonly page: Page;

    protected readonly openNewAccountLink: Locator;
    protected readonly transferFundsLink: Locator;
    protected readonly billPayLink: Locator;
    protected readonly findTransactionLink: Locator;
    protected readonly updateContactInfoLink: Locator;
    protected readonly requestLoanLink: Locator;
    protected readonly logoutLink: Locator;

    constructor(page: Page) {

        this.page = page;

        this.openNewAccountLink = page.getByRole('link', { name: 'Open New Account' });
        this.transferFundsLink = page.locator('#leftPanel').getByRole('link', { name: 'Transfer Funds' });
        this.billPayLink = page.locator('#leftPanel').getByRole('link', { name: 'Bill Pay' });
        this.findTransactionLink = page.getByRole('link', { name: 'Find Transactions' });
        this.updateContactInfoLink = page.getByRole('link', { name: 'Update Contact Info' });
        this.requestLoanLink = page.getByRole('link', { name: 'Request Loan' });
        this.logoutLink = page.getByRole('link', { name: 'Log Out' });

    }

    async verifyDashboardIsLoaded() {
        await expect(this.logoutLink).toBeVisible();
    }

    async navigateToOpenNewAccount() {
        await this.openNewAccountLink.click();
    }

    async navigateToTransferFunds() {
        await this.transferFundsLink.click();
    }

    async navigateToPayBill() {
        await this.billPayLink.click();
    }

    async navigateToFindTransaction() {
        await this.findTransactionLink.click();
    }

    async navigateToUpdateContactInfo() {
        await this.updateContactInfoLink.click();
    }

    async navigateToRequestLoan() {
        await this.requestLoanLink.click();
    }

    async logout() {
        await this.logoutLink.click();
    }
}