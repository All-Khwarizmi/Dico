"use client";
import { useState } from "react";
import { TranslationDirection } from "@/components/TranslationDirection";
import { Translations } from "@/utils/types";
import Footer from "@/components/Footer";
import { TranslationTable } from "@/components/TranslationTable";
import { TranslationForm } from "@/components/TranslationForm";
import { Title } from "@/components/Title";
import { LoadingGlass } from "@/components/LoadingGlass";
export default function Home() {
  const [word, setWord] = useState<string>("");
  const [isFr, setIsFR] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isTranslations, setIsTranslations] = useState<boolean>(false);
  const [translations, setTranslations] = useState<Translations>([]);


  return (
    <main
      className={`h-full w-full  ${
        isTranslations ? "grid content-center" : "grid content-center"
      }`}
    >
      <div className="flex flex-col h-[20%] items-center gap-5">
        <Title />
        <TranslationDirection
          isFr={isFr}
          setIsFR={setIsFR}
          isTranslations={isTranslations}
        />
      </div>

      <div className="flex flex-col items-center gap-5">
        {isLoading ? <LoadingGlass /> : null}

        <TranslationTable
          translations={translations}
          isLoading={isLoading}
          isTranslations={isTranslations}
        />
        <TranslationForm
          word={word}
          setWord={setWord}
          isFr={isFr}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setIsError={setIsError}
          setIsTranslations={setIsTranslations}
          setTranslations={setTranslations}
        />
      </div>
      <Footer />
    </main>
  );
}
