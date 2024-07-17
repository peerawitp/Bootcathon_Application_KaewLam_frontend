import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLine } from "@/hooks/useLine";
import { useLineInfo } from "@/hooks/useLineInfo";
import { useLineStore } from "@/stores/lineStore";

export function ProfileAvatar() {
  const { liffObject } = useLine();

  const { profile } = useLineInfo({ liff: liffObject, status: "inited" });
  console.log(profile);
  return (
    <Avatar className="w-fit h-full border-2 border-white p-0.5 rounded-full">
      <div className="relative w-full h-full rounded-full">
        <AvatarImage
          className="w-full h-full object-cover rounded-full"
          src={profile?.pictureUrl}
        />
        <AvatarFallback className="rounded-full">N/A</AvatarFallback>
      </div>
    </Avatar>
  );
}
