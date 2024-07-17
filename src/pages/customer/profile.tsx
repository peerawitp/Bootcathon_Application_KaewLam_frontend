import CustomerLayout from "@/components/layouts/CustomerLayout";
import { ProfileAvatar } from "@/components/profile/profile-avatar";
import { TabComponent } from "@/components/profile/tab-component";
import { fetchUserProfile, useProfileStore } from "@/stores/profileStore";
import { useEffect } from "react";

export default function Profile() {
  const profile = useProfileStore((state) => state.profile);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <CustomerLayout>
      <div className="flex-rows-2 bg-blue-600 h-screen">
        <div className="flex flex-col justify-center items-center w-full h-1/3 gap-3">
          <div className="flex justify-center items-center w-2/5 h-2/5">
            <ProfileAvatar />
          </div>
          <div className="text-center text-white">
            <h3 className="font-bold text-3xl">
              {profile?.firstName} {profile?.lastName}
            </h3>
            <p>ลูกค้าระดับเหรียญทอง</p>
          </div>
        </div>
        <div className="flex justify-center p-10 w-full bg-white h-2/3 rounded-t-3xl">
          <TabComponent />
        </div>
      </div>
    </CustomerLayout>
  );
}

