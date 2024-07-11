import Footer from "@/components/Footer"
import RegisterForm from "@/components/forms/RegisterForm"
import Logo from "@/components/Logo"
import SideImg from "@/components/SideImg"
import { getUser } from "@/lib/actions/patient.action"
import Image from "next/image"
import * as Sentry from '@sentry/nextjs'
const Register = async({params}: SearchParamProps) => {
  const user = await getUser(params.id)
  Sentry.metrics.set("user_view", user);

  return (
    <div className=" flex h-screen max-h-screen">
      <section className="remove-scrollbar container ">
        <div className="sub-container max-w-[860px]  flex-1 flex-col py-10 ">
                  <Logo />

                 <RegisterForm user={user} />

                 <Footer showAdmin={false} />
        </div>
      </section>
      <Image src='/assets/images/register-img.png'
          width={1000}
          height={1000}
          alt="sideimage"
          className={`side-img max-w-[30%] rounded-lg`} priority />
    </div>
  )
}

export default Register