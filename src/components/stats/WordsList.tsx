import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { AxisOptions, Chart } from "react-charts";

async function fetchWords() {
  const response = await fetch("/api/words");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

interface WordSearches {
  id: number;
  word: string;
  searches: number;
}
export default function WordsList() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["words"], queryFn: fetchWords });
  const primaryAxis = React.useMemo(
    (): AxisOptions<WordSearches> => ({
      getValue: (word) => word.word,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<WordSearches>[] => [
      {
        getValue: (word) => word.searches,
      },
    ],
    []
  );
  const data = [
    {
      label: "Words",
      data: query.data?.map((word: WordSearches) => {
        return {
          word: word.word,
          searches: word.searches,
        };
      }),
    },
  ];
  if (query.isError) {
    return <div>Failed to load data</div>;
  }
  if (query.isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <article className="w-full h-full">
      <h2 className="text-2xl text-center pb-4">
        Les mots les plus recherchés
      </h2>
      <div className="w-full h-96">
        <Chart
          className="w-full h-full bg-white"
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </div>
    </article>
  );
}
