import { create } from "zustand";

export type Status = "signin" | "inited";

interface LineState {
  liffObject: any | null;
  status: Status;
  userId: string;
  displayName: string;
  pictureUrl: string;
  setLiffObject: (liffObject: any) => void;
  setStatus: (status: Status) => void;
  setUserId: (userId: string) => void;
  setDisplayName: (displayName: string) => void;
  setPictureUrl: (pictureUrl: string) => void;
}

export const useLineStore = create<LineState>((set) => ({
  liffObject: null,
  status: "signin",
  userId: "",
  displayName: "",
  pictureUrl: "",
  setLiffObject: (liffObject) => set({ liffObject }),
  setStatus: (status) => set({ status }),
  setUserId: (userId) => set({ userId }),
  setDisplayName: (displayName) => set({ displayName }),
  setPictureUrl: (pictureUrl) => set({ pictureUrl }),
}));
