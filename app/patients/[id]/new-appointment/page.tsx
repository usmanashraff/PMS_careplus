import Footer from "@/components/Footer";
import AppointmentForm from "@/components/forms/AppointmentForm";
import PaitentForm from "@/components/forms/PaitentForm";
import Logo from "@/components/Logo";
import SideImg from "@/components/SideImg";
import { getPatient } from "@/lib/actions/patient.action";
import Image from "next/image";

export default async function NewAppointment({params: {id}}:SearchParamProps) {
  const patient = await getPatient(id)
  return (
    <div className=" flex h-screen">
      <section className="remove-scrollbar container  flex-1 justify-between">
        <div className="sub-container max-w-[496px]  h-full">
                  <Logo />

            <AppointmentForm
                 type="create"
                 userId={id}
                 patientId={patient.$id} 
              />

                 <Footer showAdmin={false} />
        </div>
      </section>
    <Image src='/assets/images/appointment-img.png'
    width={1000}
    height={1000}
    alt="sideimage"
    className={`side-img max-w-[30%] rounded-lg`} priority />
    </div>
  );
}
