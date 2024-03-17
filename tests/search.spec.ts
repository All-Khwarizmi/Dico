import { test, expect } from "@playwright/test";

test.describe("Page is available", () => {
  test("has title", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Dico/);
  });
});

test.describe("Search a new word", () => {
  test("Should allow to search words", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const input = page.getByPlaceholder("Que veux-tu chercher?");
    await expect(input).toBeVisible();

    const submitButton = page.getByRole("button", { name: "submit-word" });
    await expect(submitButton).toBeVisible();

    await input.fill("maison");
    await submitButton.click();

    const translation = page.getByTestId("translations");

    await expect(translation).toBeVisible();
  });
});
