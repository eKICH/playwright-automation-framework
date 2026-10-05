# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login/login.spec.ts >> TC-LOGIN-08: Authenticated user can logout successfully
- Location: tests/login/login.spec.ts:211:5

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected pattern: /Accounts Overview/
Received string:  "ParaBank | Error"
Timeout: 5000ms

Call log:
  - Expect "toHaveTitle" with timeout 5000ms
    14 × unexpected value "ParaBank | Error"

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
- heading "Error!" [level=1]
- paragraph: An internal error has occurred and has been logged.
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
    - link "Forum":
      - /url: http://forums.parasoft.com/
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
  137 |                 process.env.USERNAME_EMPTY!,
  138 |                 process.env.PASSWORD_VALID!
  139 |             );
  140 | 
  141 |         });
  142 | 
  143 |         await test.step('Verify error message is shown', async () => {
  144 |             await expect(page.locator('.error')).toContainText('Please enter a username and password.');
  145 |         });
  146 |     } finally {
  147 |         await context.close();
  148 |     }
  149 | });
  150 | 
  151 | test("TC-LOGIN-06: Empty password", { tag: ['@login', '@regression', '@validation'] }, async ({ browser }) => {
  152 | 
  153 |     const context = await browser.newContext({ storageState: undefined });
  154 |     const page = await context.newPage();
  155 | 
  156 |     const loginPage = new LoginPage(page);
  157 | 
  158 |     try {
  159 |         await test.step('Navigate to login page', async () => {
  160 |             await page.goto('/');
  161 |         });
  162 | 
  163 |         await test.step('Login with empty username', async () => {
  164 | 
  165 |             await loginPage.login(
  166 |                 process.env.USERNAME_VALID!,
  167 |                 process.env.PASSWORD_EMPTY!
  168 |             );
  169 | 
  170 |         });
  171 | 
  172 |         await test.step('Verify error message is shown', async () => {
  173 |             await expect(page.locator('.error')).toContainText('Please enter a username and password.');
  174 |         });
  175 |     } finally {
  176 |         await context.close();
  177 |     }
  178 | 
  179 | });
  180 | 
  181 | test("TC-LOGIN-07: Empty username + password", { tag: ['@login', '@regression', '@validation'] }, async ({ browser }) => {
  182 | 
  183 |     const context = await browser.newContext({ storageState: undefined });
  184 |     const page = await context.newPage();
  185 | 
  186 |     const loginPage = new LoginPage(page);
  187 | 
  188 |     try {
  189 |         await test.step('Navigate to login page', async () => {
  190 |             await page.goto('/');
  191 |         });
  192 | 
  193 |         await test.step('Login with empty username', async () => {
  194 | 
  195 |             await loginPage.login(
  196 |                 process.env.USERNAME_EMPTY!,
  197 |                 process.env.PASSWORD_EMPTY!
  198 |             );
  199 | 
  200 |         });
  201 | 
  202 |         await test.step('Verify error message is shown', async () => {
  203 |             await expect(page.locator('.error')).toContainText('Please enter a username and password.');
  204 |         });
  205 |     } finally {
  206 |         await context.close();
  207 |     }
  208 | 
  209 | });
  210 | 
  211 | test("TC-LOGIN-08: Authenticated user can logout successfully", { tag: ['@regression', '@login', '@security', '@critical'] }, async ({ browser }) => {
  212 | 
  213 |     const context = await browser.newContext({ storageState: undefined });
  214 |     const page = await context.newPage();
  215 | 
  216 |     const loginPage = new LoginPage(page);
  217 |     const dashboardPage = new DashboardPage(page);
  218 | 
  219 |     try {
  220 |         await test.step('Navigate to login page', async () => {
  221 |             await page.goto('/');
  222 |         });
  223 | 
  224 |         await test.step('Login with valid credentials', async () => {
  225 |             await loginPage.login(
  226 |                 process.env.USERNAME_VALID!,
  227 |                 process.env.PASSWORD_VALID!
  228 |             );
  229 |         });
  230 | 
  231 |         await test.step('validate dashboard page is loaded', async () => {
  232 |             await dashboardPage.verifyDashboardIsLoaded();
  233 |         });
  234 | 
  235 |         await test.step('Verify overview page', async () => {
  236 |             await expect(page).toHaveURL(/overview/);
> 237 |             await expect(page).toHaveTitle(/Accounts Overview/);
      |                                ^ Error: expect(page).toHaveTitle(expected) failed
  238 |         });
  239 | 
  240 |         await test.step('logout', async () => {
  241 |             await dashboardPage.logout();
  242 |         });
  243 | 
  244 |         await test.step('Verify Login Page is loaded', async () => {
  245 |             await loginPage.verifyLoginButtonIsVisible();
  246 |         });
  247 |     } finally {
  248 |         await context.close();
  249 |     }
  250 | 
  251 | });
```