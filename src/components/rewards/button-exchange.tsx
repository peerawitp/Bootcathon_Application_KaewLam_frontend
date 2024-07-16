import { Button } from "@/components/ui/button"
import CustomerLayout from "@/components/layouts/CustomerLayout";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function ButtonExchang() {
  return (
    <CustomerLayout>
          <Dialog>
          <DialogTrigger asChild>
            <div className="w-374 h-109">
                <Button variant="outline" className="w-full h-full bg-green-500 text-white text-[20px] p-4 rounded-lg">แลกคะแนน</Button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>คุณแน่ใจหรือไม่</DialogTitle>
              <DialogDescription>
                  สิทธิพิเศษรายการนี้ไม่สามารถทำการขอแลกแต้มคืนได้ หากประสงค์จะดำเนินการต่อเพื่อรับสิทธิ์ให้กดยืนยัน
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button type="submit">ยืนยัน</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </CustomerLayout>
  )
}

export default ButtonExchang;