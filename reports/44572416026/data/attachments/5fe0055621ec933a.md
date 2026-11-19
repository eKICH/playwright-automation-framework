# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login/login.spec.ts >> TC-LOGIN-04: Invalid username + password
- Location: tests/login/login.spec.ts:96:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('.error')
Expected: "The username and password could not be verified."
Received: "An internal error has occurred and has been logged."
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('.error')
    14 × locator resolved to <p class="error">An internal error has occurred and has been logge…</p>
       - unexpected value "An internal error has occurred and has been logged."

```

```yaml
- paragraph: An internal error has occurred and has been logged.
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