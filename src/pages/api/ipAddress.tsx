import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const origin = req.headers.origin;
    console.log("Origin:", origin);
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    if (ip === undefined) {
      return res.status(404).json({ error: "IP not found" });
    }
    console.log("IP:", ip);
    return res.status(200).json({ ip });
  } catch (error) {
    console.warn("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
