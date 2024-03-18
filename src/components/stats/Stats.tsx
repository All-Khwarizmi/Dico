import { icons } from "react-icons/lib";
import WordsList from "./WordsList";

export default function Stats() {
  return (
    <main className="pt-24 mx-auto h-full w-full flex gap-4 flex-col md:flex-row justify-start">
      <h1 className="text-3xl">Stats</h1>
      <WordsList></WordsList>
    </main>
  );
}
