import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.info("Start of the api in esp.tsx");
    if (req.method === "GET") {
      console.error("Return 403");
      return res
        .status(403)
        .json({ message: "Only POST resquest are allowed" });
    }

    // Rest of the API logic
    console.info({ body: req.body });

    // Fetching data from DB
    console.info("Fetching data from DB");
    const db = await prisma.word.findFirst({
      where: {
        source: req.body,
      },
    });

    if (db) {
      console.info("Data fetched from DB");
      res
        .status(200)
        .json({ source: req.body, translations: db.word, db: true });
    } else {
      // If not in DB, fetch from API
      console.log("No data in DB");
      const options: RequestInit = {
        method: "GET",
        headers: {
          "X-secret": process.env.NEXT_PUBLIC_SECRET!,
        },
      };

      const url = `https://api.pons.com/v1/dictionary?q=${req.body}&in=es&language=fr&l=esfr`;
      console.info("Got a spanish - french  request", req.body, req.method);
      const response = await fetch(url, options);

      // check res status
      console.info("Response", response.status, response.statusText);
      if (response.statusText === "No Content" || response.status > 201) {
        console.error("Return 400");
        return res.status(400).json({ message: "Something went wrong" });
      }
      const data = await response.json();

      // Parsing  data
      console.info("Parsing data");
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
      console.info("Cashing to primary postgres DB");
      await prisma.word.create({
        data: {
          word: translationsString,
          source: source,
        },
      });

      res.status(200).json({ source, translations, db: false });
    }
  } catch (error) {
    console.error("Third catch", error);

    res.status(400).json({ message: "Something went wrong" });
  }
}
