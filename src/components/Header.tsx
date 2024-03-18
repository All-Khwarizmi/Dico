import { HomeIcon, MoonIcon, StatsIcon, SunIcon } from "@/utils/icons/icons";
import { useColorMode } from "@chakra-ui/react";
import Stats from "./stats/Stats";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const pathName = window.location.pathname;

  return (
    <header className="absolute top-0 right-0  p-5 flex justify-center items-center gap-5">
      <a
        href={`${pathName === "/stats" ? "/" : "/stats"}`}
        className={`text-lg ${
          colorMode === "light" ? "text-black" : "text-white"
        }`}
      >
        {pathName === "/stats" ? <HomeIcon /> : <StatsIcon />}
      </a>
      <button className="text-lg" onClick={() => toggleColorMode()}>
        {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  );
}
