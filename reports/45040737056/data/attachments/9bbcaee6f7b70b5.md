# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login/login.spec.ts >> TC-LOGIN-03: Invalid password
- Location: tests/login/login.spec.ts:70:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: locator('.error')
Timeout: 5000ms
- Expected  - 1
+ Received  + 3

- The username and password could not be verified.
+
+ 			An internal error has occurred and has been logged.
+ 		

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('.error')
    14 × locator resolved to <p class="error">↵⇆⇆⇆An internal error has occurred and has been l…</p>
       - unexpected value "
			An internal error has occurred and has been logged.
		"

```

```yaml
- link:
  - /url: admin.htm
  - img
- link "ParaBank":
  - /url: index.htm
  - img "ParaBank"
- paragraph: Experience the difference
- list:
  - listitem: Solutions
  - listitem:
    - link "About Us":
      - /url: about.htm
  - listitem:
    - link "Services":
      - /url: services.htm
  - listitem:
    - link "Products":
      - /url: http://www.parasoft.com/jsp/products.jsp
  - listitem:
    - link "Locations":
      - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
  - listitem:
    - link "Admin Page":
      - /url: admin.htm
- list:
  - listitem:
    - link "home":
      - /url: index.htm
  - listitem:
    - link "about":
      - /url: about.htm
  - listitem:
    - link "contact":
      - /url: contact.htm
- paragraph: Welcome John Smith
- heading "Account Services" [level=2]
- list:
  - listitem:
    - link "Open New Account":
      - /url: openaccount.htm
  - listitem:
    - link "Accounts Overview":
      - /url: overview.htm
  - listitem:
    - link "Transfer Funds":
      - /url: transfer.htm
  - listitem:
    - link "Bill Pay":
      - /url: billpay.htm
  - listitem:
    - link "Find Transactions":
      - /url: findtrans.htm
  - listitem:
    - link "Update Contact Info":
      - /url: updateprofile.htm
  - listitem:
    - link "Request Loan":
      - /url: requestloan.htm
  - listitem:
    - link "Log Out":
      - /url: logout.htm
- heading "Accounts Overview" [level=1]
- table:
  - rowgroup:
    - row "Account Balance* Available Amount":
      - columnheader "Account"
      - columnheader "Balance*"
      - columnheader "Available Amount"
  - rowgroup:
    - row "13344 $4742.92 $4742.92":
      - cell "13344":
        - link "13344":
          - /url: activity.htm?id=13344
      - cell "$4742.92"
      - cell "$4742.92"
    - row "13677 $150.00 $150.00":
      - cell "13677":
        - link "13677":
          - /url: activity.htm?id=13677
      - cell "$150.00"
      - cell "$150.00"
    - row "16119 $100.00 $100.00":
      - cell "16119":
        - link "16119":
          - /url: activity.htm?id=16119
      - cell "$100.00"
      - cell "$100.00"
    - row "16230 $99.99 $99.99":
      - cell "16230":
        - link "16230":
          - /url: activity.htm?id=16230
      - cell "$99.99"
      - cell "$99.99"
    - row "20892 $10.01 $10.01":
      - cell "20892":
        - link "20892":
          - /url: activity.htm?id=20892
      - cell "$10.01"
      - cell "$10.01"
    - row "21003 $990.00 $990.00":
      - cell "21003":
        - link "21003":
          - /url: activity.htm?id=21003
      - cell "$990.00"
      - cell "$990.00"
    - row "21114 $100.00 $100.00":
      - cell "21114":
        - link "21114":
          - /url: activity.htm?id=21114
      - cell "$100.00"
      - cell "$100.00"
    - row "Total $6192.92":
      - cell "Total"
      - cell "$6192.92"
      - cell
  - rowgroup:
    - row "*Balance includes deposits that may be subject to holds":
      - cell "*Balance includes deposits that may be subject to holds"
- list:
  - listitem:
    - link "Home":
      - /url: index.htm
    - text: "|"
  - listitem:
    - link "About Us":
      - /url: about.htm
    - text: "|"
  - listitem:
    - link "Services":
      - /url: services.htm
    - text: "|"
  - listitem:
    - link "Products":
      - /url: http://www.parasoft.com/jsp/products.jsp
    - text: "|"
  - listitem:
    - link "Locations":
      - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
    - text: "|"
  - listitem:
    - link "Site Map":
      - /url: sitemap.htm
    - text: "|"
  - listitem:
    - link "Contact Us":
      - /url: contact.htm
- paragraph: © Parasoft. All rights reserved.
- list:
  - listitem: "Visit us at:"
  - listitem:
    - link "www.parasoft.com":
      - /url: http://www.parasoft.com/
```

# Test source

```ts
  1  | import { expect, Locator, Page } from "@playwright/test";
  2  | 
  3  | export class LoginPage {
  4  | 
  5  |     protected readonly page: Page;
  6  |     protected readonly usernameInput: Locator;
  7  |     protected readonly passwordInput: Locator;
  8  |     protected readonly loginButton: Locator;
  9  |     protected readonly loginValidation: Locator;
  10 | 
  11 |     constructor(page: Page) {
  12 | 
  13 |         this.page = page;
  14 | 
  15 |         this.usernameInput = page.locator('[name="username"]');
  16 |         this.passwordInput = page.locator('[name="password"]');
  17 |         this.loginButton = page.getByRole('button', { name: 'Log In' });
  18 |         this.loginValidation = page.locator('.error')
  19 |     }
  20 | 
  21 |     async verifyLoginButtonIsVisible() {
  22 |         await expect(this.loginButton).toBeVisible();
  23 |     }
  24 | 
  25 |     async login(username: string, password: string) {
  26 | 
  27 |         await this.usernameInput.fill(username);
  28 |         await this.passwordInput.fill(password);
  29 |         await this.loginButton.click();
  30 |     }
  31 | 
  32 |     async validateInvalidUserNameOrAndPassword(){
> 33 |         await expect(this.loginValidation).toHaveText('The username and password could not be verified.');
     |                                            ^ Error: expect(locator).toHaveText(expected) failed
  34 |     }
  35 | }
```