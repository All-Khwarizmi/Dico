"use client";
import { TitleAndDirection } from "@/components/TranslationDirection";
import Footer from "@/components/Footer";
import { TranslationTable } from "@/components/TranslationTable";
import { LoadingGlass } from "@/components/LoadingGlass";
import { useSearchWord } from "@/hooks/useSearch";
import { SearchForm } from "@/components/SearchForm";
import Toasts from "@/utils/services/toasts";
import Header from "./Header";
import { useToast } from "@chakra-ui/react";

export default function Main() {
  const {
    isLoading,
    isTranslations,
    translations,
    word,
    setWord,
    setSearch,
    isFr,
    setIsFR,
  } = useSearchWord();
  const toast = useToast();
  //! Memoize the toast
  const toasty = new Toasts(toast);
  const handleInputWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setWord(e.target.value);
  };
  function handleSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Word validation (only one word at a time)
    const check = word.trim().split(" ").length;
    if (check > 1) {
      toasty.error("❌ Veuillez entrer un seul mot à la fois.");
      setWord("");
      return;
    }
    setSearch(word.trim().toLowerCase());
  }
  return (
    <>
      <Header />
      <main className="pt-40 md:pt-24 h-full w-full flex flex-col  items-center">
        <TitleAndDirection
          isFr={isFr}
          setIsFR={setIsFR}
          isTranslations={isTranslations}
        />

        <section className="h-full w-full flex flex-col items-center justify-start gap-5 ">
          {isLoading ? <LoadingGlass /> : null}

          <TranslationTable
            translations={translations}
            isLoading={isLoading}
            isTranslations={isTranslations}
          />
          <SearchForm
            isLoading={isLoading}
            handleSubmission={handleSubmission}
            handleInputWord={handleInputWord}
            word={word}
          />
        </section>
        <Footer />
      </main>
    </>
  );
}
