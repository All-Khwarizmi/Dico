import { inputWord } from "./submitWord";

describe("inputWord", () => {
  it("should update the word state", () => {
    const setWordMock = jest.fn();
    const eventMock = "test word";

    inputWord(eventMock, setWordMock);

    expect(setWordMock).toHaveBeenCalledWith("test word");
  });
});
