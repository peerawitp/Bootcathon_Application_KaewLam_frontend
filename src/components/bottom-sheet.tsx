import { useEffect, useRef } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

export default function BottomSheet({
    isSheetOpen,
    setIsSheetOpen,
    setLocation,
    mapData,
}: {
    isSheetOpen: boolean,
    setIsSheetOpen: (value: boolean) => void,
    setLocation: (value: any) => void,
    mapData: any[],
}) {
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
    }, [sheetContentRef.current]);
    

    return (
        <div>
            <Sheet key="bottom" open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent
                    side="bottom"
                    className="h-2/3 overflow-y-scroll rounded-t-3xl transition-all duration-300"
                    ref={sheetContentRef}
                >
                    <SheetHeader>
                        <SheetTitle>Map Data</SheetTitle>
                        <SheetDescription>
                            Information about the selected location
                        </SheetDescription>
                        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    </SheetHeader>
                    <div className="py-5">
                        {mapData.length > 0 ? (
                            mapData.map((data: any) => (
                                <div
                                    key={data.place_id}
                                    className="mb-3 hover:cursor-pointer hover:text-blue-600 transition-transform duration-300 ease-in-out bg-slate-100 hover:scale-95 rounded-xl p-5 flex flex-cols-2"
                                    onClick={() => {
                                        setLocation([data.lat, data.lon]);
                                        setIsSheetOpen(false);
                                    }}
                                >
                                    <div className="flex flex-col">
                                        <h2 className="font-bold">{data.name}</h2>
                                        <div>
                                            <p>location: {data.display_name}</p>
                                            <p>type: {data.type}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No data available</p>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
