"use client";
import { useState } from "react";
import { TitleAndDirection } from "@/components/TranslationDirection";
import { Translations } from "@/utils/schemas/types";
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
      id="main"
      className={`h-full w-full  ${
        isTranslations ? "grid content-center" : "grid content-center"
      }`}
    >
      <TitleAndDirection
        isFr={isFr}
        setIsFR={setIsFR}
        isTranslations={isTranslations}
      />

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
