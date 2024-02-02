import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Start of the api in dico.tsx");
  if (req.method === "GET") {
    return res.status(403).send({ message: "Only POST resquest are allowed" });
  }

  // Rest of the API logic
  console.info({ body: req.body });
  try {
    // Fetching data from DB
    console.log("Fetching data from DB");
    const db = await prisma.word.findFirst({
      where: {
        source: JSON.parse(req.body),
      },
    });
    if (db) {
      console.log("Data fetched from DB");
      res
        .status(200)
        .json({ source: req.body, translations: db.word, db: true });
    }
  } finally {
    // If not in DB, fetch from API
    console.log("Fetching data from API");
    try {
      const options: RequestInit = {
        method: "GET",
        headers: {
          "X-secret": process.env.NEXT_PUBLIC_SECRET!,
        },
      };

      const url = `https://api.pons.com/v1/dictionary?q=${req.body}&in=fr&language=es&l=esfr`;
      const response = await fetch(url, options);

      // check res status
      console.log("Response", response.status, response.statusText);
      if (response.statusText === "No Content" || response.status > 201)
        return res.status(400).json({ message: "Something went wrong" });

      const data = await response.json();

      // Parsing  data
      type Trad = {
        source: string;
        target: string;
      };
      const translations: Array<Trad> =
        data[0].hits[0].roms[0].arabs[0].translations;
      const source: string = data[0].hits[0].roms[0].headword;

      const translationsString = translations.map((trad) => {
        return JSON.stringify(trad);
      });

      // "Cashing" data to  primary postgres db
      try {
        const pushDb = await prisma.word.create({
          data: {
            word: translationsString,
            source: source,
          },
        });
      } catch (error) {
        console.log("Second catch", error);
      }

      res.status(200).json({ source, translations, db: false });
    } catch (error) {
      console.log("Third catch", error);

      res.status(400).json({ message: "Something went wrong" });
    }
  }
}
