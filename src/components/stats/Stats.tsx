import WordsList from "./WordsList";

export default function Stats() {
  return (
    <main className="mx-auto h-full flex flex-col md:flex-row justify-center">
      <h1 className="text-3xl">Stats</h1>
      <WordsList></WordsList>
    </main>
  );
}
