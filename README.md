#Development process
##setup 
1.create app </br>
```
npx create-next-app@latest
```
2.remove all default stuff </br>
3.add custome stuff in rootlayout file </br>
```import { Plus_Jakarta_Sans } from "next/font/google";
//changing font setting
const fontSans = Plus_Jakarta_Sans({ subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans'
 });


 <!-- import new function(cn) from /lib/utils --> </br>
 import { cn } from "@/lib/utils";
//this cn is className and all classes added to that function will be applied by default

  <body className={===cn('min-h-screen text-white bg-dark-300 font-sans antialiased', fontSans.variable)===}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >
            {children}
          </ThemeProvider>
      </body>

      // antialiased is a tailwing class to make font look more good
      

      //theme provider wrapper is in context of the next-themes installed by the shad-cn libraray
      </br>
      refer this link to install next-themes
      [next-theme in shadcn](https://ui.shadcn.com/docs/dark-mode/next) </br>
```
now come to this /lib/utils.ts file from where cn function re imported, it will have the following function defined
```
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
need to install two package for this 
1.clsx </br>
2.twMerge </b>


###add custom tailwing.conf file (custom colors and all other stuff to extend things up)
###custom globels.css file (add custom classes and all thoses)

###install shadcn library: refer to this link for further guide [shad-install](https://ui.shadcn.com/docs/installation) </br>

with all setup! ready to get into development process

##Home page 
only important things will be discussed </br>
###reack hook form 
refer to this link for installation and usage of react hook form [react hook form](https://ui.shadcn.com/docs/components/form) </br>

install zod and make an saperate file for the zod validation in lib/validation.ts</br>
```
import { z } from "zod";

export const UserFormValidation = z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  });
```

while using react hook form make a seperate component for rendering the formfield so not to have messy code 
</br>
space-y-4. tailwing class that space vertically all items in it  </br>
how to pass form.control to customformfield component ?</br>
it is a type "Control any" </br>
use enum to send form field types </br>
enums are used to avoid types 
```
export enum FormFieldType{
  INPUT = 'input',
  TEXTAREA= 'textarea',
  PHONE_INPUT= 'phoneInput',
  CHECKBOX='checkbox',
  DATE_PICKER='datePicker',
  SKELETON = 'skeleton',
  SELECT = 'select'
}
 
```
these are all the props that we are getting in the customFormField component and thats how we define the types of props in typescript 
```
interface customProps{
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    imgSrc?: string,
    altIcon?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any)=> React.ReactNode

}
```
in the field render function print field according to the input type
```
 const {fieldType, imgSrc, placeholder, altIcon} = props;
    switch (props.fieldType){
        case FormFieldType.INPUT: 
        return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">
                {imgSrc && (
                    <Image src={imgSrc}
                    height={24}
                    width={24}
                    alt={altIcon || 'icon'}
                    className="mx-2" />
                )}

                <FormControl>
                    <input placeholder={placeholder} {...field} className="shad-input border-0 px-2 w-full outline-none" />
                </FormControl>
            </div>
        )
        break;
        }

```

special type of field (phone number type field)
```
 <FormControl>
                <PhoneInput
                        placeholder={placeholder}
                        withCountryCallingCode
                        international
                        defaultCountry='US'
                        value={field.value as undefined}
                        onChange={field.onChange}
                        className='input-phone'
                        />
            </FormControl>
```
for this to use install the following package 
```npm install react-phone-number-input --save```
or refer to this link for usage [link](https://www.npmjs.com/package/react-phone-number-input) </br>
###valiation </br>
use zod for make a validation schema 
and update default values of fields in the form resolver 
```
 const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: '',
      phone:''
    },
  })
 
```

###validation ts file in lib folder </br>
```
import { z } from "zod";

export const UserFormValidation = z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  });
```
##appwrite setup </br>
1.make an organization and a project 
2.copy project id, api key, database id, tables id,and storage bucket in .env file </br>
```
#APPWRITE
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1

