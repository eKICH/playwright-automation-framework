import { expect, Locator, Page } from "@playwright/test";

export class BillPay {

    protected readonly page: Page;

    protected readonly billPaymentHeadingText: Locator;
    protected readonly payeeNameInputField: Locator;
    protected readonly addressInputField: Locator;
    protected readonly cityInputField: Locator;
    protected readonly stateInputField: Locator;
    protected readonly zipCodeInputField: Locator;
    protected readonly phoneInputField: Locator;
    protected readonly accountInputField: Locator;
    protected readonly verifyAccountInputField: Locator;
    protected readonly amountInputField: Locator;
    protected readonly fromAccountDropDown: Locator;
    protected readonly sendPaymentButton: Locator;
    protected readonly payeeNameResult: Locator;
    protected readonly amountResult: Locator;
    protected readonly fromAccountResult: Locator;
    protected readonly accountMismatchErrorMessage: Locator;
    protected readonly payeeNameIsRequiredValidation: Locator;
    protected readonly addressIsRequiredValidation: Locator;
    protected readonly invalidAmountValidation: Locator;

    constructor(page: Page) {
        this.page = page;

        this.billPaymentHeadingText = page.getByRole('heading', { name: 'Bill Payment Service' });
        this.payeeNameInputField = page.locator('.input[name="payee.name"]');
        this.addressInputField = page.locator('.input[name="payee.address.street"]');
        this.cityInputField = page.locator('.input[name="payee.address.city"]');
        this.stateInputField = page.locator('.input[name="payee.address.state"]');
        this.zipCodeInputField = page.locator('.input[name="payee.address.zipCode"]');
        this.phoneInputField = page.locator('.input[name="payee.phoneNumber"]');
        this.accountInputField = page.locator('.input[name="payee.accountNumber"]');
        this.verifyAccountInputField = page.locator('.input[name="verifyAccount"]');
        this.amountInputField = page.locator('.input[name="amount"]');
        this.fromAccountDropDown = page.locator('.input[name="fromAccountId"]');
        this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });
        this.payeeNameResult = page.locator('#payeeName');
        this.amountResult = page.locator('#amount');
        this.fromAccountResult = page.locator('#fromAccountId');
        this.accountMismatchErrorMessage = page.locator('span#validationModel-verifyAccount-mismatch');
        this.payeeNameIsRequiredValidation = page.locator('span#validationModel-name');
        this.addressIsRequiredValidation = page.locator('span#validationModel-address');
        this.invalidAmountValidation = page.locator('#validationModel-amount-invalid.error');
    }

    async verifyPageURLContainsBillPay() {
        await expect(this.page).toHaveURL(/billpay/);
    }

    async verifyBillPayPageHeader() {
        await expect(this.billPaymentHeadingText).toHaveText('Bill Payment Service');
    }

    async fillPayeeDetails(payeeName: string, address: string, city: string, state: string, zipCode: string, phoneNumber: string) {
        await this.payeeNameInputField.fill(payeeName);
        await this.addressInputField.fill(address);
        await this.cityInputField.fill(city);
        await this.stateInputField.fill(state);
        await this.zipCodeInputField.fill(zipCode);
        await this.phoneInputField.fill(phoneNumber);
    }

    async fillInAccountAndVerifyAccount(accountNumber: number, verifyAccount: number) {
        await this.accountInputField.fill(accountNumber.toString());
        await this.verifyAccountInputField.fill(verifyAccount.toString());
    }

    async fillPaymentAmount(amount: string): Promise<string> {
        await this.amountInputField.fill(amount.toString());
        return await this.amountInputField.inputValue();
    }

    async selectFromAccount(): Promise<string> {
        await this.fromAccountDropDown.selectOption({ index: 0 });
        return await this.fromAccountDropDown.inputValue();
    }

    async sendPayment() {
        await this.sendPaymentButton.click();
    }

    async verifyPaymentSuccess(payeeName: string, amount: string, accountNumberFrom: string) {
        await expect(this.payeeNameResult).toHaveText(payeeName);
        await expect(this.amountResult).toHaveText('$'+amount+'.00');
        await expect(this.fromAccountResult).toHaveText(accountNumberFrom);
    }

    async verifyAccountMismatchErrorMessage(){
        await expect(this.accountMismatchErrorMessage).toHaveText('The account numbers do not match.');
    }

    async missingRequiredFields(){
        await expect(this.payeeNameIsRequiredValidation).toHaveText('Payee name is required.');
        await expect(this.addressIsRequiredValidation).toHaveText('Address is required.');
    }

    async invalidAmount(){
        await expect(this.invalidAmountValidation).toHaveText('Please enter a valid amount.')
    }
}