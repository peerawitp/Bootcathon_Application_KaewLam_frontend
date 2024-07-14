import { useEffect, useRef, ReactNode } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

interface BottomSheetProps {
    isSheetOpen: boolean;
    setIsSheetOpen: (value: boolean) => void;
    setLocation: (value: any) => void;
    listData: any[];
    renderItem: (data: any, setLocation: (value: any) => void, setIsSheetOpen: (value: boolean) => void) => ReactNode;
    title: string;
    description: string;
}

export default function BottomSheet({
    isSheetOpen,
    setIsSheetOpen,
    setLocation,
    listData,
    renderItem,
    title,
    description,
}: BottomSheetProps) {
    const sheetContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (sheetContentRef.current) {
                const scrollTop = sheetContentRef.current.scrollTop;
                if (scrollTop > 10) {
                    sheetContentRef.current.classList.add('h-screen');
                } else {
                    sheetContentRef.current.classList.remove('h-screen');
                }
            }
        };
    
        const sheetContent = sheetContentRef.current;
        if (sheetContent) {
            sheetContent.addEventListener('scroll', handleScroll);
        }
    
        return () => {
            if (sheetContent) {
                sheetContent.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <div>
            <Sheet key="bottom" open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent
                    side="bottom"
                    className="h-2/3 overflow-y-scroll rounded-t-3xl transition-all duration-300"
                    ref={sheetContentRef}
                >
                    <SheetHeader>
                        <SheetTitle>{title}</SheetTitle>
                        <SheetDescription>
                            {description}
                        </SheetDescription>
                        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    </SheetHeader>
                    <div className="py-5">
                        {listData.length > 0 ? (
                            listData.map((data) => renderItem(data, setLocation, setIsSheetOpen))
                        ) : (
                            <p>No data available</p>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
