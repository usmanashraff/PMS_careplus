"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl
} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { PatientFormValidation, UserFormValidation } from "@/lib/userFormValidation"
import { createUser, registerPatient } from "@/lib/actions/patient.action"
import { useRouter } from "next/navigation"
import Error from "./Error"
import { FormFieldType } from "./PaitentForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, genderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import { FileUploader } from "../FileUploader"


 

 
export function RegisterForm({user}:{user: User}) {
  const [isLoading, setisLoading] = useState(false)
  const [isError, setisError] = useState("")
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    //@ts-ignore
    defaultValues: {
        ...PatientFormDefaultValues,
      email: '',
      phone:''
    },
  })
 
  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    let formData;
   if(values.identificationDocument && values.identificationDocument.length > 0){
    const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type
    })
     formData = new FormData()
     formData.append('blobFile', blobFile)
     formData.append('fileName', values.identificationDocument[0].name)
   }

   try {
    const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,

    }
    //@ts-ignore
    const patient = await registerPatient(patientData)
    if(patient) router.push(`/patients/${user.$id}/new-appointment`)
   } catch (error) {
    console.log(error)
   }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-2 mt-8">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">let us know more about yourself</p>
        </section>

        <section className=" pb-5 space-y-6 ">
          <h2 className=" sub-header">Personal Information</h2>
        </section>

        <CustomFormField 
             control={form.control}
             fieldType={FormFieldType.INPUT}
             name='name'
             label='Full Name'
             imgSrc='/assets/icons/user.svg'
             altIcon='user'
             placeholder="usman ashraf"

        />

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
             control={form.control}
             fieldType={FormFieldType.INPUT}
             name='email'
             label='Email Address'
             imgSrc='/assets/icons/email.svg'
             altIcon='email'
             placeholder="@gmail.com"

        />

<CustomFormField 
             control={form.control}
             fieldType={FormFieldType.PHONE_INPUT}
             name='phone'
             label='Phone Number'
             placeholder="+92 3356670129"

        />
        </div>



        <div className="flex flex-col xl:flex-row gap-6">
        <CustomFormField 
             control={form.control}
             fieldType={FormFieldType.DATE_PICKER}
             name='birthDate'
             label='Date of birth'

        />

        <CustomFormField 
             control={form.control}
             fieldType={FormFieldType.SKELETON}
             name='gender'
             label='Gender'
             renderSkeleton={(field)=>(
                <FormControl>
                <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onValueChange}
                    defaultValue={field.defaultValue}
                    >
                        {genderOptions.map((option)=>(
                            <div key={option} className="radio-group">
                                <RadioGroupItem
                                value={option}
                                id={option}
                                />
                                <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </FormControl>
             )}

        />
        </div>
        <div className="flex flex-col xl:flex-row gap-6">
        <CustomFormField 
             control={form.control}
             fieldType={FormFieldType.INPUT}
             name='address'
             label='Address'
             placeholder="13th Street lahore"

        /> <CustomFormField 
        control={form.control}
        fieldType={FormFieldType.INPUT}
        name='occupation'
        label='Occupation'
        placeholder="e.g. Software engineer"

   />
        </div>
        <div className="flex flex-col xl:flex-row gap-6">

        <CustomFormField 
             control={form.control}
             fieldType={FormFieldType.INPUT}
             name='emergencyContactName'
             label='Emergency Contact Name'
             placeholder="Guardian's name"

        />

<CustomFormField 
             control={form.control}
             fieldType={FormFieldType.PHONE_INPUT}
             name='emergencyContactNumber'
             label='Emergency Contact Number'
             placeholder="+92 3356670129"

        />
        </div>

        {/* medical information */}
        <section className=" py-5 pt-10 space-y-6 ">
          <h2 className=" sub-header">Medical Information</h2>
        </section>

        <CustomFormField 
             control={form.control}
             fieldType={FormFieldType.SELECT}
             name='primaryPhysician'
             label='Primary Physician'
             placeholder="Select a physician"

        >
            {Doctors.map((doctor)=>(
                <SelectItem key={doctor.name} value={doctor.name}>
                    <div className="cursor-pointer gap-2 flex items-center">
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


        <div className="flex flex-col xl:flex-row gap-6">
        <CustomFormField 
             control={form.control}
             fieldType={FormFieldType.INPUT}
             name='insuranceProvider'
             label='Insurance Provider'
             placeholder="blueCross blueShield"

        />
         <CustomFormField 
             control={form.control}
             fieldType={FormFieldType.INPUT}
             name='insurancePolicyNumber'
             label='Insurance Policy Number'
             placeholder="ABC123456789"

        />
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
        <CustomFormField 
             control={form.control}
             fieldType={FormFieldType.TEXTAREA}
             name='allergies'
             label='Elergies (if any)'
             placeholder="peanuts, penicillin, pollen"

        />
         <CustomFormField 
             control={form.control}
             fieldType={FormFieldType.TEXTAREA}
             name='currentMedication'
             label='Current Medication (if any)'
             placeholder="Ibuprofen 200mg, paracetamol 500mg"

        />
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
        <CustomFormField 
             control={form.control}
             fieldType={FormFieldType.TEXTAREA}
             name='familyMedicalHistory'
             label='Family medical history'
             placeholder="mother had brain cancer and father had heart diesese"

        />
         <CustomFormField 
             control={form.control}
             fieldType={FormFieldType.TEXTAREA}
             name='pastMedicalHistory'
             label='Past medical history'
             placeholder="appendectomy,tonsillectomy"

        />
        </div>
{/* identification and verification */}
<section className=" py-5 pt-10 space-y-6 ">
          <h2 className=" sub-header">Identification and verification</h2>
        </section>



        <CustomFormField 
             control={form.control}
             fieldType={FormFieldType.SELECT}
             name='identificationType'
             label='Identification type'
             placeholder="Select a identification type"

        >
            {IdentificationTypes.map((type)=>(
                <SelectItem key={type} value={type}>
                    {type}
                </SelectItem>
            ))}
        </CustomFormField>

        <CustomFormField 
             control={form.control}
             fieldType={FormFieldType.INPUT}
             name='identificationNumber'
             label='Identification number'
             placeholder="098765432"

        />

<CustomFormField 
             control={form.control}
             fieldType={FormFieldType.SKELETON}
             name='identificationDocument'
             label='Identification document'
             renderSkeleton={(field)=>(
                <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
                </FormControl>
             )}

        />

        {/* privacy and consent */}
<section className=" py-5 pt-10 space-y-6 ">
          <h2 className=" sub-header">Privacy and consent</h2>
        </section>

        
        <CustomFormField 
             control={form.control}
             fieldType={FormFieldType.CHECKBOX}
             name='treatmentConsent'
             label='I consent to treatment'

        />

<CustomFormField 
             control={form.control}
             fieldType={FormFieldType.CHECKBOX}
             name='disclosureConsent'
             label='I consent to disclosure consent information'

        />

<CustomFormField 
             control={form.control}
             fieldType={FormFieldType.CHECKBOX}
             name='privacyConsent'
             label='I consent to privacy policy'

        />
       
       {isError !== "" && ( <Error message={isError} />)}
       <SubmitButton isLoading={isLoading}>Submit Patient</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm