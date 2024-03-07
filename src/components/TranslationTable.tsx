import { Trad, Translations } from "@/utils/types";
import parse from "html-react-parser";

export interface TranslationTableProps {
  translations: Translations;
  isLoading: boolean;
  isTranslations: boolean;
}

export function TranslationTable({
  translations,
  isLoading,
  isTranslations,
}: TranslationTableProps) {
  return (
    <>
      {isTranslations && !isLoading && (
        <div className=" h-72 lg:w-[40%] md:w-[50%] w-[90%] rounded-lg   overflow-scroll  border-2 border-solid dark:border-gray-600 dark:bg-gray-700 shadow-md shadow-gray-500 ">
          <table className=" h-min relative w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="sticky top-0 bg-gray-400 dark:bg-gray-900 text-xs uppercase text-gray-700 ">
              <tr className="pb-4 ">
                <th
                  scope="col"
                  className="px-6 font-bold text-black text-center dark:text-white py-3 "
                >
                  Dans le sens de
                </th>
                <th
                  scope="col"
                  className="px-6 font-bold text-black text-center dark:text-white py-3 "
                >
                  Traduction
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 h-min ">
              {translations?.map((trad: Trad, index) => {
                return (
                  <tr
                    className={` border-b ${
                      translations.length > 1 ? null : "h-40"
                    }   text-center bg-white  dark:border-gray-700 dark:bg-gray-800`}
                    key={index}
                  >
                    <td className="py-4 text-center px-6  font-medium text-gray-900 dark:text-white">
                      {parse(trad?.source)}
                    </td>
                    <td className=" text-center px-6 font-medium text-gray-900 dark:text-white">
                      {parse(trad?.target)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <div className=""></div>
    </>
  );
}
