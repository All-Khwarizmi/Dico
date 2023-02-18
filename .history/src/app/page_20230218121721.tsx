'use client';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import { FaArrowLeft } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import { FaArrowRight } from 'react-icons/fa';
import EspModal from '@/components/EspModal';
import DicoModal from '@/components/DicoModal';
import { IconContext } from 'react-icons';
const inter = Inter({ subsets: ['latin'] });
import parse from 'html-react-parser';
import { useState } from 'react';
import Link from 'next/link';

type Trad = {
  source: string;
  target: string;
};
type TradParsed = string;
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
 
    let check = word.split(' ').length;
    console.log('Checking', check);
    if (check > 1) {
      window.alert('1 mot à la fois');
     return  setWord("")
    }   
    
    setIsLoading(true);

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
    // 'http://localhost:3000/api/dico'
    const url = 'https://dico-ochre.vercel.app/api/dico'; ;
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

    const { translations, db } = data;
    try {
      if (db) {
        const parsedTrads = translations.map((trad: string) => {
          return JSON.parse(trad);
        });
        console.log('Parsed Data: ', parsedTrads);
        setTranslations(parsedTrads);
      } else {
        setTranslations(translations);
      }

      setIsTranslations(true);
      setWord('');
    } catch (err) {
      console.log(err);
    }
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

    const { translations, db } = data;
    try {
      if (db) {
        const parsedTrads = translations.map((trad: string) => {
          return JSON.parse(trad);
        });
        console.log('Parsed Data: ', parsedTrads);
        setTranslations(parsedTrads);
      } else {
        setTranslations(translations);
      }

      setIsTranslations(true);
      setWord('');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main
      className={` h-screen w-screen overflow-scroll ${
        isTranslations ? 'grid content-start ' : 'flex flex-col justify-center '
      }`}
    >
      
      
    </main>
  );
}
