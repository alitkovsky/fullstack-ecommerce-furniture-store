"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";

import { motion, AnimatePresence } from "framer-motion";

import { SignupProps } from "@/app/interfaces";

const Signup: React.FC<SignupProps> = ({ setIsLogin }) => {
    return (
        <SignUp.Root>
            <SignUp.Step
                name="start"
                className="border flex flex-col justify-between min-h-[50vh] rounded-xl p-4 lg:px-8 lg:pt-10 pb-4"
            >
                <header className="self-center">
                    <h2 className="font-semibold text-3xl">Sign up</h2>
                </header>
                <Clerk.GlobalError className="block text-sm text-red-400" />
                <div className="flex flex-col gap-6">
                    <Clerk.Field name="emailAddress" className="space-y-2 text-sm">
                        <Clerk.Label className="font-semibold mb-1">Email address</Clerk.Label>
                        <Clerk.Input
                            type="text"
                            required
                            className="w-full rounded px-3.5 py-2 text-sm outline-hidden ring-1 ring-inset ring-zinc-700 hover:ring-zinc-600 focus:bg-transparent focus:ring-[1.5px] focus:ring-blue-400 data-invalid:ring-red-400"
                        />
                        <Clerk.FieldError className="block text-sm text-red-400" />
                    </Clerk.Field>
                    <Clerk.Field name="password" className="space-y-2 text-sm">
                        <Clerk.Label className="font-semibold mb-1">Password</Clerk.Label>
                        <Clerk.Input
                            type="password"
                            required
                            className="w-full rounded px-3.5 py-2 text-sm outline-hidden ring-1 ring-inset ring-zinc-700 hover:ring-zinc-600 focus:bg-transparent focus:ring-[1.5px] focus:ring-blue-400 data-invalid:ring-red-400"
                        />
                        <Clerk.FieldError className="block text-sm text-red-400" />
                    </Clerk.Field>
                    <SignUp.Action
                        submit
                        className="relative isolate w-full rounded bg-ochre px-3.5 py-1.5 text-center text-sm font-semibold border-ochre border hover:bg-white hover:text-ochre duration-300 text-white shadow-[0_1px_0_0_--theme(--color-white/10%)_inset,0_0_0_1px_--theme(--color-white/5%)] outline-hidden before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-white/5 before:opacity-0 hover:before:opacity-100 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:text-white/70 active:before:bg-black/10"
                    >
                        Sign Up
                    </SignUp.Action>
                </div>
                <div className="flex flex-col text-center text-xs text-neutral-400">
                    <p>Already have an account?{' '}
                    <span onClick={() => setIsLogin(true)} className="text-ochre cursor-pointer">Login</span>
                    </p>
                </div>
            </SignUp.Step>
            <SignUp.Step
                name="verifications"
                className="border flex flex-col justify-between min-h-[50vh] rounded-xl p-4 lg:px-8 lg:pt-10 pb-4"
            >
                <header>
                    <h2 className="font-semibold text-3xl">Sign up</h2>
                    <h3>Please check your email</h3>
                </header>
                <Clerk.GlobalError className="block text-sm text-red-400" />
                <div className="flex flex-col gap-6">
                    <SignUp.Strategy name="email_code">
                        <Clerk.Field name="code" className="space-y-2">
                        <Clerk.Label className="text-sm font-medium text-white">Email code</Clerk.Label>
                        <Clerk.Input
                            type="otp"
                            required
                            className="flex justify-center gap-1"
                            render={({ value, status }) => (
                                <div
                                data-status={status}
                                className="relative h-9 w-8 rounded ring-1 ring-inset ring-zinc-300 data-[status=selected]:bg-sky-400/10 data-[status=selected]:shadow-[0_0_8px_2px_--theme(--color-sky-400/30%)] data-[status=selected]:ring-ochre"
                                >
                                <AnimatePresence>
                                    {value && (
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.75 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.75 }}
                                        className="absolute inset-0 flex items-center justify-center text-zinc-950"
                                    >
                                        {value}
                                    </motion.span>
                                    )}
                                    {value}
                                </AnimatePresence>
                                {status === 'cursor' && (
                                    <motion.div
                                    layoutId="otp-input-focus"
                                    transition={{ ease: [0.2, 0.4, 0, 1], duration: 0.2 }}
                                    className="absolute inset-0 z-10 rounded border border-ochre bg-sky-400/10 shadow-[0_0_8px_2px_--theme(--color-sky-400/30%)]"
                                    />
                                )}
                                </div>
                            )}
                        />
                        <Clerk.FieldError className="block text-sm text-red-400" />
                        </Clerk.Field>
                        <SignUp.Action
                        submit
                        className="relative isolate w-full rounded bg-ochre px-3.5 py-1.5 text-center text-sm font-semibold border-ochre border hover:bg-white hover:text-ochre duration-300 text-white shadow-[0_1px_0_0_--theme(--color-white/10%)_inset,0_0_0_1px_--theme(--color-white/5%)] outline-hidden before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-white/5 before:opacity-0 hover:before:opacity-100 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:text-white/70 active:before:bg-black/10"
                        >
                            Verify
                        </SignUp.Action>
                        <SignUp.Action
                            resend
                            fallback={({ resendableAfter }) => <p>Resend code in {resendableAfter} second(s)</p>}
                        >
                            Resend code
                        </SignUp.Action>
                    </SignUp.Strategy>
                </div>
                <div className="flex flex-col text-center text-xs text-neutral-400">
                    <p>Already have an account?{' '}
                    <span onClick={() => setIsLogin(true)} className="text-ochre cursor-pointer">Login</span>
                    </p>
                </div>
            </SignUp.Step>
            <SignUp.Step
                name="continue"
                className="w-full space-y-6 rounded-2xl bg-white px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8"
            >
                <header>
                    <h2 className="font-semibold text-3xl">Sign up</h2>
                    <h3>Continue registration</h3>
                </header>
                <Clerk.GlobalError className="block text-sm text-red-400" />
                <div className="flex flex-col gap-6">
                    <Clerk.Field name="username" className="space-y-2 text-sm">
                        <Clerk.Label className="font-semibold">Username</Clerk.Label>
                        <Clerk.Input
                            type="text"
                            required
                            className="w-full rounded px-3.5 py-2 text-sm outline-hidden ring-1 ring-inset ring-zinc-700 hover:ring-zinc-600 focus:bg-transparent focus:ring-[1.5px] focus:ring-blue-400 data-invalid:ring-red-400"
                        />
                        <Clerk.FieldError className="block text-sm text-red-400" />
                    </Clerk.Field>
                    <SignUp.Action
                        submit
                        className="w-full rounded-md bg-zinc-950 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow-sm outline-hidden ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70"
                    >
                        Continue
                    </SignUp.Action>
                    <p className="text-center text-sm text-zinc-500">
                        Already have an account?{' '}
                        <Clerk.Link
                        navigate="sign-in"
                        className="font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-hidden hover:text-zinc-700 hover:underline focus-visible:underline"
                        >
                        Sign in
                        </Clerk.Link>
                    </p>
                </div>
                <div className="flex flex-col text-center text-xs text-neutral-400">
                    <p>Already have an account?{' '}
                    <span onClick={() => setIsLogin(true)} className="text-ochre cursor-pointer">Login</span>
                    </p>
                </div>
            </SignUp.Step>
        </SignUp.Root>
    )
};

export default Signup;