"use client";

import { useState } from 'react'
import img from '@/public/assets/img/hero-bg.png'
import {
    Login,
    Signup
} from '@/app/pages';

import Image from "next/image";

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false)
    return (
        <div className="bg-[#FFF3E3] overflow-x-hidden flex flex-col justify-center items-center p-8 lg:p-20">
            <div className="flex shadow-lg w-full lg:max-w-[900px] bg-white">
                <div className={`bg-white w-full lg:w-1/2 p-8 lg:p-10 lg:px-16 duration-300 ${!isLogin ? 'lg:translate-x-[100%]' : 'lg:translate-x-0'}`}>
                    {isLogin ?
                        <Login setIsLogin={setIsLogin} /> :
                        <Signup setIsLogin={setIsLogin} />
                    }

                </div>
                <div className="hidden lg:block lg:w-1/2">
                    <Image loading="lazy" className={`h-full w-full object-cover object-center duration-300 ${!isLogin ? 'lg:translate-x-[-100%]' : 'lg:translate-x-0'}`} src={img} alt="image" />
                </div>
            </div>
        </div>
    )
}

export default AuthPage
