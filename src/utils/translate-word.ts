import { URLS } from "./consts";
import ApiError from "./errors/errors";
import { LocalStorageCache } from "./local-storage";
import { Translations } from "./types";

export async function translateWord({
  word,
  source,
}: {
  word: string;
  source: string;
}): Promise<[ApiError | undefined, Translations | undefined]> {
  try {
    const url =
      process.env.NEXT_PUBLIC_PREVIEW_ENV === "true"
        ? URLS.preview
        : process.env.NODE_ENV === "development"
        ? URLS.development
        : URLS.production;
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word, source }),
    };

    const res = await fetch(url, options);
    const data = await res.json();
    if (!res.ok) {
      if (res.status === 404) {
        return [ApiError.notFound(), undefined];
      }
      if (res.status >= 400) {
        return [ApiError.badRequest(data.message), undefined];
      }
      return [ApiError.internalServerError(), undefined];
    }
    const { translations, db } = data;
    if (db) {
      const parsedTrads = translations.map((trad: string) => {
        return JSON.parse(trad);
      });
      
      return [undefined, parsedTrads];
    } else {
      
      return [undefined, translations];
    }
  } catch (error) {
    return [ApiError.unknownError(), undefined];
  }
}
