'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { useState } from "react"
import { Appointment } from "@/types/appwrite.types"
import AppointmentForm from "./forms/AppointmentForm"
  
const AppointmentDialog = ({type, patientId, userId, appointment}: {type: 'cancel'|'schedule',
 patientId: string,
 userId: string,
 appointment?: Appointment
 }) => {
    const [open, setopen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setopen}>
  <DialogTrigger asChild>
    <Button variant={'ghost'} className={`capitalize ${type == 'schedule' && 'text-green-500'}`} > {type} </Button>
  </DialogTrigger>
  <DialogContent className="shad-dialog my-2"> 
    <DialogHeader className="mb-4 space-y-3">
      <DialogTitle className="capitalize header">{type} Appointment</DialogTitle>
      <DialogDescription>
       Please fill the following details to {type} Appointment
      </DialogDescription>
    </DialogHeader>
    <AppointmentForm 
       type={type}
       userId={userId}
       patiendId={patientId}
       open={setopen}
       appointment={appointment}
    />
  </DialogContent>
</Dialog>

  )
}

export default AppointmentDialog