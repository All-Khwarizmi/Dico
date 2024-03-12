import { test, expect } from "@playwright/test";

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
    const submitButton = page.getByRole("button", { name: "submit-word" });

    await input.fill("casa");
    await submitButton.click();

    const word = page.getByTestId("maison ,[object Object]");

    await expect(word).toBeVisible();
  });
});
