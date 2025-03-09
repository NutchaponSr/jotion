import { IntroduceButton } from "@/components/introduce-button";
import { Button } from "@/components/ui/button";
import { SignnedOut } from "@/modules/auth/components/signned-out";
import Image from "next/image";
import { Hero } from "./components/hero";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";

const Home = () => {

  return (
    <SignnedOut>
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
            <h1 className="bg-gradient-to-t from-primary to-[#787774] bg-clip-text text-transparent text-6xl tracking-tighter font-semibold text-balance">
              Drive Success with Precision.
            </h1>
            <p className="tracking-tight text-primary text-balance mx-auto">
              Empower your organization with tailored strategies and actionable insights.
            </p>
            <Hero />
          </div>
        </div>
      </section>
    </SignnedOut>
  );
}

export default Home;