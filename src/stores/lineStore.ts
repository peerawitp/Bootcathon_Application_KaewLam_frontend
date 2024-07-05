import { create } from "zustand";

export type Status = "signin" | "inited";

interface LineState {
  liffObject: any | null;
  status: Status;
  userId: string;
  displayName: string;
  pictureUrl: string;
  idToken: string;
  setLiffObject: (liffObject: any) => void;
  setStatus: (status: Status) => void;
  setUserId: (userId: string) => void;
  setDisplayName: (displayName: string) => void;
  setPictureUrl: (pictureUrl: string) => void;
  setIdToken: (idToken: string) => void;
}

export const useLineStore = create<LineState>((set) => ({
  liffObject: null,
  status: "signin",
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
