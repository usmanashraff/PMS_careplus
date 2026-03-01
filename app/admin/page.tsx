export const dynamic = 'force-dynamic'


import Logo from '@/components/Logo'
import StatCard from '@/components/StatCard'
import {columns, Payment} from '@/components/table/columns'
import {DataTable} from '@/components/table/DataTable'
import { getRecentAppointments } from '@/lib/actions/appointment.actions'
import { getAllPatients } from '@/lib/actions/patient.action'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Admin = async() => {
   

    const appontments = await getRecentAppointments()
    const patientsData = await getAllPatients()
    const totalPatients = patientsData.total || 0

  return (
    <div className="flex flex-col max-w-7xl mx-auto space-y-14 pb-12">
        <header className="admin-header items-center">
            <Logo />
            <p className="text-16-semibold">Admin Dashboard</p>
            <Link href="/admin/patients" className="ml-auto">
                <Button className="shad-primary-btn">
                    View All Patients →
                </Button>
            </Link>
        </header>

        <main className="admin-main">
            <section className="w-full space-y-4">
                <h1 className="header">Welcome 🤟</h1>
                <p className="text-dark-700">Start the day with managing new appointments and patients</p>
            </section>
            <section className="admin-stat">
                <StatCard 
                    type="appointments"
                    label="Scheduled appointments"
                    icon="/assets/icons/appointments.svg"
                    count={appontments?.scheduledCount || 0}
                />
                <StatCard 
                    type="pending"
                    label="pending appointments"
                    icon="/assets/icons/pending.svg"
                    count={appontments?.pendingCount || 0}
                />
                <StatCard 
                    type="cancelled"
                    label="cancelled appointments"
                    icon="/assets/icons/cancelled.svg"
                    count={appontments.cancelledCount}
                />
                <StatCard 
                    type="appointments"
                    label="Total patients"
                    icon="/assets/icons/appointment-bg.jpg"
                    count={totalPatients}
                />
            </section>

            <section className="w-full space-y-4">
                <h2 className="sub-header">Recent Appointments</h2>
            </section>
            <DataTable data={appontments.documents} columns={columns} />

        </main>

        </main>

    </div>
  )
}

export default Admin