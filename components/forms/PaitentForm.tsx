"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form
} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/userFormValidation"
import { createUser } from "@/lib/actions/patient.action"
import { useRouter } from "next/navigation"
import Error from "./Error"

export enum FormFieldType{
  INPUT = 'input',
  TEXTAREA= 'textarea',
  PHONE_INPUT= 'phoneInput',
  CHECKBOX='checkbox',
  DATE_PICKER='datePicker',
  SKELETON = 'skeleton',
  SELECT = 'select'
}
 

 
export function PaitentForm() {
  const [isLoading, setisLoading] = useState(false)
  const [isError, setisError] = useState("")
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: '',
      phone:''
    },
  })
 
  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    
    setisLoading(true)
    setisError("")
    try {
      const userData = {name, email, phone}
      const  returnData  = await createUser(userData)
      console.log('form form file',returnData)
     if(returnData?.message){
        setisError(returnData.message)
     }
    if(returnData.$id) router.push(`/patients/${returnData.$id}/register`)
    } catch (error) {
      console.log(error)
    }finally{
      setisLoading(false)
    }
    //console.log(process.env.NEXT_PUBLIC_PROJECT_ID, process.env.NEXT_PUBLIC_API_KEY)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-1">
        <section className="mb-12 space-y-2 mt-8">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Schedule your first appointment</p>
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
       {isError !== "" && ( <Error message={isError} />)}
       <SubmitButton isLoading={isLoading}>Get Started!</SubmitButton>
      </form>
    </Form>
  )
}

export default PaitentForm