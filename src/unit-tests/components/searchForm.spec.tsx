import { describe, it, expect, vi, afterEach } from "vitest";
import { SearchForm } from "../../components/SearchForm";
import { fireEvent, render, screen } from "@testing-library/react";


describe("SearchForm", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("Should render the form", () => {
    const { unmount } = render(
      <SearchForm
        isLoading={false}
        handleSubmission={() => {}}
        handleInputWord={() => {}}
        word=""
      />
    );
    const form = screen.getByTestId("search-form");
    expect(form).toBeDefined();
    unmount();
  });

  it("Should not render the form when isLoading is true", () => {
    const { unmount } = render(
      <SearchForm
        isLoading={true}
        handleSubmission={() => {}}
        handleInputWord={() => {}}
        word=""
      />
    );
    const form = screen.queryByTestId("search-form");
    expect(form).toBeNull();
    unmount();
  });

  it("Should render the search input", () => {
    const { unmount } = render(
      <SearchForm
        isLoading={false}
        handleSubmission={() => {}}
        handleInputWord={() => {}}
        word=""
      />
    );
    const input = screen.getByPlaceholderText("Que veux-tu chercher?");
    expect(input).toBeDefined();
    unmount();
  });

  it("Should render the submit button", () => {
    const { unmount } = render(
      <SearchForm
        isLoading={false}
        handleSubmission={() => {}}
        handleInputWord={() => {}}
        word=""
      />
    );
    const button = screen.getByText("Chercher");
    expect(button).toBeDefined();
    unmount();
  });

  it("Should call the handleInputWord function when the input changes", () => {
    const handleInputWord = vi.fn(
      (e: React.ChangeEvent<HTMLInputElement>) => {}
    );

    const { unmount } = render(
      <SearchForm
        isLoading={false}
        handleSubmission={() => {}}
        handleInputWord={handleInputWord}
        word=""
      />
    );

    const input = screen.getByPlaceholderText("Que veux-tu chercher?");
    fireEvent.change(input, { target: { value: "test" } });
    expect(handleInputWord).toHaveBeenCalled();
    unmount();
  });

  it("Should call the handleSubmission function when the form is submitted", () => {
    const handleSubmission = vi.fn((e: React.FormEvent<HTMLFormElement>) => {});
    const { unmount } = render(
      <SearchForm
        isLoading={false}
        handleSubmission={handleSubmission}
        handleInputWord={() => {}}
        word=""
      />
    );
    const form = screen.getByTestId("search-form");
    fireEvent.submit(form);
    expect(handleSubmission).toHaveBeenCalled();
    unmount();
  });
});
