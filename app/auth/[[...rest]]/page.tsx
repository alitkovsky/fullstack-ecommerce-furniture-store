"use client";

import { SignIn, SignUp } from "@clerk/nextjs";
import img from "@/public/assets/img/hero-bg.png";
import Image from "next/image";
import { useState } from "react";

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);

    return (
        <div className="bg-[#FFF3E3] overflow-x-hidden flex flex-col justify-center items-center p-8 lg:p-20">
            <div className="flex shadow-lg w-full lg:max-w-[900px] bg-white">
                <div className="w-full lg:w-1/2 p-8 lg:p-10 lg:px-16">
                    {isLogin ? (
                        <SignIn
                            path="/sign-in"
                            routing="path"
                            signUpUrl="/sign-up"
                            appearance={{
                                elements: {
                                    card: "w-full",
                                    input: "border rounded p-2 w-full mb-4",
                                    button: "bg-ochre text-white font-semibold p-2 rounded",
                                },
                            }}
                        />
                    ) : (
                        <SignUp
                            path="/sign-up"
                            routing="path"
                            signInUrl="/sign-in"
                            appearance={{
                                elements: {
                                    card: "w-full",
                                    input: "border rounded p-2 w-full mb-4",
                                    button: "bg-ochre text-white font-semibold p-2 rounded",
                                },
                            }}
                        />
                    )}
                </div>
                <div className="hidden lg:block lg:w-1/2">
                    <Image
                        loading="lazy"
                        className={`h-full w-full object-cover object-center duration-300 ${
                            !isLogin ? "lg:translate-x-[-100%]" : "lg:translate-x-0"
                        }`}
                        src={img}
                        alt="image"
                    />
                </div>
            </div>
            <button
                onClick={() => setIsLogin(!isLogin)}
                className="mt-4 text-ochre underline text-sm"
            >
                {isLogin ? "Go to Signup" : "Go to Login"}
            </button>
        </div>
    );
};

export default AuthPage;