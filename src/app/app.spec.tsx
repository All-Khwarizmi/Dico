import { describe, expect, it } from "vitest";
import App from "/Users/jasonsuarez/App/dico-local/src/app/page";
import { render, screen } from "@testing-library/react";

describe("App", () => {
  it("Should render the title", () => {
    render(<App />);
    const title = screen.getByText("Dico");
    expect(title).toBeDefined();
  });
});
