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
                <button onClick={handleClick}></button>
            </div>
            <div>
                {words.map(word => {
                    return (
                        <li key={}></li>
                    )
                })}
            </div>
        </div>
    </main>
  )
};

export default page;
