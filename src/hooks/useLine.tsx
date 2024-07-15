import { useEffect } from "react";
import liff from "@line/liff";

import { useLineStore } from "@/stores/lineStore";

export type Status = "loading" | "signin" | "inited";

export const useLine = () => {
  const { liffObject, status, setLiffObject, setStatus, setIdToken } =
    useLineStore();

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
        if (liff.isLoggedIn()) {
          setStatus("inited");
          const idToken = liff.getIDToken() as string;
          setIdToken(idToken);
        } else {
          setStatus("signin");
        }
      })
      .catch((err: any) => {
        console.error({ err });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liffObject]);

  return {
    liffObject,
    status,
    login,
    logout,
  };
};
