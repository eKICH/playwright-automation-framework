import { chromium } from "@playwright/test";

async function globalSetup() {

    const browser = await chromium.launch();

    const context = await browser.newContext();

    const page = await context.newPage();

    await page.goto(process.env.BASE_URL!);

    await page.locator('[name="username"]').fill(process.env.USERNAME_VALID!);
    await page.locator('[name="password"]').fill(process.env.PASSWORD_VALID!);
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.waitForURL('**/overview.htm**');

    await context.storageState({ path: 'src/fixtures/session.json' });

    await browser.close();
}

export default globalSetup;