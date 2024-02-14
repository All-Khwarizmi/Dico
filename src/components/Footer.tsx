export default function Footer() {
  return (
    <footer className="flex py-10 flex-col items-center gap-5 bottom-0">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} - Dico - Tous droits réservés
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Made with ❤️ by{"  "}
        Jason Suárez
      </p>
    </footer>
  );
}