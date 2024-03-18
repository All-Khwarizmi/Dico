import { useQuery, useQueryClient } from "@tanstack/react-query";
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

  return <></>;
}
