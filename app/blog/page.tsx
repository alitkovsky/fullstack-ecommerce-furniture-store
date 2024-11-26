import {
    BlogCard,
    PageHeading,
    Pagination
} from '@/app/components'
import blogImg from '@/public/assets/img/blog/1.jpg'
import Search from '@/public/assets/icons/search.svg'
import UpperFooter from '@/app/components/upperfooter'

import Image from "next/image";

const BlogPage: React.FC = () => {
    return (
        <>
            <PageHeading mainhead="Blog" />
            <div className="p-8 lg:p-20 flex flex-col lg:flex-row w-full gap-10 relative">
                <div className="w-full lg:w-9/12 flex flex-col gap-16">
                    <BlogCard />
                    <BlogCard />
                    <BlogCard />
                    <Pagination />
                </div>
                <div className="w-full order-first lg:order-last lg:sticky top-8 self-start lg:w-3/12">
                    <div className="relative mb-6">
                        {/* <BsSearch className='absolute right-3 top-4 text-xl' /> */}
                        <Image className='absolute right-3 top-3' src={Search} alt="search" />
                        <input className="border border-[#9F9F9F] rounded-lg w-full focus:outline-none p-3" type="text" />
                    </div>
                    <div className="flex flex-col gap-20">
                        <div className="px-8">
                            <p className="font-medium text-2xl mb-10">Categories</p>
                            <div className="flex flex-col gap-8">
                                <div className="flex justify-between w-full text-[#9F9F9F]">
                                    <span>Crafts</span>
                                    <span>2</span>
                                </div>
                                <div className="flex justify-between w-full text-[#9F9F9F]">
                                    <span>Design</span>
                                    <span>8</span>
                                </div>
                                <div className="flex justify-between w-full text-[#9F9F9F]">
                                    <span>Handmade</span>
                                    <span>7</span>
                                </div>
                            </div>
                        </div>
                        <div className="px-8">
                            <p className="font-medium text-2xl mb-6">Recent Posts</p>
                            <div className="flex flex-col gap-6">
                                <div className="w-10/12 flex gap-3 items-center">
                                    <Image loading="lazy" className="w-20 h-20 object-cover rounded-lg" src={blogImg} alt="blog" />
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm">Going all-in with millennial design</span>
                                        <span className="text-xs text-[#9F9F9F]">03 Aug 2022</span>
                                    </div>
                                </div>
                                <div className="w-10/12 flex gap-3 items-center">
                                    <Image loading="lazy" className="w-20 h-20 object-cover rounded-lg" src={blogImg} alt="blog" />
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm">Going all-in with millennial design</span>
                                        <span className="text-xs text-[#9F9F9F]">03 Aug 2022</span>
                                    </div>
                                </div>
                                <div className="w-10/12 flex gap-3 items-center">
                                    <Image loading="lazy" className="w-20 h-20 object-cover rounded-lg" src={blogImg} alt="blog" />
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm">Going all-in with millennial design</span>
                                        <span className="text-xs text-[#9F9F9F]">03 Aug 2022</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UpperFooter />
        </>
    )
}

export default BlogPage
