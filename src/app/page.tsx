"use client";
import { use, useEffect, useState } from "react";
import { TitleAndDirection } from "@/components/TranslationDirection";
import { Translations } from "@/utils/schemas/types";
import Footer from "@/components/Footer";
import { TranslationTable } from "@/components/TranslationTable";
import { LoadingGlass } from "@/components/LoadingGlass";
import "./app.css";
import { submitWord } from "@/utils/submitWord";
import { LocalStorageCache } from "@/utils/localStorage";
import { set } from "zod";
import { useSearchWord } from "@/hooks/useSearch";

export default function App() {
  const {
    isLoading,
    setIsLoading,
    isError,
    isTranslations,
    translations,
    word,
    setWord,
    setSearch,
  } = useSearchWord();
  const [isFr, setIsFR] = useState<boolean>(true);

  const handleInputWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setWord(e.target.value);
  };
  function handleSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Word validation (only one word at a time)
    const check = word.trim().split(" ").length;
    if (check > 1) {
      setIsLoading(false);
      window.alert("Un seul mot à la fois.");
      setWord("");
      return;
    }
    setSearch(word.trim());
  }
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
            onSubmit={(e) => handleSubmission(e)}
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
