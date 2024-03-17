import type { NextApiRequest, NextApiResponse } from "next";
import { Payload, payloadSchema } from "../../utils/schemas/payload";
import prisma from "../../utils/db";
import { Trad } from "../../utils/schemas/types";
import { Word } from "@prisma/client";
import { queryPonsApi } from "@/utils/queryPonsApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.info(`Start of the api translations`);
  // Allowed access control origin
  const allowedOrigins = [
    "http://localhost:3000",
    "https://dico-git-dev-jasonsuarez.vercel.app",
    "https://dico-git-jasonsuarez.vercel.app",
    "https://dico.jason-suarez.com",
    "https://dico-git-refactor-api-jasonsuarez.vercel.app",
  ];

  // Get the origin from the request
  const url = req.headers.origin;
  console.info({url});

  if (url) {
    if (allowedOrigins.includes(url)) {
      // Set options method for CORS

      res.setHeader("Access-Control-Allow-Origin", url);
      res.setHeader("Access-Control-Allow-Methods", "POST");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      if (req.method === "OPTIONS") {
        return res.status(200).end();
      }
    }
  }

  // Validate the request method
  if (req.method !== "POST") {
    console.info("Invalid request method");
    return res.status(403).json({ message: "Only POST resquest are allowed" });
  }

  // Validate the body
  const body = payloadSchema.safeParse(req.body);
  if (!body.success) {
    console.warn("Invalid body");
    console.info({ error: body.error });
    return res.status(400).json({
      message: `
    Invalid body:
    ${body.error.message}
    `,
    });
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
      if (response.statusText === "No Content" || response.status === 204) {
        return res.status(404).json({ message: "No content found" });
      } else if (response.status !== 200 || response.statusText !== "OK") {
        return res.status(500).json({ message: "Something went wrong" });
      }
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
