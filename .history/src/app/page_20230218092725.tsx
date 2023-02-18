'use client';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import { FaArrowLeft } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import { FaArrowRight } from 'react-icons/fa';
import EspModal from '@/components/EspModal';
import DicoModal from '@/components/DicoModal';

const inter = Inter({ subsets: ['latin'] });
import parse from 'html-react-parser';
import { useState } from 'react';
import Link from 'next/link';

type Trad = {
  source: string;
  target: string;
};
type TradParsed = string
type Translations = Array<Trad>;
interface TranslationsFetch {
  translations: Array<Trad> | Array<TradParsed>;
  source: string;
  db: boolean;
}
export default function Home() {
  const [word, setWord] = useState<string>('');
  const [isFr, setIsFR] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isTranslations, setIsTranslations] = useState<Boolean>(false);
  const [translations, setTranslations] = useState<Translations>([]);

  const submitWord = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    let check = word.split(' ').length;
    console.log('Submitting', check);
    if (check > 1) {
      return window.alert('1 mot à la fois');
    }
    if (isFr)
      return fetchDico(word.toLocaleLowerCase()).catch((err) =>
        console.log(err)
      );
    fetchDicoEsp(word.toLocaleLowerCase()).catch((err) => console.log(err));
  };

  const inputWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setWord(e.target.value);
  };

  const fetchDico = async (word: string): Promise<void> => {
    console.log('Fetching..');
    // 'https://dico-ochre.vercel.app/api/dico'
    const url = 'http://localhost:3000/api/dico';
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
      },
      body: JSON.stringify(word),
    };
    const res = await fetch(url, options);

    const data = await res.json();
    console.log('Data: ', data);

    const { translations, source, db }: TranslationsFetch = data;
    if (db) {
      const parsedTrads = translations.map((trad) => {
        return JSON.parse(trad);
      });
      console.log('Parsed Data: ', parsedTrads);
      setTranslations(parsedTrads);
    } else {
       setTranslations(translations);
    }

    setIsTranslations(true);
    setWord('');
  };
  const fetchDicoEsp = async (word: string): Promise<void> => {
    console.log('Fetching..');
    const url = 'https://dico-ochre.vercel.app/api/esp';
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
      },
      body: JSON.stringify(word),
    };
    const res = await fetch(url, options);

    const data = await res.json();
    console.log('Data: ', data);

    const { translations }: TranslationsFetch = data;
    setTranslations(translations);
    setIsTranslations(true);
    setWord('');
  };
  return (
    <main className='h-screen w-screen'>
      <div className='grid place-items-center pt-5 '>
        {isFr ? (
          <div
            className={`grid  grid-cols-3 ${
              isTranslations ? 'w-[40%]' : 'md:w-[20%]'
            }  place-items-center  `}
          >
            <button onClick={() => setIsFR(!isFr)}>
              <h1 className='py-5 text-center uppercase text-1xl'>Français</h1>
            </button>
            <button onClick={() => setIsFR(!isFr)}>
              <FaArrowRight />
            </button>
            <button onClick={() => setIsFR(!isFr)}>
              <h1 className='py-5 text-center uppercase text-1xl'>Espagnol</h1>
            </button>
          </div>
        ) : (
          <div
            className={`grid  grid-cols-3 ${
              isTranslations ? 'w-[40%]' : 'md:w-[20%]'
            }  place-items-center  `}
          >
            <button onClick={() => setIsFR(!isFr)}>
              <h1 className='py-5 text-center uppercase text-1xl'>Français</h1>
            </button>
            <button onClick={() => setIsFR(!isFr)}>
              <FaArrowLeft />
            </button>
            <button onClick={() => setIsFR(!isFr)}>
              <h1 className='py-5 text-center uppercase text-1xl'>Espagnol</h1>
            </button>
          </div>
        )}
      </div>
      <div className='flex h-[80%] flex-col  items-center gap-5'>
        {isLoading ? (
          !isTranslations ? (
            <p className='dark:text-white text-black text-2xl font-bold'>
              Loading...
            </p>
          ) : null
        ) : null}
        {isTranslations && (
          <div className=' h-[60%] max-h-[80%] lg:w-[40%] md:w-[50%] w-[90%] rounded-lg overflow-scroll rounded border-2 border-solid dark:border-gray-600 dark:bg-gray-700 shadow-md shadow-gray-500 '>
            <div className='text-black '>
              <div className=''>
                <table className='  relative w-full text-left text-sm text-gray-500 dark:text-gray-400'>
                  <thead className='  sticky top-0 bg-gray-400 dark:bg-gray-900 text-xs uppercase text-gray-700 '>
                    <tr>
                      <th
                        scope='col'
                        className='px-6 font-bold text-black text-center dark:text-white py-3 '
                      >
                        Dans le sens de
                      </th>
                      <th
                        scope='col'
                        className='px-6 font-bold text-black text-center dark:text-white py-3 '
                      >
                        Traduction
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-gray-800'>
                    {translations?.map((trad: Trad, index) => {
                      return (
                        <tr
                          className='border-b text-center bg-white  dark:border-gray-700 dark:bg-gray-800'
                          key={index}
                        >
                          <td className='px-6 py-4'> {parse(trad?.source)}</td>
                          <th
                            scope='row'
                            className='whitespace-nowrap text-center px-6 py-4 font-medium text-gray-900 dark:text-white'
                          >
                            {parse(trad?.target)}
                          </th>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <form className='text-black  ' onSubmit={(e) => submitWord(e)}>
          <input
            onChange={(event) => inputWord(event)}
            value={word}
            placeholder='Que veux-tu chercher?'
            className='rounded-lg border border-gray-400  dark:text-white border-1 dark:bg-gray-700 rounded-r-none px-3 py-1'
            type='text'
            name='word'
            id='word'
          />
          <button
            className='rounded-lg border border-gray-400 border-1 rounded-l-none bg-gray-400 dark:text-white  text-md font-bold dark:bg-purple-900 px-3 py-1 dark:py-1'
            type='submit'
          >
            Chercher
          </button>
        </form>
      </div>
    </main>
  );
}
