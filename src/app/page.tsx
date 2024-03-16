"use client";
import { useState } from "react";
import { TitleAndDirection } from "@/components/TranslationDirection";
import { Translations } from "@/utils/schemas/types";
import Footer from "@/components/Footer";
import { TranslationTable } from "@/components/TranslationTable";
import { LoadingGlass } from "@/components/LoadingGlass";
import "./app.css";
import { submitWord } from "@/utils/submitWord";

export default function App() {
  const [isFr, setIsFR] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isTranslations, setIsTranslations] = useState<boolean>(false);
  const [translations, setTranslations] = useState<Translations>([]);
  const [word, setWord] = useState<string>("");
  const handleInputWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setWord(e.target.value);
  };
  return (
    <>
      <TitleAndDirection
        isFr={isFr}
        setIsFR={setIsFR}
        isTranslations={isTranslations}
      />

      <section className="flex flex-col items-center gap-5">
        {isLoading ? <LoadingGlass /> : null}

        <TranslationTable
          translations={translations}
          isLoading={isLoading}
          isTranslations={isTranslations}
        />
        {isLoading ? null : (
          <form
            className="text-black shadow-md flex flex-col gap-3 sm:flex-row"
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
              aria-label="Insert word"
              required
              onChange={(event) => handleInputWord(event)}
              value={word}
              placeholder="Que veux-tu chercher?"
              className="rounded-lg border shadow-md shadow-gray-500 border-gray-400 dark:text-white border-1 dark:bg-gray-700  px-3 py-1"
              type="text"
              name="word"
              autoFocus={true}
              id="word"
            />
            <button
              aria-label="submit-word"
              className="rounded-lg border shadow-md shadow-gray-500 text-gray-200 border-gray-400 border-1   dark:text-white  text-md font-bold 
            bg-gradient-to-r from-purple-700 to-indigo-700 px-3 py-1 dark:py-1"
              type="submit"
              id="submit-word"
              name="submit-word"
            >
              Chercher
            </button>
          </form>
        )}
      </section>
      <Footer />
    </>
  );
}
