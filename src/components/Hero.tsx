import { Button } from "@/components/ui/button";
import { RiArrowRightLine } from "react-icons/ri";

const Hero = () => {
   return (
      <>
         <section className="hero h-[640px] w-full xl:h-[840px] bg-hero bg-auto bg-center lg:bg-cover bg-no-repeat bg-slate-500/10 bg-blend-multiply relative z-20 mx-auto">
            <div className="container h-full mx-auto flex items-center justify-end">
               <div className="hero__text bg-herotext w-[567px] h-[400px] flex flex-col items-start text-left p-10 rounded-lg">
                  <h2 className="h2 mb-2 text-secondary text-base capitalize">New arrivals</h2>
                  <h1 className="h1 mb-2 text-primary capitalize font-bold text-6xl/[65px]">
                     Discover our new collection
                  </h1>
                  <p className="text-secondary text-lg font-medium">
                     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque quae tenetur, a est id excepturi iste laboriosam.
                  </p>
                  <Button
                     variant="flat"
                     className="mt-auto uppercase font-bold text-white px-[72px] py-[25px]"
                  >
                     Buy now
                  </Button>
               </div>
            </div>
         </section>
      </>
  );
};

export default Hero;