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
    e
    const res = await fetch('/localhost:3000/api/prisma', {
      method: 'POST',
    });
    const data = await res.json();
    console.log(data);
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