NEXT_PUBLIC_PROJECT_ID=

NEXT_PUBLIC_API_KEY=

NEXT_PUBLIC_DATABASE_ID=

NEXT_PUBLIC_PATIENT_COLLECTION_ID=

NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID=

NEXT_PUBLIC_DOCTOR_COLLECTION_ID=

NEXT_PUBLIC_BUCKET_ID=

NEXT_PUBLIC_ADMIN_PASSKEY=1111

```
use NEXT_PUBLIC as a prefix for env variables in nextjs <br>
##authentication in appwrite </br>
install `npm install node-appwrite --save`
</br>
setup sdk and configure app.conf.ts file
```
import * as sdk from "node-appwrite";

const client = new sdk.Client().setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!) // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!) // Your project ID
    .setKey(process.env.NEXT_PUBLIC_API_KEY!); // Your secret API key



export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
```
</br>
###thats how we create a new user and fetch users from appwrite auth </br>

```
import { ID, Query } from "node-appwrite"
import { users } from "../appwrite.config"

export const createUser = async(user: CreateUserParams ): Promise<any> =>{
    try {
        const newUser = await users.create(ID.unique(), user.email, user.phone, undefined, user.name)
        console.log('from action file',newUser)
        return newUser
    } catch (error:any) {
        if(error && error?.code == 409){ // error code 409 means user exists
            const document = await users.list([
                Query.equal('email', [user.email])
            ])
            return { message: 'user_already_exists', content: document}
            
        }
        return {message: 'error in creating user', content: error}
        
        
    }

}
```
</br>
###error handling </br> 
returing an object from the action function and print error to user if exists


##registration page </br>
we will only discusse new form field types used </br>
###react-datepicker </br> 
[react-datePicker](https://www.npmjs.com/package/react-datepicker) </br>
```
<FormControl id='date-picker'>
                <DatePicker selected={field.value} onChange={(date) => field.onChange(date)} 
                    showTimeSelect={showTimeSelect ?? false}
                    dateFormat={dateFormat ?? 'MM/DD/YYYY'}
                    wrapperClassName="date-picker"
                    timeInputLabel="Time"
                    />
```

</br>
rendering skeleton in customformfield </br>

```
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
 ```
 </br>
 how to render select </br>
 sending children </br>
 
 ```
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
 ```
 on rendering side </br> 
 ```
  <FormControl>
                <Select onValueChange={field.onChange}
                 defaultValue={field.value}
                >
                    <FormControl >
                        <SelectTrigger className="shad-select-trigger">
                        <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent className="shad-select-content">
                        {props.children}
                    </SelectContent>
                </Select>
            </FormControl>
 ```
 
 
 </br>
 this is how we will render file uploader install from this </br> [link](https://react-dropzone.js.org/)
 
 ```
 "use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

export const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt="uploaded image"
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="upload"
          />
          <div className="file-upload_label">
            <p className="text-14-regular ">
              <span className="text-green-500">Click to upload </span>
              or drag and drop
            </p>
            <p className="text-12-regular">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </>
      )}
    </div>
  );
};
```

this is how we render checkbox </br>
```
  <FormControl>
                    <div className="flex gap-4 items-center">
                        <Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange} />
                        <label htmlFor={props.name} className="checkbox-label">{props.label}</label>
                    </div>
                </FormControl
```
</br>

###on submitting register form 
```
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
```

registerUser function explanation 
```
// REGISTER PATIENT
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  console.log("subbmittes")
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file;
    if (identificationDocument) {
      const inputFile =
        identificationDocument &&
        InputFile.fromBuffer(
          identificationDocument?.get("blobFile") as Blob,
          identificationDocument?.get("fileName") as string
        );

      file = await storage.createFile(process.env.NEXT_PUBLIC_BUCKET_ID!, ID.unique(), inputFile);
    }

    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newPatient = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${file.$id}/view??project=${process.env.NEXT_PUBLIC_PROJECT_ID}`
          : null,
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};
```
 


 ##appointment page 
