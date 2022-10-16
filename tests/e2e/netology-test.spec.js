const { test, expect } = require('@playwright/test');
const { USERNAME, PASSWORD } = require('../../user');

test("Successful authentication", async ({ page }) => {
    await page.goto('https://netology.ru/?modal=sign_in');
    await page.getByTestId("profile-personal-info-avatar-popup").screenshot({ path: 'screenshots/[01]_SA_open_page.png', fullPage: true });
    await page.getByPlaceholder("email").fill(USERNAME);
    await page.getByPlaceholder("Пароль").fill(PASSWORD);
    await page.getByTestId("profile-personal-info-avatar-popup").screenshot({ path: 'screenshots/[02]_SA_fill_data.png', fullPage: true });
    await page.getByTestId("login-submit-btn").click();
    await expect(page).toHaveURL("https://netology.ru/profile");
    await page.screenshot({ path: 'screenshots/[03]_SA_enter_profile.png', fullPage: true });
});

test("Wrong authentication", async ({ page }) => {
    await page.goto('https://netology.ru/?modal=sign_in');
    await page.getByTestId("profile-personal-info-avatar-popup").screenshot({ path: 'screenshots/[04]_WA_open_page.png', fullPage: true });
    await page.getByPlaceholder("email").fill("tester@netology.com");
    await page.getByPlaceholder("Пароль").fill("123qwe!@#");
    await page.getByTestId("profile-personal-info-avatar-popup").screenshot({ path: 'screenshots/[05]_WA_fill_data.png', fullPage: true });
    await page.getByTestId("login-submit-btn").click();
    await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
    await expect(page.getByTestId("login-error-hint")).toBeVisible();
    await page.getByTestId("profile-personal-info-avatar-popup").screenshot({ path: 'screenshots/[06]_WA_get_message.png', fullPage: true });
});