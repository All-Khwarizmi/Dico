import { PrismaClient } from '@prisma/client';
import { useState } from 'react';
const prisma = new PrismaClient();

type Word = String

const page = () => {
    const [words, setWords] = useState<Array<Word>>([])

    const handleClick = () => {


    }
  return (
    <main>
      <div>
        <div>
          <form>
            <input type='text' />
            <button type='submit' onClick={handleClick}></button>
          </form>
        </div>
        {/*  <div>
                {words.map(word => {
                    return (
                        <li key={word.id}></li>
                    )
                })}
            </div> */}
      </div>
    </main>
  );
};

export default page;
