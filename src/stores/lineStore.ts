import { create } from "zustand";
import type { Liff } from "@line/liff";

export type Status = "loading" | "signin" | "inited";

interface LineState {
  liffObject: Liff | null;
  status: Status;
  userId: string;
  displayName: string;
  pictureUrl: string;
  idToken: string;
  setLiffObject: (liffObject: Liff) => void;
  setStatus: (status: Status) => void;
  setUserId: (userId: string) => void;
  setDisplayName: (displayName: string) => void;
  setPictureUrl: (pictureUrl: string) => void;
  setIdToken: (idToken: string) => void;
}

export const useLineStore = create<LineState>((set) => ({
  liffObject: null,
  status: "loading",
  userId: "",
  displayName: "",
  pictureUrl: "",
  idToken: "",
  setLiffObject: (liffObject) => set({ liffObject }),
  setStatus: (status) => set({ status }),
  setUserId: (userId) => set({ userId }),
  setDisplayName: (displayName) => set({ displayName }),
  setPictureUrl: (pictureUrl) => set({ pictureUrl }),
  setIdToken: (idToken) => set({ idToken }),
}));
