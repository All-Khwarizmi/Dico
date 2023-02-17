'use client'

import { useState } from "react";



type Word = String

const page = () => {
    const [word, setWord] = useState<string>('')
    const [words, setWords] = useState<Array<Word>>([])
const handleChange = (e) => {
setWord(e.)
}
    const handleClick = async () => {
      const res = await fetch("/localhost:3000/api/prisma",
      {
        method: 'POST'
      }
      )
    const data = await res.json()
    console.log(data)
    }
  return (
    <main className='text-white'>
      <div>
        <div>
          <form className="p-10">
            <input className='bg-white' onChange={(e) => handleChange(e)} value={word} type='text' />
            <button
              className='bg-red-500 text-white'
              type='submit'
              onClick={handleClick}
            >Send</button>
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
