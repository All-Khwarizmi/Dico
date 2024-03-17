import { describe, expect, it } from "vitest";
import { Title } from "/Users/jasonsuarez/App/dico-local/src/components/Title";
import { render, screen } from "@testing-library/react";
import React from "react";

describe("Title", () => {
  it("should work", () => {
    render(<Title />);
    const title = screen.getByText("Dico");
    expect(title).toBeDefined();
  });
});
