"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { MoreHorizontal } from "lucide-react"
import StatusBadge from "../StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/constants"
import Image from "next/image"
import AppointmentDialog from "../AppointmentDialog"
import { Appointment } from "@/types/appwrite.types"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Appointment>[] = [
   
  {
    header: "ID",
    cell: ({row})=> <p className="text-14-medium">{row.index +1}</p>
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({row})=> <p className="text-14-medium">{row.original.patient.name}</p>
  },
  {
    accessorKey:'status',
    header: 'Status',
    cell: ({row}) => (
        <div className=" min-w-[116px]">
            <StatusBadge status={row.original.status} />
        </div>
    )
    
  },
  {
    accessorKey: 'schedule',
    header: 'Appointment'
    ,cell: ({row})=>(
        <p className="min-w-[100px] text-14-regular">
            {formatDateTime(row.original.schedule).dateTime}
        </p>
    ) 
  },
  {
    header: 'Doctor',
    accessorKey: 'primaryPhysician',
    cell: ({ row }) => {
        const doctor = Doctors.find((doc)=> doc.name === row.original.primaryPhysician)

        return (
            <div className="flex items-center gap-3">
                <Image src={doctor?.image || ''} alt={doctor?.name || ''} width={100} height={100} className="size-6" />
                <p className="text-14-semibold">{doctor?.name}</p>
            </div>
        )
    },
  },
  {
    id:'actions',
    header: ()=> ( <p className="pl-4"> Actions </p> ),
    cell: ({row: {original: data}})=>(
       <div className="flex justify-start items-center ">
         <AppointmentDialog type="schedule" 
              patientId={data.patient.$id}
              userId={data.userId}
              appointment={data}
             
         />
         <AppointmentDialog type="cancel" 
              patientId={data.patient.$id}
              userId={data.userId}
              appointment={data}
             
         />

       </div>
    )
  }
]
