import { LocalStorageCache } from "@/utils/local-storage";
import { Translations } from "@/utils/schemas/types";
import { translateWord } from "@/utils/translate-word";
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";

export function useSearchWord() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isTranslations, setIsTranslations] = useState<boolean>(false);
  const [translations, setTranslations] = useState<Translations>([]);
  const [word, setWord] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [isFr, setIsFR] = useState<boolean>(true);
  const toast = useToast();

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
      try {
        const source = isFr ? "fr" : "es";
        const [error, trads] = await translateWord({ word, source });
        if (error) {
          setIsError(true);
          setIsTranslations(false);
          setIsLoading(false);
          setWord("");
          if (error.statusCode === 404) {
            toast({
              title: "Mot introuvable",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            return;
          }
          toast({
            title: "Erreur inconnue",
            status: "error",
            duration: 3000,
            isClosable: true,
          });

          return;
        }
        if (trads) {
          setTranslations(trads);
          setIsTranslations(true);
          setIsLoading(false);
          //~ Check if word is in local storage
          const isWord = LocalStorageCache.hasItem(word);
          if (!isWord) {
            LocalStorageCache.setItem(word, trads);
          }
          setWord("");
        }
      } catch (error) {
        setIsError(true);
        setIsTranslations(false);
        setIsLoading(false);
        toast({
          title: "Erreur inconnue, veuillez réessayer.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setWord("");
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
    isFr,
    setIsFR,
  };
}
