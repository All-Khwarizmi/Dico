import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Start of the api in esp.tsx");

  if (req.method === "GET")
    return res.status(403).send({ message: "Only POST resquest are allowed" });

  // Rest of the API logic
  console.log({ body: req.body });

  try {
    // Fetching data from DB
    console.log("Fetching data from DB");
    const db = await prisma.word.findFirst({
      where: {
        source: req.body,
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
    try {
      const options: RequestInit = {
        method: "GET",
        headers: {
          "X-secret": process.env.NEXT_PUBLIC_SECRET!,
        },
      };

      const url = `https://api.pons.com/v1/dictionary?q=${req.body}&in=es&language=fr&l=esfr`;
      console.log("Got a spanish - french  request", req.body, req.method);
      const response = await fetch(url, options);

      // check res status
      console.log("Response", response.status, response.statusText);
      if (response.statusText === "No Content" || response.status > 201) {
        console.log("Return 400");
        return res.status(400).json({ message: "Something went wrong" });
      }

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

      // Cashing to primary postgres DB
      try {
        console.log("Cashing to primary postgres DB");
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
