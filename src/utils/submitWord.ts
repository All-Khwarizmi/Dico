import { LocalStorageCache } from "./localStorage";
import { translateFrenchWord } from "./translateFr";
import { translateSpanishWord } from "./translateSpanish";
import { Translations } from "./types";

/**
 * Submits a word for translation.
 * 
 * @param e - The form event.
 * @param setIsError - A function to set the error state.
 * @param setIsLoading - A function to set the loading state.
 * @param setWord - A function to set the word state.
 * @param setIsTranslations - A function to set the translations state.
 * @param setTranslations - A function to set the translations.
 * @param word - The word to submit for translation.
 * @param isFr - A boolean indicating if the word is in French.
 */
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
  str: string,
  setWord: React.Dispatch<React.SetStateAction<string>>
) => {
  return setWord(str);
};
