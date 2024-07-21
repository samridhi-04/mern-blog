import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <div className='min-h-screen mt-20'>
            <div className="flex p-3 gap-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
                {/* Left Side */}
                <div className="flex-1">
                    <Link to="/" className='font-bold dark:text-white flex text-4xl'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Samridhis</span> Blog
                    </Link>
                    <p className="text-sm mt-5">This is a demo project and you can sign up with your email and password or with Google.</p>
                </div>
                {/* Right Side */}
                <div className="flex-1">
                    <form className="flex flex-col gap-4">
                        <div>
                            <Label htmlFor="username">Your Username</Label>
                            <TextInput type="text" placeholder="Username" id="username" />
                        </div>
                        <div>
                            <Label htmlFor="email">Your Email</Label>
                            <TextInput type="email" placeholder="name@company.com" id="email" />
                        </div>
                        <div>
                            <Label htmlFor="password">Your Password</Label>
                            <TextInput type="password" placeholder="Password" id="password" />
                        </div>
                        <Button gradientDuoTone="purpleToPink" type="submit">Sign Up</Button>
                    </form>
                    <div className="flex gap-2 mt-5 text-sm"> 
                        <span>Have an account?</span>
                        <Link to="sign-in" className="text-blue-500">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
