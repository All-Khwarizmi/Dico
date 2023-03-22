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
 

  // res.json({message: 'No data in DB'});
  /* const wordFromDb = db?.filter((word) => word.source === JSON.parse(req.body)); */

  try {
    
      
      const options: RequestInit = {
        method: 'GET',
        headers: {
          'X-secret': process.env.NEXT_PUBLIC_SECRET!,
        },
      };

      const url = `https://api.pons.com/v1/dictionary?q=${req.body}&in=fr&language=es&l=esfr`;
      const response = await fetch(url, options);

      // check res status
      console.log('Response', response.status, response.statusText);
      if (response.statusText === 'No Content' || response.status > 201)
        return res.status(400).json({ message: 'Something went wrong' });
        
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
      const pushDb = await prisma.word.create({
        data: {
          word: translationsString,
          source: source,
        },
      });
      res.status(200).json({ source, translations, db: false });
  
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: 'Something went wrong' });
  }
}
