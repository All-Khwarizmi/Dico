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
    setSearch(word.trim());
  }
  return (
    <>
      <Header />

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
        <SearchForm
          isLoading={isLoading}
          handleSubmission={handleSubmission}
          handleInputWord={handleInputWord}
          word={word}
        />
      </section>
      <Footer />
    </>
  );
}
