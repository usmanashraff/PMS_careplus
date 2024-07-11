import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
interface SubmitProps {
  isLoading: boolean,
  children: React.ReactNode,
  className?: string
}
const SubmitButton = ({isLoading, className, children}: SubmitProps) => {
  return (
    <Button className={className ?? 'shad-primary-btn w-full'} type='submit' disabled={isLoading}>
      {isLoading? (
        <div className="flex items-center gap-4">
          <Image src='/assets/icons/loader.svg'
                 alt='loader'
                 height={24}
                 width={24}
                 className='animate-spin' />
                 loading...
        </div>
      ): children}
    </Button>
  )
}

export default SubmitButton