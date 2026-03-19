'use client'

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { BookingModal } from "@/components/BookingModal" // Import our new child

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM"]

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-2xl font-bold mb-6">Select a Slot</h1>
      
      <div className="grid md:grid-cols-2 gap-10">
        <Calendar mode="single" selected={date} onSelect={setDate} className="border rounded-md" />

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map(slot => (
              <Button 
                key={slot} 
                variant={selectedTime === slot ? "default" : "outline"}
                onClick={() => setSelectedTime(slot)}
              >
                {slot}
              </Button>
            ))}
          </div>

          {/* This is the magic! We pass data into the Modal component */}
          {selectedTime && (
            <BookingModal 
              selectedDate={date?.toDateString() || ""} 
              selectedTime={selectedTime} 
            />
          )}
        </div>
      </div>
    </div>
  )
}