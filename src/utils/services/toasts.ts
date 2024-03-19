import { CreateToastFnReturn, useToast } from "@chakra-ui/react";

export default class Toasts {
  private toast: CreateToastFnReturn;
  constructor(toast: CreateToastFnReturn) {
    this.toast = toast;
  }
  success = (message: string) => {
    this.toast({
      title: message,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };
  error = (message: string) => {
    this.toast({
      title: message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };
  info = (message: string) => {
    this.toast({
      title: message,
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };
  unknown = () => {
    this.toast({
      title: "😞 Erreur inconnue, veuillez réessayer.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };
}
