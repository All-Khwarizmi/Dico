import { Title } from "../Title";
import WordsList from "./WordsList";

export default function Stats() {
  return (
    <main className="pt-24 mx-auto h-full w-full justify-start">
      <header className="flex flex-col  items-center gap-4 gap-y-12 pb-10">
        <Title title="Statistiques" />
      </header>
      <section className="w-full flex gap-4 gap-y-8 flex-col md:flex-row px-4">
        <WordsList />
      </section>
    </main>
  );
}
