import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

// Set environement variables


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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // eslint-disable-next-line  @typescript-eslint/ban-types
  fn: Function
) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // Rest of the API logic
  const url = `https://api.pons.com/v1/dictionary?q=${req.body}&in=es&language=fr&l=esfr`;
  console.log('Got a spanish - french  request', req.body, req.method);

  const options: RequestInit = {
    method: 'GET',
    headers: {
      'X-secret': process.env.NEXT_PUBLIC_SECRET!,
    },
  };
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const url = `https://api.pons.com/v1/dictionary?q=${req.body}&in=es&language=fr&l=esfr`;
  console.log('Got a spanish - french  request', req.body, req.method);
   try {
    if (db) {
      res.json({ source: req.body, translations: db.word, db: true });
    } else {
      const options: RequestInit = {
        method: 'GET',
        headers: {
          'X-secret': process.env.NEXT_PUBLIC_SECRET!,
        },
      };

      const url = `https://api.pons.com/v1/dictionary?q=${req.body}&in=fr&language=es&l=esfr`;
      const response = await fetch(url, options);

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

      const pushDb = await prisma.word.create({
        data: {
          word: translationsString,
          source: source,
        },
      });
      res.json({ source, translations, db: false });
    }
  } catch (error) {
    console.log(error);

    res.json({ message: 'Something went wrong' });
  }
}
