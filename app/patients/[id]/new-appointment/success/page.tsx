import Footer from '@/components/Footer'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Doctors } from '@/constants'
import { getAppointment } from '@/lib/actions/appointment.actions'
import { formatDateTime } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Success = async({params: {id}, searchParams}: SearchParamProps) => {
    const appointmentId = (searchParams?.appointmentId as string || '')
    const appointment = await getAppointment(appointmentId)

    const doctor = Doctors.find((doc)=> doc.name === appointment.primaryPhysician)
  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
    <div className="success-img">
        <Logo />
        <section className="flex flex-col items-center mt-8">
            <Image src="/assets/gifs/success.gif" alt='success' width={300 } height={300} />
            <h1 className='header mb-6 max-w-[600px] text-center'>Your <span className=' text-green-500'>appointment request</span> has been successfuly submitted</h1>
            <p>we will be in touch shortly to confirm</p>
        </section>
        <section className="request-details">
            <p>Requested appointment details:</p>
            <Image src ={doctor?.image!}
                   alt="doctor" width={100} height={100} className='size-6' />
                   <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
                   <div className="flex gap-3">
            <Image src='/assets/icons/calendar.svg' alt='calender' width={24} height={24}
              />
              <p>{formatDateTime(appointment.schedule).dateTime}</p>
        </div>
        </section>
        <Button variant={'outline'} className='shad-primary-btn'>
            <Link href={`/patients/${id}/new-appointment`}>
            New appointment</Link>
        </Button>

        <Footer showAdmin={false} />
       
    </div>
    </div>
  )
}

export default Success