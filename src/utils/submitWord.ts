import { LocalStorageCache } from "./localStorage";
import { translateFrenchWord } from "./translateFr";
import { translateSpanishWord } from "./translateSpanish";
import { Translations } from "./types";

export const submitWord = (
  e: React.FormEvent<HTMLFormElement>,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setWord: React.Dispatch<React.SetStateAction<string>>,
  setIsTranslations: React.Dispatch<React.SetStateAction<boolean>>,
  setTranslations: React.Dispatch<React.SetStateAction<Translations>>,
  word: string,
  isFr: boolean
) => {
  e.preventDefault();
  setIsError(false);
  setIsLoading(true);
  let check = word.trim().split(" ").length;

  if (check > 1) {
    setIsLoading(false);
    console.log(check);

    window.alert("Un seul mot à la fois.");
    setWord("");
    return;
  } else {
    setIsLoading(true);

    // Check if word is in local storage
    const isWord = LocalStorageCache.hasItem(word.trim().toLocaleLowerCase());
    if (isWord) {
      console.log("Word is in local storage");
      const localTrad = LocalStorageCache.getItem(
        word.trim().toLocaleLowerCase()
      );

      console.log("Translations", JSON.parse(JSON.stringify(localTrad!)));
      setTranslations(localTrad);
      setIsTranslations(true);
      setIsLoading(false);
      return setWord("");
    } else {
      if (isFr)
        return translateFrenchWord(
          word.trim().toLocaleLowerCase(),
          setIsLoading,
          setIsError,
          setTranslations,
          setWord,
          setIsTranslations
        ).catch((err) => console.log(err));
      translateSpanishWord(
        word.trim().toLocaleLowerCase(),
        setIsLoading,
        setIsError,
        setTranslations,
        setWord,
        setIsTranslations
      ).catch((err) => console.log(err));
    }
  }
};

export const inputWord = (
  e: React.ChangeEvent<HTMLInputElement>,
  setWord: React.Dispatch<React.SetStateAction<string>>
) => {
  return setWord(e.target.value);
};
