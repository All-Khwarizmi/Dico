"use client";
import usePathName from "@/hooks/usePathName";
import { HomeIcon, MoonIcon, StatsIcon, SunIcon } from "@/utils/icons/icons";
import { useColorMode } from "@chakra-ui/react";

export function useDevMode() {
  return process.env.NODE_ENV === "development";
}
export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const path = usePathName();
  const devMode = useDevMode();

  return (
    <header className="absolute top-0 right-0  p-5 flex justify-center items-center gap-5">
      {devMode && (
        <a
          aria-label={path === "/stats" ? "Home" : "Stat's Page"}
          href={`${path === "/stats" ? "/" : "/stats"}`}
          className={`text-lg ${
            colorMode === "light" ? "text-black" : "text-white"
          }`}
        >
          {path === "/stats" ? <HomeIcon /> : <StatsIcon />}
        </a>
      )}
      <button
        aria-label="Toggle color mode"
        className="text-lg"
        onClick={() => toggleColorMode()}
      >
        {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  );
}
