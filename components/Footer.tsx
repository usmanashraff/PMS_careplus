import Link from "next/link"


const Footer = ({showAdmin}: {showAdmin: boolean}) => {
  return (
  
        
        <div className="text-14-regular mt-6 flex justify-between py-10">
                  <p className="justify-items-end text-dark-600 xl:text-left">
                  © 2024 CarePlus
                  </p>
                  {showAdmin? <Link href='/?admin=true' className="text-green-500">Admin</Link>: <></>}
                 </div>
   
  )
}

export default Footer