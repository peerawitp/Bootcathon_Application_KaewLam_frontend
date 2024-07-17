import create from "zustand";
import { apiInstance } from "@/api/instance";

interface Profile {
  id: number;
  lineUid: string | null;
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone: string;
  point: number;
}

interface ProfileStore {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}));

export const fetchUserProfile = () => {
  apiInstance({
    method: "GET",
    url: "/customer/profile",
  })
    .then((res) => {
      useProfileStore.setState({ profile: res.data });
    })
    .catch((error) => {
      console.error("Error fetching user profile:", error);
    });
};
