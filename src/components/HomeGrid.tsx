import Image from "next/image";

import Image2 from "/public/assets/img/grid/2.png";
import Image3 from "/public/assets/img/grid/3.png";
import Image4 from "/public/assets/img/grid/4.png";
import Image5 from "/public/assets/img/grid/5.png";

export default function HomeGrid() {
    return (
        <div className="py-8 lg:py-20">
            <p className="font-semibold text-[#616161] text-center lg:text-xl">Share your setup with</p>
            <h2 className="font-bold text-[#3A3A3A] text-2xl lg:text-4xl text-center">#FuniroFurniture</h2>
            <div className="overflow-hidden flex flex-col items-center">
                <div className="homegrid h-[90vh] gap-2 lg:gap-4 min-w-[150vh]">
                    <Image loading="lazy" className="h-full w-full object-cover" src={Image5} alt="grid-Image" />
                    <Image loading="lazy" className="h-full w-full object-cover" src={Image3} alt="grid-Image" />
                    <Image loading="lazy" className="h-full w-full object-cover" src={Image5} alt="grid-Image" />
                    <Image loading="lazy" className="h-full w-full object-cover" src={Image3} alt="grid-Image" />
                    <Image loading="lazy" className="h-full w-full object-cover" src={Image3} alt="grid-Image" />
                    <Image loading="lazy" className="h-full w-full object-cover" src={Image4} alt="grid-Image" />
                    <Image loading="lazy" className="h-full w-full object-cover" src={Image4} alt="grid-Image" />
                    <Image loading="lazy" className="h-full w-full object-cover" src={Image3} alt="grid-Image" />
                    <Image loading="lazy" className="h-full w-full object-cover" src={Image2} alt="grid-Image" />
                </div>
            </div>

        </div>
    )
};