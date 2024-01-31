"use client";
import { Inter } from "@next/font/google";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
const inter = Inter({ subsets: ["latin"] });
import parse from "html-react-parser";
import { Dispatch, SetStateAction, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { MagnifyingGlass } from "react-loader-spinner";
import { useToast } from "@chakra-ui/react";
import { TranslationDirection } from "@/components/TranslationDirection";
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
  const [word, setWord] = useState<string>("");
  const [isFr, setIsFR] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isError, setIsError] = useState<Boolean>(false);
  const [isTranslations, setIsTranslations] = useState<Boolean>(false);
  const [translations, setTranslations] = useState<Translations>([]);

  const toast = useToast();
  const submitWord = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false);
    setIsLoading(true);
    let check = word.trim().split(" ").length;

    if (check > 1) {
      setIsLoading(false);
      console.log(check);
      toast({
        title: "Erreur",
        description: "Un seul mot à la fois.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      window.alert("Un seul mot à la fois.");
      setWord("");
      return;
    } else {
      setIsLoading(true);

      if (isFr)
        return fetchDico(word.trim().toLocaleLowerCase()).catch((err) =>
          console.log(err)
        );
      fetchDicoEsp(word.trim().toLocaleLowerCase()).catch((err) =>
        console.log(err)
      );
    }
  };

  const inputWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setWord(e.target.value);
  };

  const fetchDico = async (word: string): Promise<void> => {
    //  console.log('Fetching..');
    // 'https://dico-ochre.vercel.app/api/dico'
    // 'http://localhost:3000/api/dico'
    const url = "https://dico-uno.vercel.app/api/dico";
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
      },
      body: JSON.stringify(word),
    };

    setIsLoading(true);

    const res = await fetch(url, options);

    if (!res.ok) {
      setIsError(true);
      toast({
        title: "Erreur",
        description: res.statusText,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      window.alert(`
      L'erreur suivante est survenue: ${res.statusText}
      Veuillez réessayer.`);
      setIsTranslations(false);
      setIsLoading(false);
      return setWord("");
    }

    const data = await res.json();
    // console.log('Data: ', data);

    const { translations, db } = data;
    try {
      if (db) {
        const parsedTrads = translations.map((trad: string) => {
          return JSON.parse(trad);
        });
        setTranslations(parsedTrads);
      } else {
        setTranslations(translations);
      }

      setIsTranslations(true);
      window.scrollTo(0, 0);
      setWord("");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      toast({
        title: "Erreur",
        description: `
        L'erreur suivante est survenue: ${err}
        Veuillez réessayer.
        `,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      window.alert(`
      L'erreur suivante est survenue: ${res.statusText}
      Veuillez réessayer.`);
      console.log(err);
    }
  };
  const fetchDicoEsp = async (word: string): Promise<void> => {
    // console.log('Fetching..');
    const url = "https://dico-uno.vercel.app/api/esp";
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
      },
      body: JSON.stringify(word),
    };

    setIsLoading(true);
    const res = await fetch(url, options);

    if (!res.ok) {
      setIsError(true);
      setIsTranslations(false);
      setIsLoading(false);
      toast({
        title: "Erreur",
        description: res.statusText,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      window.alert(`
      L'erreur suivante est survenue: ${res.statusText}
      Veuillez réessayer.`);
      return setWord("");
    }

    const data = await res.json();
    // console.log('Data: ', data);

    const { translations, db } = data;
    try {
      if (db) {
        const parsedTrads = translations.map((trad: string) => {
          return JSON.parse(trad);
        });
        // console.log('Parsed Data: ', parsedTrads);
        setTranslations(parsedTrads);
      } else {
        setTranslations(translations);
      }

      setIsTranslations(true);
      window.scrollTo(0, 0);
      setWord("");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
      console.log(err);
      toast({
        title: "Erreur",
        description: `
        L'erreur suivante est survenue: ${err}
        Veuillez réessayer.
        `,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      window.alert(`
      L'erreur suivante est survenue: ${res.statusText}
      Veuillez réessayer.`);
    }
  };

  const submitForm = (
    <>
      {isLoading ? null : (
        <form className="text-black  " onSubmit={(e) => submitWord(e)}>
          <input
            required
            onChange={(event) => inputWord(event)}
            value={word}
            placeholder="Que veux-tu chercher?"
            className="rounded-lg border border-gray-400  dark:text-white border-1 dark:bg-gray-700 rounded-r-none px-3 py-1"
            type="text"
            name="word"
            id="word"
          />
          <button
            className="rounded-lg border text-gray-200 border-gray-400 border-1 rounded-l-none  dark:text-white  text-md font-bold 
            bg-gradient-to-r from-purple-700 to-indigo-700 px-3 py-1 dark:py-1"
            type="submit"
          >
            Chercher
          </button>
        </form>
      )}
    </>
  );
  const translationsTable = (
    <>
      {isTranslations && !isLoading && (
        <div className=" h-72  md:h-96 lg:w-[40%] md:w-[50%] w-[90%] rounded-lg  overflow-scroll  border-2 border-solid dark:border-gray-600 dark:bg-gray-700 shadow-md shadow-gray-500 ">
          <div className="text-black ">
            <div className="">
              <table className="max-h-max  relative w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="  sticky top-0 bg-gray-400 dark:bg-gray-900 text-xs uppercase text-gray-700 ">
                  <tr className="pb-4 ">
                    <th
                      scope="col"
                      className="px-6 font-bold text-black text-center dark:text-white py-3 "
                    >
                      Dans le sens de
                    </th>
                    <th
                      scope="col"
                      className="px-6 font-bold text-black text-center dark:text-white py-3 "
                    >
                      Traduction
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 ">
                  {translations?.map((trad: Trad, index) => {
                    return (
                      <tr
                        className={` border-b ${
                          translations.length > 1 ? null : "h-40"
                        }   text-center bg-white  dark:border-gray-700 dark:bg-gray-800`}
                        key={index}
                      >
                        <td className="py-4 text-center px-6  font-medium text-gray-900 dark:text-white">
                          {parse(trad?.source)}
                        </td>
                        <td className=" text-center px-6 font-medium text-gray-900 dark:text-white">
                          {parse(trad?.target)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
  return (
    <main
      className={`h-full  ${
        isTranslations ? "grid content-center" : "grid content-center"
      }`}
    >
      <div className="flex flex-col h-[20%] items-center gap-5">
        <h1
          className="text-6xl font-bold dark:text-purple-700 text-black"
          style={{
            background: "linear-gradient(45deg, #7e22ce, #c0efff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Dico
        </h1>
        {TranslationDirection(isFr, setIsFR, isTranslations)}
      </div>

      <div className="flex flex-col items-center gap-5">
        {isLoading ? (
          <div className="dark:text-green-400 flex flex-col items-center h-full w-full text-black font-bold">
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="magnifying-glass-loading"
              wrapperStyle={{}}
              wrapperClass="magnifying-glass-wrapper"
              glassColor="#c0efff"
              color="#7e22ce"
            />
          </div>
        ) : null}

        {translationsTable}
        {submitForm}
      </div>
    </main>
  );
}
