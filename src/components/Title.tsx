export function Title({ title }: { title: string }) {
  return (
    <h1
      className="text-6xl font-bold dark:text-purple-700 text-black"
      style={{
        background: "linear-gradient(45deg, #7e22ce, #c0efff)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {title}
    </h1>
  );
}
