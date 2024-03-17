import { describe, expect, it } from "vitest";
import App from "@/app/page";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { wait } from "@testing-library/user-event/dist/types/utils";

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

  it("Should render the submit button", () => {
    const button = screen.getByText("Chercher");
    expect(button).toBeDefined();
  });

  // it("Should show translations when a search is submitted", async () => {
  //   const input = screen.getByPlaceholderText("Que veux-tu chercher?");
  //   const button = screen.getByText("Chercher");
  //   fireEvent.change(input, { target: { value: "maison" } });
  //   fireEvent.click(button);
  //   await waitFor(
  //     async () => {
  //       const translation = await screen.findByTestId(
  //         "translations",
  //         {},
  //         { timeout: 25000 }
  //       );
  //       expect(translation).toBeDefined();
  //     },
  //     { timeout: 25000 }
  //   );
  // });
});
