import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const mostSearchedWords = await prisma.search.groupBy({
        by: ["wordSource"],
        _count: {
          wordId: true,
        },
        orderBy: {
          _count: {
            wordId: "desc",
          },
        },
        take: 10, // Limite les résultats aux 10 premiers mots les plus recherchés
      });

      res.status(200).json(mostSearchedWords);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
