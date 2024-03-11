"use client";

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
      {/* Add an "Ask AI button" here to open a modal with a form to ask the AI a
      question */}
      {/* <button
        onClick={() => {
          fetch("/api/ipAddress", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ question: "What is the meaning of life?" }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:", data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
         
        }}
      >
        Ask AI
      </button> */}
    </footer>
  );
}
