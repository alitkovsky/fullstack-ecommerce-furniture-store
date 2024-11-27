"use client";

import { SignIn } from "@clerk/nextjs";

const Login: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <h2 className="font-semibold text-3xl mb-6">Login</h2>
            <div className="border rounded-xl bg-white shadow p-6 lg:px-8 lg:py-10">
                <SignIn
                    path="/sign-in"
                    routing="path"
                    signUpUrl="/sign-up"
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
                <span>Don’t have an account?</span>
                <a href="/sign-up" className="text-ochre underline">
                    Signup
                </a>
            </div>
        </div>
    );
};

export default Login;