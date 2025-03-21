import { cn } from "@/lib/utils";

import { Hero } from "@/app/(main)/components/hero";

import { GridPattern } from "@/components/magicui/grid-pattern";
import { IntroduceButton } from "@/app/(main)/components/introduce-button";

import { Signed } from "@/modules/routes/auth/components/signed";

const Home = () => {
  return (
    <Signed.Out>
      <section className="md:px-8 px-6 mt-32 max-w-[80rem] relative mx-auto h-full text-center">
        <div className="relative flex flex-col space-y-5 mx-auto max-w-7xl pb-[16vh]">
          <GridPattern
            width={30}
            height={30}
            x={-1}
            y={-1}
            strokeDasharray={"4 2"}
            className={cn(
              "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
            )}
          />
          <IntroduceButton />
          <div className="relative z-10">
            <h1 className="bg-gradient-to-t from-primary to-[#787774] dark:from-[#787774] dark:to-primary bg-clip-text text-transparent text-6xl tracking-tighter font-semibold text-balance">
              Drive Success with Precision.
            </h1>
            <p className="tracking-tight text-primary dark:text-stone-300 text-balance mx-auto">
              Empower your organization with tailored strategies and actionable insights.
            </p>
            <Hero />
          </div>
        </div>
      </section>
    </Signed.Out>
  );
}

export default Home;