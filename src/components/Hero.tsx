import { Button } from "@/components/ui/button";

const Hero = () => {
   return (
      <>
         <section className="hero h-[66svh] w-full flex bg-hero bg-auto bg-center lg:bg-cover bg-no-repeat bg-slate-500/10 bg-blend-multiply">
            <div className="container h-full mx-auto flex items-start justify-end">
               <div className="hero__text bg-herotext w-[643px] h-[440px] flex flex-col items-start text-left p-10 mt-[155px] rounded-lg">
                  <h2 className="h2 mb-2 text-base capitalize">New arrivals</h2>
                  <h1 className="h1 mb-2 text-accent capitalize font-bold text-6xl/[65px]">
                     Discover our new collection
                  </h1>
                  <p className="text-lg font-medium">
                     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque quae tenetur, a est id excepturi iste laboriosam.
                  </p>
                  <Button variant="flat">
                     Buy now
                  </Button>
               </div>
            </div>
         </section>
      </>
  );
};

export default Hero;