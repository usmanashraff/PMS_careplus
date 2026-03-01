export const dynamic = 'force-dynamic'

import Logo from '@/components/Logo'
import { getPatientById } from '@/lib/actions/patient.action'
import { formatDateTime } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Doctors } from '@/constants'

const PatientDetailPage = async ({ params: { id } }: { params: { id: string } }) => {
    const patient = await getPatientById(id)

    if (!patient || patient.message) {
        return (
            <div className="flex flex-col max-w-7xl mx-auto space-y-14 pb-12">
                <header className="admin-header items-center">
                    <Logo />
                    <p className="text-16-semibold">Patient Details</p>
                </header>
                <main className="admin-main">
                    <div className="flex items-center justify-center p-8">
                        <p className="text-red-500 text-16-regular">Patient not found</p>
                    </div>
                </main>
            </div>
        )
    }

    const doctor = Doctors.find((doc) => doc.name === patient.primaryPhysician)

    return (
        <div className="flex flex-col max-w-7xl mx-auto space-y-14 pb-12">
            <header className="admin-header items-center">
                <Logo />
                <p className="text-16-semibold">Patient Details</p>
                <Link href="/admin/patients">
                    <Button className="shad-gray-btn ml-auto">
                        ← Back to Patients
                    </Button>
                </Link>
            </header>

            <main className="admin-main">
                {/* Patient Header */}
                <section className="w-full space-y-6 border border-dark-400 rounded-2xl p-8 bg-dark-400">
                    <div className="flex items-center gap-6">
                        <div className="flex-1">
                            <h1 className="header">{patient.name}</h1>
                            <p className="text-dark-700 text-14-regular mt-2">
                                Patient ID: {patient.$id}
                            </p>
                        </div>
                        <div className="text-right space-y-2">
                            <p className="text-14-medium text-green-500">Registered</p>
                            <p className="text-12-regular text-dark-700">
                                {formatDateTime(patient.$createdAt).dateOnly}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact & Basic Information */}
                <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-dark-400 rounded-2xl p-6 bg-dark-400">
                        <h2 className="sub-header mb-4 text-green-500">Contact Information</h2>
                        <div className="space-y-4">
                            <InfoItem label="Email" value={patient.email} />
                            <InfoItem label="Phone" value={patient.phone} />
                            <InfoItem label="Address" value={patient.address} />
                            <InfoItem label="Occupation" value={patient.occupation} />
                        </div>
                    </div>

                    <div className="border border-dark-400 rounded-2xl p-6 bg-dark-400">
                        <h2 className="sub-header mb-4 text-blue-500">Personal Information</h2>
                        <div className="space-y-4">
                            <InfoItem label="Date of Birth" value={formatDateTime(patient.birthDate).dateOnly} />
                            <InfoItem label="Gender" value={capitalize(patient.gender)} />
                            <InfoItem label="Emergency Contact" value={patient.emergencyContactName} />
                            <InfoItem label="Emergency Phone" value={patient.emergencyContactNumber} />
                        </div>
                    </div>
                </section>

                {/* Insurance Information */}
                <section className="w-full border border-dark-400 rounded-2xl p-6 bg-dark-400">
                    <h2 className="sub-header mb-4 text-blue-500">Insurance Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InfoItem label="Insurance Provider" value={patient.insuranceProvider} />
                        <InfoItem label="Policy Number" value={patient.insurancePolicyNumber} />
                    </div>
                </section>

                {/* Doctor & Medical Information */}
                <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-dark-400 rounded-2xl p-6 bg-dark-400">
                        <h2 className="sub-header mb-4 text-green-500">Primary Physician</h2>
                        <div className="flex items-center gap-4">
                            {doctor && (
                                <Image
                                    src={doctor.image}
                                    alt={doctor.name}
                                    width={80}
                                    height={80}
                                    className="rounded-full border border-dark-500"
                                />
                            )}
                            <div>
                                <p className="text-16-semibold">{patient.primaryPhysician}</p>
                                <p className="text-12-regular text-dark-700">Primary Care Physician</p>
                            </div>
                        </div>
                    </div>

                    <div className="border border-dark-400 rounded-2xl p-6 bg-dark-400">
                        <h2 className="sub-header mb-4 text-blue-500">Identification</h2>
                        <div className="space-y-3">
                            <InfoItem label="Type" value={patient.identificationType || 'Not provided'} />
                            <InfoItem label="Number" value={patient.identificationNumber || 'Not provided'} />
                            {patient.identificationDocumentUrl && (
                                <div className="mt-4">
                                    <a
                                        href={patient.identificationDocumentUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-500 text-14-medium hover:underline"
                                    >
                                        View Document →
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Medical History */}
                <section className="w-full border border-dark-400 rounded-2xl p-6 bg-dark-400">
                    <h2 className="sub-header mb-4 text-green-500">Medical History</h2>
                    <div className="space-y-6">
                        <MedicalHistoryItem
                            title="Allergies"
                            value={patient.allergies || 'None documented'}
                        />
                        <MedicalHistoryItem
                            title="Current Medications"
                            value={patient.currentMedication || 'None documented'}
                        />
                        <MedicalHistoryItem
                            title="Past Medical History"
                            value={patient.pastMedicalHistory || 'None documented'}
                        />
                        <MedicalHistoryItem
                            title="Family Medical History"
                            value={patient.familyMedicalHistory || 'None documented'}
                        />
                    </div>
                </section>

                {/* Consent Status */}
                <section className="w-full border border-dark-400 rounded-2xl p-6 bg-dark-400">
                    <h2 className="sub-header mb-4 text-blue-500">Consent Status</h2>
                    <div className="space-y-3">
                        <ConsentItem
                            label="Privacy Consent"
                            value={patient.privacyConsent}
                        />
                    </div>
                </section>
            </main>
        </div>
    )
}

function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-12-regular text-dark-700 uppercase">{label}</p>
            <p className="text-14-semibold text-light-200">{value}</p>
        </div>
    )
}

function MedicalHistoryItem({ title, value }: { title: string; value: string }) {
    return (
        <div>
            <p className="text-14-medium text-dark-700 mb-2">{title}</p>
            <p className="text-14-regular text-light-200 p-3 bg-dark-300 rounded-lg border border-dark-500">
                {value}
            </p>
        </div>
    )
}

function ConsentItem({ label, value }: { label: string; value: boolean }) {
    return (
        <div className="flex items-center justify-between p-4 bg-dark-300 rounded-lg border border-dark-500">
            <span className="text-14-medium text-light-200">{label}</span>
            <span className={`text-12-semibold px-3 py-1 rounded-full ${value ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                {value ? 'Consented' : 'Not Consented'}
            </span>
        </div>
    )
}

function capitalize(str: string) {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export default PatientDetailPage
