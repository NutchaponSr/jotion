import { IntroduceButton } from "@/components/introduce-button";
import { Button } from "@/components/ui/button";
import { SignnedOut } from "@/modules/auth/components/signned-out";
import Image from "next/image";

const Home = () => {

  return (
    <SignnedOut>
      <section className="md:px-8 px-6 mt-32 max-w-[80rem] relative mx-auto h-full text-center">
        <div className="relative flex flex-col space-y-5 mx-auto max-w-4xl pb-[16vh]">
          <IntroduceButton />
          <h1 className="bg-gradient-to-t from-primary to-[#787774] bg-clip-text text-transparent text-6xl tracking-tighter font-medium text-balance">
            Drive Success with Precision.
          </h1>
          <p className="tracking-tight text-primary text-balance mx-auto">
            Empower your organization with tailored strategies and actionable insights.
          </p>
          <div className="flex justify-between items-center py-10 relative">
            <div className="transition-all duration-150 ease-in-out shadow-[0_0_0_1px_rgba(15,15,15,0.1),0_2px_4px_rgba(15,15,15,0.1)] bg-[#fffefc] inline-flex justify-center items-center size-16 rounded-full">
              <div className="flex items-center justify-center shrink-0">
                <Image src="/excel.svg" alt="Excel" width={32} height={32} />
              </div>
            </div>
            <div className="absolute left-0 w-1/2 h-1 bg-amber-300" />
            <button className="inline-flex absolute left-1/2 -translate-x-1/2 h-11 items-center justify-center gap-4 px-4 py-1 bg-primary rounded-full overflow-hidden shadow-[0px_8px_16px_-4px_#0000003d,0px_4px_8px_-2px_#0000003d,0px_-8px_16px_-1px_#00000029,0px_2px_4px_-1px_#0000003d,0px_0px_0px_1px_#37352f,inset_0px_0px_0px_1px_#ffffff14,inset_0px_1px_0px_#ffffff33] border-none hover:bg-primary/90 transition duration-300">
              <span className="text-neutral-100 font-medium tracking-wide [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] text-lg">
                Jotion
              </span>
            </button>
            <div className="transition-all duration-150 ease-in-out shadow-[0_0_0_1px_rgba(15,15,15,0.1),0_2px_4px_rgba(15,15,15,0.1)] bg-[#fffefc] inline-flex justify-center items-center size-16 rounded-full">
              <div className="flex items-center justify-center shrink-0">
                <Image src="/google-forms.svg" alt="Form" width={32} height={32} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SignnedOut>
  );
}

export default Home;