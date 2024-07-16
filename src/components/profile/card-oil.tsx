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
  
  interface CardOilProps {
    product: Product;
  }
  
  export default function CardOil({
    product,

  }:CardOilProps) {
    return (
      <div className="w-full flex flex-col gap-2">
          <div
            key={product.id}
            className={`flex items-center  gap-3 p-3 border-[3px] rounded-3xl  "bg-[#D9D9D9]"`}
          >
            <img src={oil1} alt="" className="w-24" />
            <div className="flex flex-col gap-1">
              <p className=" text-base font-bold">{product.name}</p>
              <span className="text-wrap line-clamp-2 text-sm font-light">
                {product.description}
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
                <DialogContent className=" ">
                  <DialogHeader>
                    <DialogTitle>{product.name}</DialogTitle>
                    <DialogDescription>
                      <p
                        dangerouslySetInnerHTML={{ __html: product.description }}
                        className="text-left text"
                      ></p>
                    </DialogDescription>
                  </DialogHeader>
  
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild></DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            
            </div>
          </div>
      </div>
    );
  }
  