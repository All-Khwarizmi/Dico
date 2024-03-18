"use client";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/styles/theme";

import Main from "@/components/Main";

export default function App() {
  return (
    <>
      <ChakraProvider theme={theme} cssVarsRoot="body">
        <Main />
      </ChakraProvider>
    </>
  );
}
