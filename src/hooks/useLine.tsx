import { useEffect } from "react";
import liff from "@line/liff";

import { useLineStore } from "../stores/lineStore";

export type Status = "signin" | "inited";

export const useLine = () => {
  const { liffObject, status, setLiffObject, setStatus } = useLineStore();

  const login = () => {
    liffObject?.login({});
  };

  const logout = () => {
    liffObject?.logout();
  };

  useEffect(() => {
    if (status === "inited") return;

    liff
      .init({ liffId: import.meta.env.VITE_LIFF_APP_ID })
      .then(() => {
        setLiffObject(liff);
        if (liff.isLoggedIn()) setStatus("inited");
      })
      .catch((err: any) => {
        console.error({ err });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    liffObject,
    status,
    login,
    logout,
  };
};
