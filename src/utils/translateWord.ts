import { LocalStorageCache } from "./localStorage";
import { Translations } from "./types";

/**
 * Translates a French word using an API call and updates the state accordingly.
 * @param word - The word to be translated.
 * @param setIsLoading - A state setter function to update the loading state.
 * @param setIsError - A state setter function to update the error state.
 * @param setTranslations - A state setter function to update the translations state.
 * @param setWord - A state setter function to update the word state.
 * @param setIsTranslations - A state setter function to update the translations availability state.
 * @returns A Promise that resolves when the translation is complete.
 */
export const translateWord = async (
  word: string,
  source: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
  setTranslations: React.Dispatch<React.SetStateAction<Translations>>,
  setWord: React.Dispatch<React.SetStateAction<string>>,
  setIsTranslations: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  try {
    console.log("Fetching in dico..");
    const isPreviewEnv = process.env.NEXT_PUBLIC_PREVIEW_ENV != null;
    const previewEnv = process.env.NEXT_PUBLIC_PREVIEW_ENV ?? "";
    console.log({ previewEnv, isPreviewEnv });
    const url =
      process.env.NEXT_PUBLIC_PREVIEW_ENV === "true"
        ? "https://dico-git-dev-jasonsuarez.vercel.app/"
        : process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api/translations"
        : `${process.env.NEXT_PUBLIC_BASE_URL}api/translations`;
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: process.env.NEXT_PUBLIC_AUTHORIZATION_HEADER ?? "",
      },
      body: JSON.stringify({ word, source }),
    };

    setIsLoading(true);

    const res = await fetch(url, options);

    if (!res.ok) {
      setIsError(true);
      window.alert(`
      L'erreur suivante est survenue: ${res.statusText}
      Veuillez réessayer.`);
      console.log({
        message: "Error in fetchDico first catch",
        response: JSON.stringify(res.text().then((text) => text)),
      });
      setIsTranslations(false);
      setIsLoading(false);
      return setWord("");
    }

    const data = await res.json();
    console.log("Data: ", data);

    const { translations, db } = data;
    if (db) {
      const parsedTrads = translations.map((trad: string) => {
        return JSON.parse(trad);
      });
      console.log({ parsedTrads });
      setTranslations(parsedTrads);
      // Check if word is in local storage
      const isWord = LocalStorageCache.hasItem(word);
      if (!isWord) {
        console.log("Caching in local storage", word, parsedTrads);
        LocalStorageCache.setItem(word, parsedTrads);
      }
      console.log("Data cached in local storage");
    } else {
      setTranslations(translations);
      // Check if word is in local storage
      const isWord = LocalStorageCache.hasItem(word);
      if (!isWord) {
        console.log("Caching in local storage", word, translations);
        LocalStorageCache.setItem(word, translations);
      }
      console.log("Data cached in local storage");
    }

    setIsTranslations(true);
    window.scrollTo(0, 0);
    setWord("");
    setIsLoading(false);
  } catch (err) {
    setIsLoading(false);
    setIsError(true);

    window.alert(`
      Une erreur est survenue: ${err}
      Veuillez réessayer.`);
    console.log(err);
  }
};
