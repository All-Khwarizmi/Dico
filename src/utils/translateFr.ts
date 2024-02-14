import { LocalStorageCache } from "./localStorage";
import { Translations } from "./types";

export const translateFrenchWord = async (
  word: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
  setTranslations: React.Dispatch<React.SetStateAction<Translations>>,
  setWord: React.Dispatch<React.SetStateAction<string>>,
  setIsTranslations: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  try {
    console.log("Fetching in dico..");
    const url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api/dico"
        : "https://dico-uno.vercel.app/api/dico";
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(word),
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
        response: JSON.stringify(res),
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
