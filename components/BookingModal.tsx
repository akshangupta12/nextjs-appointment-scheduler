'use client'

import { useState } from "react"
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle2 } from "lucide-react"
import { createBooking } from "@/app/action"

// In React, we define 'Props' to pass data from Parent to Child
interface BookingModalProps {
  selectedDate: string;
  selectedTime: string;
}

export function BookingModal({ selectedDate, selectedTime }: BookingModalProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  async function handleBooking(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await createBooking({
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      date: selectedDate,
      time: selectedTime,
    })

    setIsLoading(false)
    if (result.success) {
      setIsSuccess(true)
      setTimeout(() => { setOpen(false); setIsSuccess(false); }, 2500)
    } else {
      alert(result.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full mt-4">Confirm Selection</Button>
      </DialogTrigger>
      <DialogContent>
        {isSuccess ? (
          <div className="flex flex-col items-center py-10 space-y-4">
            <CheckCircle2 className="h-12 w-12 text-green-500 animate-bounce" />
            <p className="text-xl font-semibold">Sent!</p>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Confirm for {selectedTime}</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input name="email" type="email" required />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : "Book Now"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}