import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href='/'>
    <Image src='/assets/icons/logo-full.svg'
            alt='logo'
            height={500}
            width={500}
            className=" h-8 w-fit "
            />
    </Link>
  )
}

export default Logo