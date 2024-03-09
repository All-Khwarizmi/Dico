import type { NextApiRequest, NextApiResponse } from "next";
import { Payload, payloadSchema } from "../../utils/schemas/payload";
import prisma from "../../utils/db";
import { Trad } from "../../utils/types";
import { Word } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.info(`Start of the api translations`);
  // Validate the request method
  if (req.method !== "POST") {
    console.info("Invalid request method");
    return res.status(403).json({ message: "Only POST resquest are allowed" });
  }

  // Validate the authorization header
  if (req.headers.authorization !== process.env.AUTHORIZATION_HEADER) {
    console.info("Invalid authorization header");
    return res.status(403).json({ message: "Not authorized" });
  }

  // Validate the body
  const body = payloadSchema.safeParse(req.body);
  if (!body.success) {
    console.warn("Invalid body");
    console.info({ error: body.error });
    return res.status(400).json({ message: "Invalid body" });
  }
  const bodyData: Payload = body.data;

  // Rest of the API
  console.info({ body: req.body });
  let db: Word | null = null;
  try {
    // Fetching data from DB
    console.info("Fetching data from DB");
    db = await prisma.word.findFirst({
      where: {
        source: bodyData.word,
      },
    });
  } catch (error) {
    console.error("An error ocurred trying to fetch from db", error);
  }

  if (db) {
    console.info("Data fetched from DB");
    return res
      .status(200)
      .json({ source: bodyData.word, translations: db.word, db: true });
  } else {
    // If not in DB, fetch from API
    console.info("No data in DB");
    console.info("Fetching data from API");

    let response: Response;
    try {
      response = await queryPonsApi(bodyData.source, bodyData.word);
      // check res status
      console.info("Response", response.status, response.statusText);
      if (response.statusText === "No Content" || response.status > 201)
        return res.status(400).json({ message: "Something went wrong" });
    } catch (error) {
      console.error("An error ocurred trying to fetch from API", error);
      return res.status(500).json({ message: "Something went wrong" });
    }

    const ponsData = await response.json();

    // Parsing  ponsData
    const translations: Array<Trad> =
      ponsData[0].hits[0].roms[0].arabs[0].translations;
    const source: string = ponsData[0].hits[0].roms[0].headword;

    const translationsString = translations.map((trad) => {
      return JSON.stringify(trad);
    });

    // "Cashing" ponsData to  primary postgres db
    try {
      await prisma.word.create({
        data: {
          word: translationsString,
          source: source,
        },
      });
    } catch (error) {
      console.info("Second catch", error);
    }

    res.status(200).json({ source, translations, db: false });
  }
}

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
