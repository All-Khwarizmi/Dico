"use client";
import { useState } from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import { TranslationDirection } from "@/components/TranslationDirection";
import { Translations } from "@/utils/types";
import { inputWord, submitWord } from "@/utils/submitWord";
import Footer from "@/components/Footer";
import { TranslationTable } from "@/components/TranslationTable";

export default function Home() {
  const [word, setWord] = useState<string>("");
  const [isFr, setIsFR] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isTranslations, setIsTranslations] = useState<boolean>(false);
  const [translations, setTranslations] = useState<Translations>([]);

  const submitForm = (
    <>
      {isLoading ? null : (
        <form
          className="text-black  "
          onSubmit={(e) =>
            submitWord(
              e,
              setIsError,
              setIsLoading,
              setWord,
              setIsTranslations,
              setTranslations,
              word,
              isFr
            )
          }
        >
          <input
            required
            onChange={(event) => inputWord(event, setWord)}
            value={word}
            placeholder="Que veux-tu chercher?"
            className="rounded-lg border border-gray-400  dark:text-white border-1 dark:bg-gray-700 rounded-r-none px-3 py-1"
            type="text"
            name="word"
            autoFocus={true}
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
 
  return (
    <main
      className={`h-full w-full  ${
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

        <TranslationTable
          translations={translations}
          isLoading={isLoading}
          isTranslations={isTranslations}
        />
        {submitForm}
      </div>
      <Footer />
    </main>
  );
}
