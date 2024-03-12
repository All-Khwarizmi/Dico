import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

test("get started link", async ({ page }) => {
  // // Click the get started link.
  // await page.getByRole('main', { name: 'container' }).click();
  // // Expects page to have a heading with the name of Installation.
  // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test.describe("Page is available", () => {
  test("has title", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Dico/);
  });
});

test.describe("Search a new word", () => {
  test("Should allow to search words", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    const input = page.getByPlaceholder("Que veux-tu chercher?");
    const submitButton = page.getByRole("button", { name: "Chercher" });

    await input.fill("casa");
    await submitButton.click();

    const word = page.getByTestId("maison ,[object Object]");

    await expect(word).toBeVisible();
  });
});
