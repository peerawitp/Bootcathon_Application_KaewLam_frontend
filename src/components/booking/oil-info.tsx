import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import oil1 from "@/assets/oil1.png";
import { Button } from "../ui/button";
import { Product } from "@/stores/orderStore";
import { currencyFormat } from "@/lib/utils";

interface OilInfoProps {
  product: Product[];
  selected: number;
  setSelect: (product: Product) => void;
}

export default function OilInfo({
  product,
  selected,
  setSelect,
}: OilInfoProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="font-bold">น้ำมันเครื่องที่แนะนำ</p>
      {product.map((item) => (
        <div
          key={item.id}
          onClick={() => setSelect(item)}
          className={`flex items-center  gap-3 p-3 border-[3px] rounded-3xl ${selected === item.id ? "border-[#0E479F] bg-[#D7DFEC]" : "bg-[#D9D9D9]"}`}
        >
          <img src={oil1} alt="" className="w-24" />
          <div className="flex flex-col gap-1">
            <p className=" text-base font-bold">{item.name}</p>
            <span className="text-wrap line-clamp-2 text-sm font-light">
              {item.description}
            </span>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="link"
                  className="w-fit h-fit p-0 m-0 font-light text-[#0E479F]"
                >
                  เพิ่มเติม
                </Button>
              </DialogTrigger>
              <DialogContent className="m-5 ">
                <DialogHeader>
                  <DialogTitle>{item.name}</DialogTitle>
                  <DialogDescription>
                    <p
                      dangerouslySetInnerHTML={{ __html: item.description }}
                      className="text-left"
                    ></p>
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild></DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <p className="font-bold">
              ~ {currencyFormat(item.priceRange[0])} -{" "}
              {currencyFormat(item.priceRange[1])} บ.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
