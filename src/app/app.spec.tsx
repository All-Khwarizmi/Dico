import { describe, expect, it } from "vitest";
import App from "/Users/jasonsuarez/App/dico-local/src/app/page";
import { render, screen } from "@testing-library/react";

describe("App", () => {
  render(<App />);

  it("Should render the title", () => {
    const title = screen.getByText("Dico");
    expect(title).toBeDefined();
  });

  it("Should render the search input", () => {
    const input = screen.getByPlaceholderText("Que veux-tu chercher?");
    expect(input).toBeDefined();
  });
});
