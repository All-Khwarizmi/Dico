import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Fn that checks if searched word is in DB
const checkDb = async () => {
  const db = await prisma.word.findMany();
};

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
  
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
  
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  if (req.method === 'GET')
    return res.status(403).send({ message: 'Only POST resquest are allowed' });

  /*  Fetch only one word and no all of them  */

  try {
     const db = await prisma.word.findFirst({
    where: {
      source: JSON.parse(req.body),
    },
  })
  if (db) {
      res
        .status(200)
        .json({ source: req.body, translations: db.word, db: true });
    } 
  } catch (error ) {

    
  }
 
}
