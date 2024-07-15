import { useEffect, useRef, useState, ReactNode } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import Lottie from 'react-lottie';
import LoadingCarAnimation from "@/assets/lotties/loading_car.json";

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingCarAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
};

interface BottomSheetProps {
    isSheetOpen: boolean;
    listData: any[];
    title: string;
    description: string;
    loading?: boolean;
    error?: string | null;

    setIsSheetOpen: (value: boolean) => void;
    setLocationPoint: (value: any) => void;
    renderItem: (data: any, setLocationPoint: (value: any) => void, setIsSheetOpen: (value: boolean) => void) => ReactNode;
}

export default function BottomSheet({
    isSheetOpen,
    setIsSheetOpen,
    setLocationPoint,
    listData,
    renderItem,
    title,
    description,
    loading,
    error,
}: BottomSheetProps) {
    const sheetContentRef = useRef<HTMLDivElement>(null);
    const [forceRerender, setForceRerender] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (sheetContentRef.current) {
                const scrollTop = sheetContentRef.current.scrollTop;
                if (scrollTop > 15) {
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
    }, [forceRerender]);

    useEffect(() => {
        setForceRerender(prev => !prev);
    }, [isSheetOpen]);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center">
                    <Lottie options={defaultOptions} height={300} width={300} />
                </div>
            )
        }
        if (error) {
            return <p>Error: {error}</p>;
        }

        if (listData.length > 0) {
            return listData.map((data) => renderItem(data, setLocationPoint, setIsSheetOpen));
        } else {
            return <p>No data available</p>;
        }
    };

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
                        {renderContent()}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
