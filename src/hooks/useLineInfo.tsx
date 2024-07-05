import { useEffect } from "react";
import { useLineStore, Status } from "../stores/lineStore";

interface UseLineInfoProps {
  liff: any | null;
  status: Status;
}

export const useLineInfo = ({ liff, status }: UseLineInfoProps) => {
  const {
    userId,
    displayName,
    pictureUrl,
    idToken,
    setUserId,
    setDisplayName,
    setPictureUrl,
    setIdToken,
  } = useLineStore();

  useEffect(() => {
    if (status !== "inited") return;

    liff
      ?.getProfile()
      .then((profile: any) => {
        setUserId(profile.userId);
        setDisplayName(profile.displayName);
        setPictureUrl(profile.pictureUrl);
      })
      .catch((err: any) => {
        console.error({ err });
      });

    const idToken = liff?.getIDToken();
    setIdToken(idToken);
  }, [liff, status, setUserId, setDisplayName, setPictureUrl, setIdToken]);

  const version = liff?.getVersion();

  return {
    idToken,
    profile: { userId, displayName, pictureUrl },
    version,
  };
};
