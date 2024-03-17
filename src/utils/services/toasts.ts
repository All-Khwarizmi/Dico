import { useToast } from "@chakra-ui/react";

export default class Toasts {
  static success = (message: string) => {
    const toast = useToast();
    toast({
      title: message,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };
  static error = (message: string) => {
    const toast = useToast();
    toast({
      title: message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };
  static info = (message: string) => {
    const toast = useToast();
    toast({
      title: message,
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };
  static unknown = () => {
    const toast = useToast();
    toast({
      title: "😞 Erreur inconnue, veuillez réessayer.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };
}
