const { test, expect } = require('@playwright/test');
const { USERNAME, PASSWORD } = require('../../user');

test("Successful authentication", async ({ page }) => {
    await page.goto('https://netology.ru/?modal=sign_in');
    await page.getByPlaceholder("email").fill(USERNAME);
    await page.getByPlaceholder("Пароль").fill(PASSWORD);
    await page.getByTestId("login-submit-btn").click();
    await expect(page).toHaveURL("https://netology.ru/profile");
});

test("Wrong authentication", async ({ page }) => {
    await page.goto('https://netology.ru/?modal=sign_in');
    await page.getByPlaceholder("email").fill("tester@netology.com");
    await page.getByPlaceholder("Пароль").fill("123qwe!@#");
    await page.getByTestId("login-submit-btn").click();
    await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
    await expect(page.getByTestId("login-error-hint")).toBeVisible();
});