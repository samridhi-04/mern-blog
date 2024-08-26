import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../Components/OAuth";

const SignUp = () => {
    const [formData, setFormData] =useState({});
    const [errorMessage,setErrorMessage] = useState(null);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
       setFormData({...formData,[e.target.id]:e.target.value.trim()});}
       

       const handleSubmit = async(e) => {
        if(!formData.username||!formData.email||!formData.password){
            return setErrorMessage('Please fill out all the feilds');
        }
         e.preventDefault();
         try {
            setLoading(true);
            setErrorMessage(null);
            const res = await fetch('http://localhost:3000/api/auth/signup',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(formData),
                credentials:'include'
            });
            const data = await res.json();
            if(data.success ===false){
                return setErrorMessage(data.message)
            }
            setLoading(false);
            if(res.ok){
                navigate('/sign-in')
            }


            
         } catch (error) {
            setErrorMessage(error.message);
            setLoading(false);
         }
       }
    return (
        <div className='min-h-screen mt-20'>
            <div className="flex p-3 gap-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
                {/* left */}
                <div className="flex-1">
                <Link to="/" className='font-bold dark:text-white flex text-4xl'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Samridhis</span> Blog
                    </Link>
                    <p className="text-sm mt-5">This is a demo project and you can sign up with your email and password or with Google.</p>
                </div>
                {/* right */}
                <div className="flex-1">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                            <Label htmlFor="username">Your Username</Label>
                            <TextInput type="text" placeholder="Username" id="username" onChange={handleChange}  />
                        </div>
                        <div>
                            <Label htmlFor="email">Your Email</Label>
                            <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange}  />
                        </div>
                        <div>
                            <Label htmlFor="password">Your Password</Label>
                            <TextInput type="password" placeholder="Password" id="password" onChange={handleChange}  />
                        </div>
                        <Button className='flex text-white font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500' gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
                        {loading?(<>
                            <Spinner size='sm'/>
                            <span className="pl-3">Loading...</span>
                            </>):'Sign-Up'}
                        </Button>
                        <OAuth />
                    </form>
                    <div className="flex gap-2 mt-5 text-sm">
                        <span>Have an account?</span>
                         <Link to="/sign-in" className="text-blue-500">Sign In</Link>

                    </div>
                    {
    errorMessage && (
        <Alert className="mt-5 bg-red-100 text-red-500">
            {errorMessage}
        </Alert>
    )
}

                </div>
            </div>
        </div>
    );
}

export default SignUp;
