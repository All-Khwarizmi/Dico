import { LocalStorageCache } from "@/utils/local-storage";
import { Translations } from "@/utils/schemas/types";
import { translateWord } from "@/utils/translate-word";
import { useState, useEffect } from "react";

export function useSearchWord() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isTranslations, setIsTranslations] = useState<boolean>(false);
  const [translations, setTranslations] = useState<Translations>([]);
  const [word, setWord] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [isFr, setIsFR] = useState<boolean>(true);

  useEffect(() => {
    async function wordSearch() {
      setIsLoading(true);

      // Check if word is in local storage
      const isWord = LocalStorageCache.hasItem(word.trim().toLocaleLowerCase());
      if (isWord) {
        const localTrad = LocalStorageCache.getItem(
          word.trim().toLocaleLowerCase()
        );
        setTranslations(localTrad);
        setIsTranslations(true);
        setIsLoading(false);
        setWord("");
        return;
      }
      const source = isFr ? "fr" : "es";
      return translateWord(
        word.trim().toLocaleLowerCase(),
        source,
        setIsLoading,
        setIsError,
        setTranslations,
        setWord,
        setIsTranslations
      ).catch((err) => console.log(err));
    }
    if (word !== "") {
      wordSearch();
    }
  }, [search]);

  return {
    isLoading,
    setIsLoading,
    isError,
    isTranslations,
    translations,
    word,
    setWord,
    setSearch,
    isFr,
    setIsFR,
  };
}
