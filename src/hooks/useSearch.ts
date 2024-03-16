import { LocalStorageCache } from "@/utils/localStorage";
import { Translations } from "@/utils/schemas/types";
import { useState, useEffect } from "react";

export function useSearchWord() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isTranslations, setIsTranslations] = useState<boolean>(false);
  const [translations, setTranslations] = useState<Translations>([]);
  const [word, setWord] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    async function wordSearch() {
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
        setWord("");
        return;
      }
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
  };
}
