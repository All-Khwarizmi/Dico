'use client';

import { useState } from 'react';

type Word = String;

const page = () => {
  const [word, setWord] = useState<string>('');
  const [words, setWords] = useState<Array<Word>>([]);
console.log(word)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };
  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
console.log('Fetching..');
const url = 'http://localhost:3000/api/prisma';
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
      },
      body: JSON.stringify(word),
    };
    const res = await fetch(url, options);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await res.json();
    console.log('Data: ', data);
const {db, search, wordFromDb} = data
 const test = db.filter((word: any) => {
   if (word.source === ) return word;
 });
   
  };
  return (
    <main className='text-white'>
      <div>
        <div>
          <form onSubmit={(e) => handleClick(e)} className='p-10'>
            <input
              className='bg-white text-black'
              onChange={(e) => handleChange(e)}
              value={word}
              type='text'
            />
            <button className='bg-red-500 text-white' type='submit'>
              Send
            </button>
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
