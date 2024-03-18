"use client";
import { TitleAndDirection } from "@/components/TranslationDirection";
import Footer from "@/components/Footer";
import { TranslationTable } from "@/components/TranslationTable";
import { LoadingGlass } from "@/components/LoadingGlass";
import { useSearchWord } from "@/hooks/useSearch";
import { SearchForm } from "@/components/SearchForm";
import { ChakraProvider } from "@chakra-ui/react";
import Toasts from "@/utils/services/toasts";
import theme from "@/styles/theme";

export default function App() {
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

  const handleInputWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setWord(e.target.value);
  };
  function handleSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Word validation (only one word at a time)
    const check = word.trim().split(" ").length;
    if (check > 1) {
      Toasts.error("❌ Veuillez entrer un seul mot à la fois.");
      setWord("");
      return;
    }
    setSearch(word.trim());
  }
  return (
    <>
      <ChakraProvider theme={theme} cssVarsRoot="body">
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
      </ChakraProvider>
      <Footer />
    </>
  );
}
