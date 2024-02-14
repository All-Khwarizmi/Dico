import { Trad } from "../pages/api/types"; // Importing the Trad type from types.ts
// An utility class to handle the local storage. A method to look for a translation in the local storage and another to save a translation in the local storage. To get the item we search for the key that is the word in the original language and the value is the translation in the target language.
export class LocalStorageCache {
  static getItem(key: string): Trad[] {
    const isWordInLocalStorage = LocalStorageCache.hasItem(key);
    if (!isWordInLocalStorage) {
      return [];
    }
    const trad = JSON.parse(window.localStorage.getItem(key)!);
    return trad;
  }
  static setItem(key: string, value: Trad[]): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  // A method to check if the local storage has a translation for a word.
  static hasItem(key: string): boolean {
    return window.localStorage.getItem(key) !== null;
  }
}
