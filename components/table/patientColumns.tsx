"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { formatDateTime } from "@/lib/utils"
import { Patient } from "@/types/appwrite.types"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export const patientColumns: ColumnDef<Patient>[] = [
  {
    header: "ID",
    cell: ({row})=> <p className="text-14-medium">{row.index + 1}</p>
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-light-200"
      >
        Patient Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({row})=> <p className="text-14-medium">{row.original.name}</p>
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({row})=> <p className="text-14-regular">{row.original.email}</p>
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({row})=> <p className="text-14-regular">{row.original.phone}</p>
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({row})=> <p className="text-14-regular capitalize">{row.original.gender}</p>
  },
  {
    accessorKey: "primaryPhysician",
    header: "Primary Physician",
    cell: ({row})=> <p className="text-14-regular">{row.original.primaryPhysician}</p>
  },
  {
    accessorKey: "$createdAt",
    header: "Registered Date",
    cell: ({row})=> <p className="text-14-regular">{formatDateTime(row.original.$createdAt).dateOnly}</p>
  },
  {
    id: "actions",
    header: () => <p className="pl-4">Actions</p>,
    cell: ({row: {original: patient}}) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-dark-400 border-dark-500">
          <DropdownMenuLabel className="text-light-200">Actions</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-dark-500" />
          <DropdownMenuItem asChild className="cursor-pointer hover:bg-dark-300">
            <Link href={`/admin/patients/${patient.$id}`}>
              View Details
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
