import { LoginProps } from "@/app/interfaces"

const Login: React.FC<LoginProps> = ({ setIsLogin }) => {
    return (
        <>
            <h2 className='font-semibold text-3xl mb-6'>Login</h2>
            <div className="border flex flex-col justify-between min-h-[60vh] rounded-xl p-4 lg:px-8 lg:pt-10 pb-4">
                <div className="flex flex-col gap-6">

                    <div className="flex flex-col text-sm">
                        <label className=' font-semibold mb-1' htmlFor="email">Email</label>
                        <input className='border rounded p-2' placeholder='Type your email' id='email' type="email" />
                    </div>
                    <div className="flex flex-col text-sm">
                        <label className=' font-semibold mb-1' htmlFor="password">Password</label>
                        <input className='border rounded p-2' placeholder='Type your password' id='password' type="password" />
                    </div>
                    <div className="text-xs flex justify-between">
                        <div className=" flex items-center gap-1">
                            <input id='remember' type="checkbox" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <span className='cursor-pointer'>Forgot password?</span>
                    </div>
                    <button className='bg-ochre border font-semibold border-ochre hover:bg-white hover:text-ochre duration-300 text-white p-2 rounded'>Log in</button>
                </div>
                <div className="flex flex-col text-center text-xs text-neutral-400">
                    <span>Don&apos;t have an account?</span>
                    <span onClick={() => setIsLogin(false)} className='text-ochre cursor-pointer'>Signup</span>
                </div>
            </div>
        </>
    )
}

export default Login