# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: account-opening/account-opening.spec.ts >> TC-ACCOUNT-02: Authenticated user can open new account
- Location: tests/account-opening/account-opening.spec.ts:14:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.getAttribute: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('select#fromAccountId.input').locator('option').first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - link:
        - /url: admin.htm
        - img [ref=e4] [cursor=pointer]
      - link "ParaBank":
        - /url: index.htm
        - img "ParaBank" [ref=e5] [cursor=pointer]
      - paragraph [ref=e6]: Experience the difference
    - generic [ref=e7]:
      - list [ref=e8]:
        - listitem [ref=e9]: Solutions
        - listitem [ref=e10]:
          - link "About Us" [ref=e11] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e12]:
          - link "Services" [ref=e13] [cursor=pointer]:
            - /url: services.htm
        - listitem [ref=e14]:
          - link "Products" [ref=e15] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/products.jsp
        - listitem [ref=e16]:
          - link "Locations" [ref=e17] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - listitem [ref=e18]:
          - link "Admin Page" [ref=e19] [cursor=pointer]:
            - /url: admin.htm
      - list [ref=e20]:
        - listitem [ref=e21]:
          - link "home" [ref=e22] [cursor=pointer]:
            - /url: index.htm
        - listitem [ref=e23]:
          - link "about" [ref=e24] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e25]:
          - link "contact" [ref=e26] [cursor=pointer]:
            - /url: contact.htm
    - generic [ref=e27]:
      - generic [ref=e28]:
        - paragraph [ref=e29]: Welcome John Smith
        - heading "Account Services" [level=2] [ref=e30]
        - list [ref=e31]:
          - listitem [ref=e32]:
            - link "Open New Account" [ref=e33] [cursor=pointer]:
              - /url: openaccount.htm
          - listitem [ref=e34]:
            - link "Accounts Overview" [ref=e35] [cursor=pointer]:
              - /url: overview.htm
          - listitem [ref=e36]:
            - link "Transfer Funds" [ref=e37] [cursor=pointer]:
              - /url: transfer.htm
          - listitem [ref=e38]:
            - link "Bill Pay" [ref=e39] [cursor=pointer]:
              - /url: billpay.htm
          - listitem [ref=e40]:
            - link "Find Transactions" [ref=e41] [cursor=pointer]:
              - /url: findtrans.htm
          - listitem [ref=e42]:
            - link "Update Contact Info" [ref=e43] [cursor=pointer]:
              - /url: updateprofile.htm
          - listitem [ref=e44]:
            - link "Request Loan" [ref=e45] [cursor=pointer]:
              - /url: requestloan.htm
          - listitem [ref=e46]:
            - link "Log Out" [ref=e47] [cursor=pointer]:
              - /url: logout.htm
      - generic [ref=e50]:
        - heading "Error!" [level=1] [ref=e51]
        - paragraph [ref=e52]: An internal error has occurred and has been logged.
  - generic [ref=e54]:
    - list [ref=e55]:
      - listitem [ref=e56]:
        - link "Home" [ref=e57] [cursor=pointer]:
          - /url: index.htm
        - text: "|"
      - listitem [ref=e58]:
        - link "About Us" [ref=e59] [cursor=pointer]:
          - /url: about.htm
        - text: "|"
      - listitem [ref=e60]:
        - link "Services" [ref=e61] [cursor=pointer]:
          - /url: services.htm
        - text: "|"
      - listitem [ref=e62]:
        - link "Products" [ref=e63] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e64]:
        - link "Locations" [ref=e65] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e66]:
        - link "Forum" [ref=e67] [cursor=pointer]:
          - /url: http://forums.parasoft.com/
        - text: "|"
      - listitem [ref=e68]:
        - link "Site Map" [ref=e69] [cursor=pointer]:
          - /url: sitemap.htm
        - text: "|"
      - listitem [ref=e70]:
        - link "Contact Us" [ref=e71] [cursor=pointer]:
          - /url: contact.htm
    - paragraph [ref=e72]: © Parasoft. All rights reserved.
    - list [ref=e73]:
      - listitem [ref=e74]: "Visit us at:"
      - listitem [ref=e75]:
        - link "www.parasoft.com" [ref=e76] [cursor=pointer]:
          - /url: http://www.parasoft.com/
```

# Test source

```ts
  1  | import { expect, Locator, Page } from "@playwright/test";
  2  | 
  3  | export class OpenNewAccount {
  4  | 
  5  |     protected readonly page: Page;
  6  | 
  7  |     protected readonly typeOfAccountDropDown: Locator;
  8  |     protected readonly fromAccountDropDown: Locator;
  9  |     protected readonly openNewAccountButton: Locator;
  10 |     protected readonly accountOpenedTitle: Locator;
  11 |     protected readonly newAccountNumber: Locator;
  12 | 
  13 |     constructor(page: Page) {
  14 | 
  15 |         this.page = page;
  16 | 
  17 |         this.typeOfAccountDropDown = page.locator('select#type.input');
  18 |         this.fromAccountDropDown = page.locator('select#fromAccountId.input');
  19 |         this.openNewAccountButton = page.getByRole('button', { name: 'Open New Account' });
  20 |         this.accountOpenedTitle = page.getByRole('heading', { name: 'Account Opened!' });
  21 |         this.newAccountNumber = page.locator('a#newAccountId');
  22 |     }
  23 | 
  24 | 
  25 |     async openSavingsAccount() {
  26 | 
> 27 |         const firstOption = await this.fromAccountDropDown.locator('option').first().getAttribute('value');
     |                                                                                      ^ Error: locator.getAttribute: Test timeout of 30000ms exceeded.
  28 | 
  29 |         await this.typeOfAccountDropDown.selectOption({
  30 |             label: 'SAVINGS'
  31 |         });
  32 | 
  33 |         await this.fromAccountDropDown.selectOption(firstOption!);
  34 | 
  35 |         await this.openNewAccountButton.click();
  36 |     }
  37 | 
  38 |     async confirmAccountOpenedTitleIsPresentAndAccountNumberIsPresent() {
  39 |         await expect(this.accountOpenedTitle).toBeVisible();
  40 |         await expect(this.newAccountNumber).toHaveText(/^\d+$/);
  41 |     }
  42 | 
  43 |     async confirmURLContainsOpenAccountAndTitle() {
  44 |         await expect(this.page).toHaveURL(/openaccount/);
  45 |         await expect(this.page).toHaveTitle(/Open Account/);
  46 |     }
  47 | 
  48 | 
  49 | }
```