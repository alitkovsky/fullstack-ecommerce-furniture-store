import Adress from '@/public/assets/icons/contact/adress.svg'
import Phone from '@/public/assets/icons/contact/phone.svg'
import Clock from '@/public/assets/icons/contact/clock.svg'

import { PageHeading } from '@/app/components'
import UpperFooter from '@/app/components/upperfooter'

import Image from "next/image";

const ContactPage: React.FC = () => {
    return (
        <>
            <PageHeading mainhead="Contact" />
            <div className="p-8 lg:p-20 flex flex-col items-center w-full">
                <div className="w-full text-center">
                    <h3 className="font-semibold text-4xl mb-3">Get In Touch With Us</h3>
                    <p className="text-[#9F9F9F]">For More Information About Our Product & Services. Please Feel Free To Drop Us <br /> An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
                </div>
                <div className="flex flex-col gap-16 lg:gap-0 lg:flex-row justify-between w-full lg:w-4/5 mt-20">
                    <div className="flex w-full lg:w-4/12 flex-wrap lg:flex-col gap-10 lg:pr-12">
                        <div className="flex gap-4 lg:gap-8 items-start">
                            <Image loading="lazy" src={Adress} alt="adress" />
                            <div className="">
                                <p className="font-medium text-2xl">Address</p>
                                <p>236 5th SE Avenue, New York NY10000, United States</p>
                            </div>
                        </div>
                        <div className="flex gap-4 lg:gap-8 items-start">
                            <Image loading="lazy" src={Phone} alt="phone" />
                            <div className="">
                                <p className="font-medium text-2xl">Phone</p>
                                <p>Mobile: +(84) 546-6789</p>
                                <p>Hotline: +(84) 456-6789</p>
                            </div>
                        </div>
                        <div className="flex gap-4 lg:gap-8 items-start">
                            <Image loading="lazy" src={Clock} alt="clock" />
                            <div className="">
                                <p className="font-medium text-2xl">Working Time</p>
                                <p>Monday-Friday: 9:00 - 22:00</p>
                                <p>Saturday-Sunday: 9:00 - 21:00</p>
                            </div>
                        </div>
                    </div>
                    <form className="lg:px-12 w-full lg:w-3/5 flex flex-col gap-6" action="">
                        <div className="flex flex-col gap-4">
                            <label className="font-medium" htmlFor="name">Your name</label>
                            <input className="border focus:outline-none px-8 py-4 rounded-xl border-[#9F9F9F]" id="name" placeholder="Abc" type="text" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-medium" htmlFor="email">Email address</label>
                            <input className="border focus:outline-none px-8 py-4 rounded-xl border-[#9F9F9F]" id="email" placeholder="Abc@def.com" type="email" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-medium" htmlFor="subject">Subject</label>
                            <input className="border focus:outline-none px-8 py-4 rounded-xl border-[#9F9F9F]" id="subject" placeholder="This is an optional" type="text" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-medium" htmlFor="message">Your name</label>
                            <textarea placeholder="Hi! i’d like to ask about" className="resize-none focus:outline-none border px-8 py-4 rounded-xl border-[#9F9F9F] h-32" id="message"></textarea>
                        </div>
                        <button className="text-white w-fit rounded bg-ochre border border-ochre hover:bg-white hover:text-ochre duration-300 px-16 py-3 mt-6">Submit</button>
                    </form>
                </div>
            </div>
            <UpperFooter />
        </>
    )
}

export default ContactPage
