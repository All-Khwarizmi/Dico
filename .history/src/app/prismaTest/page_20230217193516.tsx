import { PrismaClient } from '@prisma/client';
import { useState } from 'react';
const prisma = new PrismaClient();



const page = () => {
    const [words, setWords] = useState<>([])

    const handleClick = () => {

    }
  return (
    <main>
        <div>
            <div>
                <button onClick={handleClick}></button>
            </div>
        </div>
    </main>
  )
};

export default page;
