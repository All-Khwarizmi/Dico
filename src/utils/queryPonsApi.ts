/**
 * Builds the URL for the translation API based on the given word and source language.
 * @param word - The word to be translated.
 * @param source - The source language of the word. Can be either "fr" for French or "es" for Spanish.
 * @returns The URL for the translation API.
 */
export function urlBuilder(word: string, source: "fr" | "es") {
  const direction = source === "fr" ? "es" : "fr";
  return `https://api.pons.com/v1/dictionary?q=${word}&in=${source}&language=${direction}&l=esfr`;
}

/**
 * Queries the PONS API to get translations for a given word.
 *
 * @param source - The source language of the word (either "fr" for French or "es" for Spanish).
 * @param word - The word to be translated.
 * @returns A Promise that resolves to the response from the PONS API.
 */
export function queryPonsApi(source: "fr" | "es", word: string) {
  const url = urlBuilder(word, source);
  const options: RequestInit = {
    method: "GET",
    headers: {
      "X-secret": process.env.NEXT_PUBLIC_SECRET!,
    },
  };

  return fetch(url, options);
}
