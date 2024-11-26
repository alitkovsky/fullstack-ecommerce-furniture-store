import Link from "next/link";
import Image from "next/image";

import blogImg from '@/public/assets/img/blog/1.jpg'
import tag from '@/public/assets/icons/blog/tag.svg'
import user from '@/public/assets/icons/blog/user.svg'
import calendar from '@/public/assets/icons/blog/calendar.svg'

const BlogCard: React.FC = () => {
    return (
        <div>
            <Image loading="lazy" className='rounded-xl' src={blogImg} alt="blog" />
            <div className="flex text-sm lg:text-base justify-between lg:justify-start lg:gap-8 py-6 text-[#9F9F9F]">
                <span className='flex items-center gap-1'>
                    <Image loading="lazy" src={user} alt="user" />
                    Admin
                </span>
                <span className='flex items-center gap-1'>
                    <Image loading="lazy" src={calendar} alt="calendar" />
                    14 Oct 2022
                </span>
                <span className='flex items-center gap-1'>
                    <Image loading="lazy" src={tag} alt="tag" />
                    Wood
                </span>
            </div>
            <div className="mb-6">
                <h3 className='font-medium text-2xl lg:text-3xl mb-4'>Going all-in with millennial design</h3>
                <p className='text-[#9F9F9F]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.</p>
            </div>
            <Link className='relative after:absolute after:bg-black after:h-[1px] after:w-[60%] after:-bottom-3 after:left-4 hover:after:w-full hover:after:left-0 after:duration-300 hover:after:h-1 hover:font-bold duration-300' href='#'>Read more</Link>
        </div>
    )
};

export default BlogCard;