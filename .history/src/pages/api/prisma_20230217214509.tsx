import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import { useState } from 'react';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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
  /*    */
  const db = await prisma.word.findMany();
  const wordFromDb = db.filter((word) => word.source === 'maison');

  try {
    if (wordFromDb.length) {
      res.json(wordFromDb);
    } else {
        const response = await fetch(url, options);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = await response.json();

        // Parsing  data
        // eslint-disable-next-line  @typescript-eslint/no-unsafe-member-access
        const translations: unknown =
          data[0].hits[0].roms[0].arabs[0].translations;
        // eslint-disable-next-line  @typescript-eslint/no-unsafe-member-access
        const source: unknown = data[0].hits[0].roms[0].headword;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        res.json({ source, translations });
      const pushDb = await prisma.word.create({
        data: req.body,
      });
      res.json(wordFromDb);
    }
  } catch (error) {
    console.log(error);

    res.json({ message: 'Something went wrong' });
  }
}
