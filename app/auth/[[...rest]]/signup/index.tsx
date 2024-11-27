"use client";

import { SignUp } from "@clerk/nextjs";

const Signup: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <h2 className="font-semibold text-3xl mb-6">Signup</h2>
            <div className="border rounded-xl bg-white shadow p-6 lg:px-8 lg:py-10">
                <SignUp
                    path="/sign-up"
                    routing="path"
                    signInUrl="/sign-in"
                    appearance={{
                        elements: {
                            card: "w-full",
                            cardContent: "p-4 lg:p-6",
                            socialButtonsIcon: "bg-ochre",
                            input: "border rounded p-2 w-full mb-4",
                            button: "bg-ochre text-white font-semibold p-2 rounded",
                        },
                    }}
                />
            </div>
            <div className="flex flex-col text-center text-xs text-neutral-400 mt-4">
                <span>Already have an account?</span>
                <a href="/sign-in" className="text-ochre underline">
                    Login
                </a>
            </div>
        </div>
    );
};

export default Signup;