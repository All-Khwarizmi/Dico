import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const words = [
      { id: 1, word: "Bonjour", searches: 100 },
      { id: 2, word: "Chien", searches: 75 },
      { id: 3, word: "Chat", searches: 50 },
    ];

    res.status(200).json(words);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
