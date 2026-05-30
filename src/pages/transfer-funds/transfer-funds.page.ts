import { expect, Locator, Page } from "@playwright/test";

export class TransferFunds {

    protected readonly page: Page;
    protected readonly transferFundsPageHeader: Locator;
    protected readonly amountInputField: Locator;
    protected readonly fromAccountDropDown: Locator;
    protected readonly toAccountDropDown: Locator;
    protected readonly transferFundsButton: Locator;
    protected readonly transferCompleteHeaderText: Locator;
    protected readonly errorText: Locator;

    constructor(page: Page) {
        this.page = page;

        this.transferFundsPageHeader = page.getByTitle('Transfer Funds');
        this.amountInputField = page.locator('input#amount');
        this.fromAccountDropDown = page.locator('#fromAccountId.input');
        this.toAccountDropDown = page.locator('#toAccountId.input');
        this.transferFundsButton = page.locator('input.button');
        this.transferCompleteHeaderText = page.getByRole('heading', { name: 'Transfer Complete!' });
        this.errorText = page.getByRole('heading', {name: 'Error!'});

    }

    // Assert header

    async confirmPageURLContainsTransferText() {
        await expect(this.page).toHaveURL(/transfer/);
    }

    // Transfer funds

    async transferFunds(amount: string) {

        await this.amountInputField.fill(amount);
        await this.fromAccountDropDown.selectOption({ index: 0 });
        await this.toAccountDropDown.selectOption({ index: 0 });
        await this.transferFundsButton.click();
    }

    // Assert the transfer was successfull
    async confirmTransferCompleteHeaderText() {
        await expect(this.transferCompleteHeaderText).toHaveText('Transfer Complete!');
    }

    async verifyErrorMessageForEmptyAmount(){
        await expect(this.errorText).toHaveText('Error!');
    }
}