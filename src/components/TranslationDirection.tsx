import { Dispatch, SetStateAction } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export function TranslationDirection(
  isFr: Boolean,
  setIsFR: Dispatch<SetStateAction<Boolean>>,
  isTranslations: Boolean
) {
  return (
    <div className="grid place-items-center  w-full  ">
      {isFr ? (
        <div
          className={`grid gap-2 grid-cols-3 ${
            isTranslations
              ? "w-[80%] md:w-[40%]"
              : "w-[60%] md:w-[30%] lg:w-[15%]  sm:w-[30%] "
          }  place-items-center  `}
        >
          <button onClick={() => setIsFR(!isFr)}>
            <h1 className="py-5 text-center uppercase text-1xl">Français</h1>
          </button>
          <button onClick={() => setIsFR(!isFr)}>
            <FaArrowRight className="text-purple-700  text-2xl" />
          </button>
          <button onClick={() => setIsFR(!isFr)}>
            <h1 className="py-5 text-center uppercase text-1xl">Espagnol</h1>
          </button>
        </div>
      ) : (
        <div
          className={`grid gap-2 grid-cols-3 ${
            isTranslations
              ? "w-[80%] md:w-[40%]"
              : "w-[60%] md:w-[30%] lg:w-[15%]  sm:w-[30%] "
          }  place-items-center  `}
        >
          <button onClick={() => setIsFR(!isFr)}>
            <h1 className="py-5 text-center uppercase text-1xl">Français</h1>
          </button>
          <button onClick={() => setIsFR(!isFr)}>
            <FaArrowLeft className="text-purple-700 text-2xl" />
          </button>
          <button onClick={() => setIsFR(!isFr)}>
            <h1 className="py-5 text-center uppercase text-1xl">Espagnol</h1>
          </button>
        </div>
      )}
    </div>
  );
}
