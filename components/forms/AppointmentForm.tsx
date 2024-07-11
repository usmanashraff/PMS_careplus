"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { date, z } from "zod"
import {
  Form
} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { getAppointmentSchema } from "@/lib/userFormValidation"
import { createUser } from "@/lib/actions/patient.action"
import { useRouter } from "next/navigation"
import Error from "./Error"
import Image from "next/image"
import { Doctors } from "@/constants"
import { SelectItem } from "../ui/select"
import { createAppointment, updateAppointment } from "@/lib/actions/appointment.actions"
import { Appointment } from "@/types/appwrite.types"
import { Type } from "lucide-react"
import { revalidatePath } from "next/cache"

export enum FormFieldType{
  INPUT = 'input',
  TEXTAREA= 'textarea',
  PHONE_INPUT= 'phoneInput',
  CHECKBOX='checkbox',
  DATE_PICKER='datePicker',
  SKELETON = 'skeleton',
  SELECT = 'select'
}
 

 
export function AppointmentForm({type, userId, patientId, appointment, open}:{
    type: string,
    userId: string,
    patientId: string
    appointment?: Appointment
    open: (open: boolean) => void
}) {
  const [isLoading, setisLoading] = useState(false)
  const [isError, setisError] = useState("")
  const router = useRouter()
  const appointmentFormValidation = getAppointmentSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof appointmentFormValidation>>({
    resolver: zodResolver(appointmentFormValidation),
    defaultValues: {
     primaryPhysician: appointment ? appointment.primaryPhysician: '',
     schedule:  appointment ? new Date(appointment.schedule): new Date(Date.now()),
     note:  appointment ? appointment.note: '',
     reason:  appointment ? appointment.reason: '',
     cancellationReason: appointment?.cancellationReason ||  '',
    },
  })
 
  async function onSubmit(values: z.infer<typeof appointmentFormValidation>) {
    setisLoading(true)
    let status;
    switch(type){
      case 'schedule':
        status = 'scheduled'
        break;
      case 'cancel':
        status= 'cancelled'
        break;
      default:
        status= 'pending'
    }
    try {
      if(type == 'create' && patientId){
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          note: values.note,
          status: status as Status,
          reason: values.reason!
        }
        const appointment = await createAppointment(appointmentData)
        console.log(appointment)
        if(appointment){
          form.reset()
          router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`)
        }

      }else{

        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          appointment:{
            primaryPhysician: values?.primaryPhysician,
            schedule: new Date(values?.schedule),
            status: status as Status
            ,cancellationReason: values?.cancellationReason
          },
          type: type
        }
        console.log(' hello ' , appointmentToUpdate)

        const updatedAppointment = await updateAppointment(appointmentToUpdate);
        if(updatedAppointment){
          open && open(false)
          form.reset()
        }
      }

    } catch (error) {
      console.log(error)
    }finally{
      setisLoading(false)
    }
    
  }

  let buttonLabel;
  switch(type){
    case 'create':
        buttonLabel = 'create appointment'
        break;
    case 'schedule':
         buttonLabel = 'schedule appointment'
         break;
    case 'cancel':
         buttonLabel = 'cancel appointment'
          break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-1">
        {type == 'create' && <section className="mb-12 space-y-2 mt-8">
          <h1 className=" capitalize">New Appointment 👋</h1>
          <p className="text-dark-700">Schedule an appointment in 10s</p>
        </section>}

       {type !== 'cancel' && (<>

       <CustomFormField 
       control={form.control}
       fieldType={FormFieldType.SELECT}
       name='primaryPhysician'
       label='Doctor'
       placeholder="Select a doctor"

  >
      {Doctors.map((doctor)=>(
          <SelectItem key={doctor.name} value={doctor.name}>
              <div className="cursor-pointer gap-2 flex items-center xl:flex-row">
                  <Image 
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt={`${doctor.name} image`}
                    className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
              </div>
          </SelectItem>
      ))}
  </CustomFormField>
  <CustomFormField  
      fieldType={FormFieldType.DATE_PICKER}
      control={form.control}
      name="schedule"
      label="expected appointment date"
      dateFormat="MM/dd/yyyy - h:mm:aa"
      showTimeSelect
  />
   <div className="flex flex-col gap-6">
   <CustomFormField 
             control={form.control}
             fieldType={FormFieldType.TEXTAREA}
             name='reason'
             label='Reason for appointment'

        />
         <CustomFormField 
             control={form.control}
             fieldType={FormFieldType.TEXTAREA}
             name='note'
             label='Notes'
             placeholder="Enter notes"

        />
   </div>
       </>
    
    )}



    {type === 'cancel' && (
         <CustomFormField 
         control={form.control}
         fieldType={FormFieldType.TEXTAREA}
         name='cancellationReason'
         label='Reason of cancellation'
    />
    )}
       {isError !== "" && ( <Error message={isError} />)}
       <SubmitButton isLoading={isLoading} className={type == 'cancel'? `shad-danger-btn`: 'shad-primary-btn' }>
          {buttonLabel}
       </SubmitButton>
      </form>
    </Form>
  )
}

export default AppointmentForm