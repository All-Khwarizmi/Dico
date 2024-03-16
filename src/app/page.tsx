"use client";
import { useState } from "react";
import { TitleAndDirection } from "@/components/TranslationDirection";
import { Translations } from "@/utils/schemas/types";
import Footer from "@/components/Footer";
import { TranslationTable } from "@/components/TranslationTable";
import { TranslationForm } from "@/components/TranslationForm";
import { Title } from "@/components/Title";
import { LoadingGlass } from "@/components/LoadingGlass";
import "./app.css";

export default function App() {
  const [isFr, setIsFR] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isTranslations, setIsTranslations] = useState<boolean>(false);
  const [translations, setTranslations] = useState<Translations>([]);

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
          <TranslationForm
           
            isFr={isFr}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setIsError={setIsError}
            setIsTranslations={setIsTranslations}
            setTranslations={setTranslations}
          />
        </section>
        <Footer />
    </>
  );
}
