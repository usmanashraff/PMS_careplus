import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'
interface StatCardProps {
   type: "pending" | "appointments" | "cancelled",
   count: number,
   label: string,
   icon: string,
}
const StatCard = ({count=0, type, icon, label}: StatCardProps) => {
  return (
    <div className={clsx('stat-card', {
        "bg-pending": type == 'pending',
        "bg-appointments": type == 'appointments',
        "bg-cancelled": type == 'cancelled'
    }) }>
        <div className="flex items-center gap-4">
            <Image src={icon} alt={label} width={32} height={32} />
            <h2 className='text-32-bold text-white'>{count}</h2>
        </div>
         <p className="text-14-regular">{label}</p>
        </div>
  )
}

export default StatCard