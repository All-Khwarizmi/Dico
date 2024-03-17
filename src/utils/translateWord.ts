import { LocalStorageCache } from "./localStorage";
import { Translations } from "./schemas/types";

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
    const url =
      process.env.NEXT_PUBLIC_PREVIEW_ENV === "true"
        ? "https://dico-git-dev-jasonsuarez.vercel.app/api/translations"
        : process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api/translations"
        : `${process.env.NEXT_PUBLIC_BASE_URL}/api/translations`;
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word, source }),
    };

    setIsLoading(true);

    const res = await fetch(url, options);
    const data = await res.json();

    if (!res.ok) {
      setIsError(true);
      window.alert(`
      L'erreur suivante est survenue: ${data.message}
      Veuillez réessayer.`);
      console.log({
        message: "Error in fetching translations. Status not OK.",
        response: JSON.stringify(data.message),
      });

      setIsTranslations(false);
      setIsLoading(false);
      return setWord("");
    }

    const { translations, db } = data;
    if (db) {
      const parsedTrads = translations.map((trad: string) => {
        return JSON.parse(trad);
      });

      //! TODO: return this
      setTranslations(parsedTrads);
      // Check if word is in local storage
      const isWord = LocalStorageCache.hasItem(word);
      if (!isWord) {
        console.log("Caching in local storage", word, parsedTrads);
        LocalStorageCache.setItem(word, parsedTrads);
      }
    } else {
      //! TODO: return this instead
      setTranslations(translations);
      // Check if word is in local storage
      const isWord = LocalStorageCache.hasItem(word);
      if (!isWord) {
        LocalStorageCache.setItem(word, translations);
      }
    }
    // Return information along with translations to be used in the UI to update the translations, error, loading state
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
