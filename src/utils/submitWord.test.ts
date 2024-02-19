import { inputWord } from "./submitWord";

describe("inputWord", () => {
  it("should update the word state", () => {
    const setWordMock = jest.fn();
    const eventMock = {
      target: {
        value: "test word",
      },
    };

    inputWord(eventMock, setWordMock);

    expect(setWordMock).toHaveBeenCalledWith("test word");
  });
});
