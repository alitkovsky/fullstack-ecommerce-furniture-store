import Filtering from '@/public/assets/icons/filter/filtering.svg'
import GridRound from '@/public/assets/icons/filter/grid-round.svg'
import ViewList from '@/public/assets/icons/filter/view-list.svg'

import Image from "next/image"

const FilterBar: React.FC = () => {
    return (
        <div className="bg-[#F9F1E7] p-8 lg:px-20 lg:py-10 flex flex-col sm:flex-row w-full justify-between">
            <div className="flex flex-col sm:flex-row mb-6 sm:mb-0 flex-wrap items-center gap-4">
                <div className="flex flex-wrap items-center gap-5 pr-8 md:border-r-2 md:border-[#9F9F9F]">
                    <button className='flex items-center gap-2'><Image loading="lazy" src={Filtering} alt="filtering" /> Filter</button>
                    <button><Image loading="lazy" src={GridRound} alt="grid-round" /></button>
                    <button><Image loading="lazy" src={ViewList} alt="view-list" /></button>
                </div>
                <div className="md:pl-4">
                    <span>Showing 1–16 of 32 results</span>
                </div>
            </div>
            <div className="flex gap-2 md:gap-0 flex-col md:flex-row">
                <div className="flex items-center flex-row justify-between sm:justify-start">
                    <label htmlFor='show' className='mr-4'>Show</label>
                    <input id='show' className='w-10 h-10 p-1 sm:mr-6 focus:outline-none' placeholder='16' type="number" />
                </div>
                <div className="flex flex-row items-center justify-between sm:justify-start">
                    <label htmlFor='shortby' className='mr-4'>Short by</label>
                    <select id='shortby' className='p-3 w-44 focus:outline-none appearance-none' defaultValue='default'>
                        <option value="default">Default</option>
                        <option value="second">Second</option>
                        <option value="third">Third</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default FilterBar
