import { expect, Locator, Page } from "@playwright/test";

export class OpenNewAccount {

    protected readonly page: Page;

    protected readonly typeOfAccountDropDown: Locator;
    protected readonly fromAccountDropDown: Locator;
    protected readonly openNewAccountButton: Locator;
    protected readonly accountOpenedTitle: Locator;
    protected readonly newAccountNumber: Locator;

    constructor(page: Page) {

        this.page = page;

        this.typeOfAccountDropDown = page.locator('select#type.input');
        this.fromAccountDropDown = page.locator('select#fromAccountId.input');
        this.openNewAccountButton = page.getByRole('button', { name: 'Open New Account' });
        this.accountOpenedTitle = page.getByRole('heading', { name: 'Account Opened!' });
        this.newAccountNumber = page.locator('a#newAccountId');
    }


    async confirmAccountOpenedTitleIsPresentAndAccountNumberIsPresent() {
        await expect(this.accountOpenedTitle).toBeVisible();
        await expect(this.newAccountNumber).toHaveText(/^\d+$/);
    }

    async openSavingsAccount() {

        const firstOption = await this.fromAccountDropDown.locator('option').first().getAttribute('value');

        await this.typeOfAccountDropDown.selectOption({
            label: 'SAVINGS'
        });

        await this.fromAccountDropDown.selectOption(firstOption!);

        await this.openNewAccountButton.click();
    }


}