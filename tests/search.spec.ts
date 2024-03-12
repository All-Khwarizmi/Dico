import { test, expect } from "@playwright/test";

test.describe("Page is available", () => {
  test("has title", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Dico/);

    await expect(page.getByPlaceholder("Que veux-tu chercher?")).toBeVisible({
      timeout: 10000,
    });
    const input = page.getByPlaceholder("Que veux-tu chercher?");

    const submitButton = page.getByText("Chercher");

    await input.fill("casa");
    await submitButton.click();

    await expect(page.getByTestId("maison ,[object Object]")).toBeVisible({
      timeout: 25000,
    });
  });
});

// test.describe("Search a new word", () => {
//   test("Should allow to search words", async ({ page }) => {
//     await page.goto("http://localhost:3000/");

//     await expect(page.getByPlaceholder("Que veux-tu chercher?")).toBeVisible();
//     const input = page.getByPlaceholder("Que veux-tu chercher?");

//     const submitButton = page.getByText("Chercher");

//     await input.fill("casa");
//     await submitButton.click();

//     await expect(page.getByTestId("maison ,[object Object]")).toBeVisible();
//   });
// });
