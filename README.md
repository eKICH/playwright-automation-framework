# 🎭 Parabank Playwright Automation Framework

An end-to-end test automation framework built with **Playwright** and **TypeScript**, demonstrated against [ParaBank](https://parabank.parasoft.com/) — a banking web application. The framework follows the Page Object Model pattern, supports data-driven testing, global session management via `storageState`, and is fully integrated with GitHub Actions CI/CD with Allure reporting.

---

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Framework Features](#framework-features)
- [CI/CD Pipeline](#cicd-pipeline)
- [Allure Reports](#allure-reports)
- [Environment Variables](#environment-variables)

---

## 🛠 Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev/) | Browser automation |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe test authoring |
| [Allure](https://docs.qameta.io/allure/) | Test reporting |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipeline |
| [GitHub Pages](https://pages.github.com/) | Allure report hosting |

---

## 📁 Project Structure

```
parabank-playwright-automation-framework/
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions CI/CD pipeline
├── src/
│   ├── fixtures/
│   │   └── index.ts                # Custom Playwright fixtures
│   ├── interface/
│   │   └── payee.interface.ts      # TypeScript interfaces for test data
│   ├── pages/
│   │   ├── bill-pay/
│   │   │   └── bill-pay.page.ts    # Bill Pay page object
│   │   ├── dashboard/
│   │   │   └── dashboard.page.ts   # Dashboard page object
│   │   ├── login/
│   │   │   └── login.page.ts       # Login page object
│   │   ├── open-new-account/
│   │   │   └── open-new-account.page.ts
│   │   └── transfer-funds/
│   │       └── transfer-funds.page.ts
│   └── utils/
│       └── json.helper.ts          # JSON file reader utility
├── tests/
│   ├── account-opening/
│   │   └── account-opening.spec.ts
│   ├── bill-payment/
│   │   ├── data/
│   │   │   └── payee-details.json  # DDT test data
│   │   └── bill-pay.spec.ts
│   ├── login/
│   │   └── login.spec.ts
│   └── transfer-funds/
│       └── transfer-funds.spec.ts
├── global-setup.ts                 # Global session setup
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/eKICH/playwright-automation-framework.git
cd playwright-automation-framework

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps chromium
```

### Environment Setup

Create a `.env` file in the root of the project:

```env
BASE_URL=https://parabank.parasoft.com/
USERNAME_VALID=john
PASSWORD_VALID=demo
USERNAME_INVALID=wronguser
PASSWORD_INVALID=wrongpassword
USERNAME_EMPTY=
PASSWORD_EMPTY=
```

> ⚠️ Never commit `.env` to version control. It is listed in `.gitignore`.

---

## ▶️ Running Tests

```bash
# Run all regression tests
npm run test:regression

# Run smoke tests only
npm run test:smoke

# Run a specific spec file
npx playwright test tests/login/login.spec.ts

# Run tests by tag
npx playwright test --grep "@smoke"
npx playwright test --grep "@negative"

# Run tests headed (visible browser)
npx playwright test --headed

# Run tests in debug mode
npx playwright test --debug
```

---

## 🧪 Test Coverage

| Suite | Test Cases | Tags |
|---|---|---|
| Login | 8 | `@login` `@smoke` `@regression` `@negative` `@security` `@validation` |
| Transfer Funds | 3 | `@transfer` `@smoke` `@regression` `@negative` |
| Bill Payment | 6 | `@billpay` `@smoke` `@regression` `@negative` |
| Account Opening | 2 | `@account` `@smoke` `@regression` |
| **Total** | **19** | |

### Tag Reference

| Tag | Description |
|---|---|
| `@smoke` | Critical happy path tests |
| `@regression` | Full regression suite |
| `@negative` | Invalid input and error scenarios |
| `@security` | Authentication and security tests |
| `@validation` | Input validation tests |
| `@critical` | Business-critical flows |

---

## ⚙️ Framework Features

### Page Object Model (POM)
All page interactions are encapsulated in page objects under `src/pages/`. Each page class exposes methods for actions and assertions, keeping tests clean and maintainable.

### Custom Fixtures
Defined in `src/fixtures/index.ts`, fixtures inject page objects directly into tests — eliminating repetitive instantiation boilerplate:

```typescript
test('example', async ({ dashboardPage, billPay }) => {
    await dashboardPage.navigateToPayBill();
    await billPay.verifyBillPayPageHeader();
});
```

### Global Session (storageState)
`global-setup.ts` logs in once before all tests and saves the session to `src/fixtures/session.json`. All tests start pre-authenticated, reducing login overhead and improving reliability.

Login tests opt out of the global session using:

```typescript
const context = await browser.newContext({ storageState: undefined });
```

### Data-Driven Testing (DDT)
Test data is stored as JSON under `tests/bill-payment/data/payee-details.json` and read via the `readJSON` utility:

```typescript
const payees = readJSON<PayeeDetails[]>('tests/bill-payment/data/payee-details.json');
```

### JSON Helper Utility
Located at `src/utils/json.helper.ts`, the generic helper reads and parses any JSON file with full TypeScript type safety:

```typescript
readJSON<T>(filePath: string): T
```

---

## 🔄 CI/CD Pipeline

The GitHub Actions pipeline at `.github/workflows/playwright.yml` runs on:

- Every push to `main`
- Every pull request targeting `main`
- Daily at 8:00 AM UTC (scheduled)

### Pipeline Steps

```
Checkout → Install Node → Install dependencies → Install Playwright
    → Run tests → Generate Allure report → Upload artifact
    → Deploy to GitHub Pages → Parse results → Send email → Send WhatsApp
```

### Notifications

**Email** — styled HTML report sent after every run including:
- Run details (branch, status, actor, trigger)
- Summary cards (passed / failed / broken)
- Individual test case results
- Links to the GitHub Actions run and Allure report

**WhatsApp** — plain text summary via CallMeBot including pass/fail counts and a direct link to the Allure report.

---

## 📊 Allure Reports

Allure reports are automatically generated and deployed to GitHub Pages after every CI run.

### Viewing Reports

Each run generates a unique report URL:

```
https://ekich.github.io/playwright-automation-framework/reports/<run-id>/
```

The run ID is included in the email and WhatsApp notifications after every pipeline execution.

### Generating Reports Locally

```bash
# Run tests
npm run test:regression

# Generate report
npm run allure:generate

# Open report in browser
npm run allure:open

# Or serve live
npm run allure:serve
```

---

## 🔐 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `BASE_URL` | Application base URL | ✅ |
| `USERNAME_VALID` | Valid login username | ✅ |
| `PASSWORD_VALID` | Valid login password | ✅ |
| `USERNAME_INVALID` | Invalid username for negative tests | ✅ |
| `PASSWORD_INVALID` | Invalid password for negative tests | ✅ |
| `USERNAME_EMPTY` | Empty string for validation tests | ✅ |
| `PASSWORD_EMPTY` | Empty string for validation tests | ✅ |
| `EMAIL_USERNAME` | Gmail address for notifications | CI only |
| `EMAIL_PASSWORD` | Gmail app password | CI only |
| `EMAIL_RECIPIENT` | Notification recipient email | CI only |
| `WHATSAPP_PHONE` | Phone number for WhatsApp alerts | CI only |
| `WHATSAPP_API_KEY` | CallMeBot API key | CI only |

> CI only variables are stored as GitHub Actions secrets and never committed to the repository.

---

## 👤 Author

**Chris Mutuma** — Test Automation Engineer

- GitHub: [@eKICH](https://github.com/eKICH)