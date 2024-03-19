import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { AxisOptions, Chart } from "react-charts";

async function fetchWords() {
  const response = await import("@/utils/schemas/top-searches.json");
  return response.default;
}

interface WordSearches {
  _count: { wordId: number };
  wordSource: string;
}
export default function WordsList() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["words"], queryFn: fetchWords });
  const primaryAxis = React.useMemo(
    (): AxisOptions<WordSearches> => ({
      getValue: (word) => word.wordSource,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<WordSearches>[] => [
      {
        getValue: (word) => word._count.wordId,
      },
    ],
    []
  );
  const data = [
    {
      label: "Words",
      data: query.data || [],
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
