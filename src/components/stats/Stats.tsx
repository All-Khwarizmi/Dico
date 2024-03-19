import WordsList from "./WordsList";

export default function Stats() {
  return (
    <main className="pt-24 mx-auto h-full w-full justify-start">
      <header className="flex flex-col gap-4 gap-y-12 pb-10">
        <h1 className="text-5xl">Dico en nombres</h1>
      </header>
      <section className="w-full flex gap-4 gap-y-8 flex-col md:flex-row px-4">
        <WordsList />
      </section>
    </main>
  );
}
