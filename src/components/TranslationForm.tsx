import { inputWord, submitWord } from "@/utils/submitWord";
import { Translations } from "@/utils/schemas/types";
import { Dispatch, SetStateAction } from "react";

export interface TranslationFormProps {
  word: string;
  setWord: Dispatch<SetStateAction<string>>;
  isFr: boolean;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsError: Dispatch<SetStateAction<boolean>>;
  setIsTranslations: Dispatch<SetStateAction<boolean>>;
  setTranslations: Dispatch<SetStateAction<Translations>>;
}
export function TranslationForm({
  word,
  setWord,
  isFr,
  isLoading,
  setIsLoading,
  setIsError,
  setIsTranslations,
  setTranslations,
}: TranslationFormProps) {
  return (
    <>
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
            onChange={(event) => inputWord(event, setWord)}
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
    </>
  );
}
