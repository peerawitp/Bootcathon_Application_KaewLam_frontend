import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

type SliderProps = React.ComponentProps<typeof Slider>;

interface ModalProps {
  modal: boolean;
  value: number;

  setModal: (value: boolean) => void;
  setValue: (value: number) => void;
  setIsSheetOpen: (value: boolean) => void;
}

export function Modal({ 
  modal, 
  setModal, 
  value, 
  setValue,
  setIsSheetOpen
}: ModalProps) {

  const handleSubmit = () => {
    setModal(false);
    setIsSheetOpen(true);
  }

  return (
    <Dialog open={modal} onOpenChange={setModal} modal={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adjust Range</DialogTitle>
          <DialogDescription>
            Searching for any Mobil 1 Centers around you.
          </DialogDescription>
        </DialogHeader>
        <AdjustBar value={value} setValue={setValue} />
        <DialogFooter>
          <Button onClick={() => handleSubmit()} type="submit">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AdjustBar(
  { value, setValue }: { value: number, setValue: (value: number) => void; }, 
  { className, ...props }: SliderProps
) {
  
  const handleSliderChange = (newValue: number[]) => {
    setValue(newValue[0]);
  };

  return (
    <div className="flex flex-col items-center">
      <Slider
        defaultValue={[value]}
        max={100}
        step={1}
        className={cn("w-[100%]", className)}
        onValueChange={handleSliderChange}
        {...props}
      />
      <div className="mt-2 text-center">
        Distance: {value} km
      </div>
    </div>
  );
}
