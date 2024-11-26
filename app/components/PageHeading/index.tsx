import Link from "next/link";
import Image from "next/image";

import Arrow from '@/public/assets/icons/arrow-to-right.svg'
import Icon from '@/public/assets/website-icon/small-icon.png'
import Search from '@/public/assets/icons/search.svg'
import { PageHeadingProps } from "@/app/interfaces";

const PageHeading: React.FC<PageHeadingProps> = ({ mainhead, subhead = mainhead }) => {
    return (
        <div className="relative">
            <div className="absolute inset-0 z-10 backdrop-blur-sm bg-white bg-opacity-25"></div>
            <div className="text-black flex justify-center pb-6 lg:pb-0 items-end lg:items-center h-[24vh] lg:h-[40vh] bg-center bg-no-repeat bg-cover bg-[url(/page-heading/background.jpg)]">
                <div className="relative w-full gap-4 flex flex-col items-center z-20 px-8">
                    <Image loading="lazy" className="w-fit" src={Icon} alt="icon" />
                    <h2 className="z-20 font-medium text-3xl lg:text-5xl">{mainhead}</h2>

                    {
                        mainhead !== 'Search' ?
                            <div className="z-20 flex gap-1">
                                <Link className="font-medium" href='/'>Home</Link>
                                <Image loading="lazy" src={Arrow} alt="arrow" />
                                <span>{subhead}</span>
                            </div> :
                            <div className="relative">
                                <input className="focus:outline-none px-4 py-2 rounded-lg w-full sm:w-[500px] pr-11" placeholder="Search for product..." type="text" name="" id="" />
                                <Image className="absolute top-2 right-3 w-6 opacity-60 bg-white" src={Search} alt="search" />
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default PageHeading
