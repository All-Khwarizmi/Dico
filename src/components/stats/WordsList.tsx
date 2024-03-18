import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, Table } from "@tremor/react";

async function fetchWords() {
  const response = await fetch("/api/words");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export default function WordsList() {
  const queryClient = useQueryClient();

  const query = useQuery({ queryKey: ["words"], queryFn: fetchWords });

  return (
    <Card>
      <Table>
        <thead>
          <tr>
            <th>Word</th>
            <th>Searches</th>
          </tr>
        </thead>
        <tbody>
          {query.data?.map(
            ({
              id,
              word,
              searches,
            }: {
              id: number;
              word: string;
              searches: number;
            }) => (
              <tr key={id}>
                <td>{word}</td>
                <td>{searches}</td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </Card>
  );
}
