import { useEffect } from "react";
import { useLineStore, Status } from "../stores/lineStore";

interface UseLineInfoProps {
  liff: any | null;
  status: Status;
}

export const useLineInfo = ({ liff, status }: UseLineInfoProps) => {
  const { displayName, pictureUrl, setDisplayName, setPictureUrl } =
    useLineStore();

  useEffect(() => {
    if (status !== "inited") return;

    liff
      ?.getProfile()
      .then((profile: any) => {
        setDisplayName(profile.displayName);
        setPictureUrl(profile.pictureUrl);
      })
      .catch((err: any) => {
        console.error({ err });
      });
  }, [liff, status, setDisplayName, setPictureUrl]);

  const version = liff?.getVersion();

  return {
    profile: { displayName, pictureUrl },
    version,
  };
};
