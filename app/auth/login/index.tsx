"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-up";

import { LoginProps } from "@/app/interfaces";

const Login: React.FC<LoginProps> = ({ setIsLogin }) => {
    return (
        <SignIn.Root>
            <SignIn.Step
                name="start"
                className=""
            >
                <header>
                    <h2 className="font-semibold text-3xl mb-6">Sign in</h2>
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
                        <SignIn.Captcha className="empty:hidden" />
                        <SignIn.Action
                            submit
                            className="relative isolate w-full rounded bg-ochre px-3.5 py-1.5 text-center text-sm font-semibold border-ochre border hover:bg-white hover:text-ochre duration-300 text-white shadow-[0_1px_0_0_theme(colors.white/10%)_inset,0_0_0_1px_theme(colors.white/5%)] outline-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-white/5 before:opacity-0 hover:before:opacity-100 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:text-white/70 active:before:bg-black/10"
                        >
                            Sign In
                        </SignIn.Action>
                        <div>
                            <div className="mb-6 mt-6 flex items-center justify-center">
                                <div aria-hidden="true" className="h-px w-full bg-slate-300" data-orientation="horizontal" role="separator"></div>
                                <span className="mx-4 text-xs text-slate-11 font-normal">OR</span>
                                <div aria-hidden="true" className="h-px w-full bg-slate-300" data-orientation="horizontal" role="separator"></div>
                            </div>
                            <div className="space-y-2">
                                <Clerk.Connection
                                    name="github"
                                    className="flex w-full items-center justify-center gap-x-3 rounded-md bg-gradient-to-b from-white to-neutral-50 px-2 py-1.5 text-sm font-medium text-neutral-950 shadow outline-none ring-1 ring-black/5 hover:to-neutral-100 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 active:text-neutral-950/60"
                                >
                                    <svg className="-ml-1" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4C7.58267 4 4 7.67255 4 12.2022C4 15.8263 6.292 18.9007 9.47133 19.9855C9.87067 20.0614 10 19.8071 10 19.5911V18.0641C7.77467 18.5603 7.31133 17.0962 7.31133 17.0962C6.94733 16.1482 6.42267 15.896 6.42267 15.896C5.69667 15.3868 6.478 15.3977 6.478 15.3977C7.28133 15.4551 7.704 16.2432 7.704 16.2432C8.41733 17.4968 9.57533 17.1345 10.032 16.9247C10.1033 16.395 10.3107 16.0327 10.54 15.8283C8.76333 15.6198 6.89533 14.9165 6.89533 11.7744C6.89533 10.8783 7.208 10.1469 7.71933 9.57274C7.63667 9.36563 7.36267 8.53106 7.79733 7.40188C7.79733 7.40188 8.46933 7.18179 9.998 8.24261C10.636 8.06079 11.32 7.96989 12 7.96647C12.68 7.96989 13.3647 8.06079 14.004 8.24261C15.5313 7.18179 16.202 7.40188 16.202 7.40188C16.6373 8.53174 16.3633 9.36632 16.2807 9.57274C16.794 10.1469 17.104 10.8789 17.104 11.7744C17.104 14.9247 15.2327 15.6185 13.4513 15.8215C13.738 16.0758 14 16.5747 14 17.3403V19.5911C14 19.8091 14.128 20.0655 14.534 19.9848C17.7107 18.8987 20 15.8249 20 12.2022C20 7.67255 16.418 4 12 4Z" fill="currentColor"></path></svg>
                                    Login with GitHub
                                </Clerk.Connection>
                                <Clerk.Connection
                                    name="google"
                                    className="flex w-full items-center justify-center gap-x-3 rounded-md bg-gradient-to-b from-white to-neutral-50 px-2 py-1.5 text-sm font-medium text-neutral-950 shadow outline-none ring-1 ring-black/5 hover:to-neutral-100 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 active:text-neutral-950/60"
                                >
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 16 16"
                                    aria-hidden
                                    className="size-4"
                                    >
                                    <g clipPath="url(#a)">
                                        <path
                                        fill="currentColor"
                                        d="M8.32 7.28v2.187h5.227c-.16 1.226-.57 2.124-1.192 2.755-.764.765-1.955 1.6-4.035 1.6-3.218 0-5.733-2.595-5.733-5.813 0-3.218 2.515-5.814 5.733-5.814 1.733 0 3.005.685 3.938 1.565l1.538-1.538C12.498.96 10.756 0 8.32 0 3.91 0 .205 3.591.205 8s3.706 8 8.115 8c2.382 0 4.178-.782 5.582-2.24 1.44-1.44 1.893-3.475 1.893-5.111 0-.507-.035-.978-.115-1.369H8.32Z"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="a">
                                        <path fill="#fff" d="M0 0h16v16H0z" />
                                        </clipPath>
                                    </defs>
                                    </svg>
                                    Login with Google
                                </Clerk.Connection>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col text-center text-xs text-neutral-400">
                        <p>Don&apos;t have an account?{' '}
                        <span onClick={() => setIsLogin(false)} className="text-ochre cursor-pointer">Sign up</span>
                        </p>
                    </div>
                </div>
            </SignIn.Step>
        </SignIn.Root>
    )
};

export default Login;