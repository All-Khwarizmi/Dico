"use client";
import usePathName from "@/hooks/usePathName";
import { HomeIcon, MoonIcon, StatsIcon, SunIcon } from "@/utils/icons/icons";
import { useColorMode } from "@chakra-ui/react";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const path = usePathName();

  return (
    <header className="absolute top-0 right-0  p-5 flex justify-center items-center gap-5">
      <a
        href={`${path === "/stats" ? "/" : "/stats"}`}
        className={`text-lg ${
          colorMode === "light" ? "text-black" : "text-white"
        }`}
      >
        {path === "/stats" ? <HomeIcon /> : <StatsIcon />}
      </a>
      <button className="text-lg" onClick={() => toggleColorMode()}>
        {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  );
}
