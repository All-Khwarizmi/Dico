import { Trad } from "../pages/api/types"; // Importing the Trad type from types.ts
// An utility class to handle the local storage. A method to look for a translation in the local storage and another to save a translation in the local storage. To get the item we search for the key that is the word in the original language and the value is the translation in the target language.
export class LocalStorageCache {
  static getItem(key: string): Trad | null {
    const trad = JSON.parse(window.localStorage.getItem(key) || "null");
    return trad;
  }
  static setItem(key: string, value: Trad): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}
