import { useState, useEffect } from "react";

export default function usePathName() {
  const [path, setPath] = useState<string>("/");
  useEffect(() => {
    const pathName = window.location.pathname;
    setPath(pathName);
  }, []);
  return path;
}
