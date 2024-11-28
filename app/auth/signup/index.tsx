"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";

import { SignupProps } from "@/app/interfaces";

const Signup: React.FC<SignupProps> = ({ setIsLogin }) => {
    return (
        <SignUp.Root>
            <SignUp.Step
                name="start"
                className=""
            >
                <header>
                    <h2 className="font-semibold text-3xl mb-6">Sign up</h2>
                </header>
                <Clerk.GlobalError className="block text-sm text-red-400" />
                <div className="border flex flex-col justify-between min-h-[50vh] rounded-xl p-4 lg:px-8 lg:pt-10 pb-4">
                    <div className="flex flex-col gap-6">
                        <Clerk.Field name="emailAddress" className="space-y-2 text-sm">
                            <Clerk.Label className="font-semibold mb-1">Email address</Clerk.Label>
                            <Clerk.Input
                                type="text"
                                required
                                className="w-full rounded px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-700 hover:ring-zinc-600 focus:bg-transparent focus:ring-[1.5px] focus:ring-blue-400 data-[invalid]:ring-red-400"
                            />
                            <Clerk.FieldError className="block text-sm text-red-400" />
                        </Clerk.Field>
                        <Clerk.Field name="password" className="space-y-2 text-sm">
                            <Clerk.Label className="font-semibold mb-1">Password</Clerk.Label>
                            <Clerk.Input
                                type="password"
                                required
                                className="w-full rounded px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-700 hover:ring-zinc-600 focus:bg-transparent focus:ring-[1.5px] focus:ring-blue-400 data-[invalid]:ring-red-400"
                            />
                            <Clerk.FieldError className="block text-sm text-red-400" />
                        </Clerk.Field>
                        <SignUp.Captcha className="empty:hidden" />
                        <SignUp.Action
                            submit
                            className="relative isolate w-full rounded bg-ochre px-3.5 py-1.5 text-center text-sm font-semibold border-ochre border hover:bg-white hover:text-ochre duration-300 text-white shadow-[0_1px_0_0_theme(colors.white/10%)_inset,0_0_0_1px_theme(colors.white/5%)] outline-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-white/5 before:opacity-0 hover:before:opacity-100 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:text-white/70 active:before:bg-black/10"
                        >
                            Sign Up
                        </SignUp.Action>
                    </div>
                    <div className="flex flex-col text-center text-xs text-neutral-400">
                        <p>Already have an account?{' '}
                        <span onClick={() => setIsLogin(true)} className="text-ochre cursor-pointer">Login</span>
                        </p>
                    </div>
                </div>
            </SignUp.Step>
        </SignUp.Root>
    )
};

export default Signup;