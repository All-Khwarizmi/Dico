"use client";
import Header from "@/components/Header";
import Stats from "@/components/stats/Stats";

import theme from "@/utils/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
export default function HomePage() {
  return (
    <ChakraProvider theme={theme} cssVarsRoot="body">
      <Header />
      <Stats />
    </ChakraProvider>
  );
}
