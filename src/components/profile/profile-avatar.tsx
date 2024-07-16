import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export function ProfileAvatar() {
    return (
        <Avatar className="w-fit h-full border-2 border-white p-0.5 rounded-full">
            <div className="relative w-full h-full rounded-full">
                <AvatarImage className="w-full h-full object-cover rounded-full" src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback className="rounded-full">N/A</AvatarFallback>
            </div>
        </Avatar>
    )
}
