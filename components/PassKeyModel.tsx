'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { decryptKey, encryptKey } from "@/lib/utils"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
const PassKeyModel = () => {
  const router = useRouter()
  const [open, setopen] = useState(true)
  const [passKey, setpassKey] = useState("")
  const [error, setError] = useState("")

  const encryptedKey = typeof window !== 'undefined' ? window.localStorage.getItem('accessKey'): null 
useEffect(()=>{
  const decryptedKey = encryptedKey && decryptKey(encryptedKey)
  if(decryptedKey == process.env.NEXT_PUBLIC_ADMIN_PASSKEY){
    router.push('/admin')
    setopen(false)
  }else{
    setopen(true)
  }
   
}, [encryptedKey])
  const validatePassKey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    e.preventDefault()
    if(passKey == process.env.NEXT_PUBLIC_ADMIN_PASSKEY){
      const encryptedKey = encryptKey(passKey);
      localStorage.setItem('accessKey', encryptedKey)
      console.log('seting item', encryptedKey)
      setopen(false)

    }else{
      setError("invalid passkey, try again...")
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={setopen}>
  <AlertDialogContent className="bg-dark-200">
    <AlertDialogHeader>
      <AlertDialogTitle className="flex items-center justify-between">
        <p>Admin Access verification</p>
        <Image 
           src='/assets/icons/close.svg'
           height={24}
           width={24}
           alt='close btn'
           className="cursor-pointer"
           onClick={()=> {
            setopen(false)
            router.push('/')
          }}
        />
      </AlertDialogTitle>
      <AlertDialogDescription>
        To access the admin page, please enter the passkey
      </AlertDialogDescription>
    </AlertDialogHeader>
    <div>
    <InputOTP maxLength={6} value={passKey} onChange={(value)=>setpassKey(value)}>
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
      </InputOTP>

      {error !== '' && (
        <p className="shad-error text-14-regular mt-4 flex justify-center">{error}</p>
      )}

    </div>
    <AlertDialogFooter>
      <AlertDialogAction onClick={(e)=>validatePassKey(e)} className="shad-primary-btn w-full">Enter Admin passkey</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}

export default PassKeyModel