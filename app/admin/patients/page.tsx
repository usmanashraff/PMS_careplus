export const dynamic = 'force-dynamic'

import Logo from '@/components/Logo'
import { DataTable } from '@/components/table/DataTable'
import { patientColumns } from '@/components/table/patientColumns'
import { getAllPatients } from '@/lib/actions/patient.action'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const PatientsPage = async () => {
    const patientsData = await getAllPatients()
    const patients = patientsData.documents || []

    return (
        <div className="flex flex-col max-w-7xl mx-auto space-y-14 pb-12">
            <header className="admin-header items-center">
                <Logo />
                <p className="text-16-semibold">Patients</p>
                <Link href="/admin">
                    <Button className="shad-gray-btn ml-auto">
                        ← Back to Dashboard
                    </Button>
                </Link>
            </header>

            <main className="admin-main">
                <section className="w-full space-y-4">
                    <h1 className="header">Patient Management 📋</h1>
                    <p className="text-dark-700">View and manage all registered patients</p>
                </section>

                <section className="w-full">
                    {patients.length > 0 ? (
                        <DataTable data={patients} columns={patientColumns} />
                    ) : (
                        <div className="flex items-center justify-center p-8 border border-dark-400 rounded-lg">
                            <p className="text-dark-700 text-16-regular">No patients registered yet</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
}

export default PatientsPage
