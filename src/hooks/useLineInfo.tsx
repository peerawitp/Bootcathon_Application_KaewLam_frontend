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
    setUserId,
    setDisplayName,
    setPictureUrl,
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
  }, [liff, status, setUserId, setDisplayName, setPictureUrl]);

  const version = liff?.getVersion();

  return {
    profile: { userId, displayName, pictureUrl },
    version,
  };
};
