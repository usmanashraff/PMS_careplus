import Footer from "@/components/Footer";
import PaitentForm from "@/components/forms/PaitentForm";
import Logo from "@/components/Logo";
import PassKeyModel from "@/components/PassKeyModel";
import Image from "next/image";

export default function Home({searchParams}: SearchParamProps) {
  const isAdmin = searchParams.admin === 'true';
  return (
    <div className=" flex h-screen">
        {isAdmin && ( <PassKeyModel /> )}
      <section className="remove-scrollbar container my-auto  h-full">
        <div className="sub-container max-w-[496px]  h-full">
                  <Logo />

                 <PaitentForm />

                 <Footer showAdmin={true} />
        </div>
      </section>
      <Image src='/assets/images/onboarding-img.png'
    width={1000}
    height={1000}
    alt="sideimage"
    className={`side-img max-w-[50%] rounded-lg`} priority />
    </div>
  );
}
