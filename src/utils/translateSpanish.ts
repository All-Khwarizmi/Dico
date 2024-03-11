import { LocalStorageCache } from "./localStorage";
import { Translations } from "./types";
const BASE_URL = "https://dico.jason-suarez.com/";

/**
 * Translates a Spanish word using the Dico API.
 * 
 * @param word - The word to be translated.
 * @param setIsLoading - A function to set the loading state.
 * @param setIsError - A function to set the error state.
 * @param setTranslations - A function to set the translations state.
 * @param setWord - A function to set the word state.
 * @param setIsTranslations - A function to set the translations state.
 * @returns A Promise that resolves when the translation is complete.
 */
export const translateSpanishWord = async (
  word: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
  setTranslations: React.Dispatch<React.SetStateAction<Translations>>,
  setWord: React.Dispatch<React.SetStateAction<string>>,
  setIsTranslations: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  try {
    console.log("Fetching in dico ESP..");

    const url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api/esp"
        : `${BASE_URL}api/esp`;
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(word),
    };

    setIsLoading(true);
    const res = await fetch(url, options);
    console.log("Response", res.status, res.statusText);
    const data = await res.json();
    console.log({ data });
    if (!res.ok) {
      console.log("Error in fetchDicoEsp first catch");
      setIsError(true);
      setIsTranslations(false);
      setIsLoading(false);
      console.log({
        message: "Error in fetchDicoEsp first catch",
        response: JSON.stringify(res),
      });
      window.alert(`
      L'erreur suivante est survenue: ${res.statusText}
      Veuillez réessayer.`);
      return setWord("");
    }
    const { translations, db } = data;
    console.log("Data fetched from DB", db);
    if (db) {
      const parsedTrads = translations.map((trad: string) => {
        return JSON.parse(trad);
      });
      setTranslations(parsedTrads);
      // Check if word is in local storage
      const isWord = LocalStorageCache.hasItem(word);
      if (!isWord) {
        LocalStorageCache.setItem(word, parsedTrads);
      }
      console.log("Data cached in local storage");
    } else {
      console.log("Data fetched from API");
      setTranslations(translations);
      // Check if word is in local storage
      const isWord = LocalStorageCache.hasItem(word);
      if (!isWord) {
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
    console.log({ message: "Error in fetchDicoEsp last catch", err });
    window.alert(`
        L'erreur suivante est survenue: ${err}
        Veuillez réessayer.`);
    return setWord("");
  }
};
