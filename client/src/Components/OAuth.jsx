import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInsuccess  } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
const OAuth = () => {
    const auth = getAuth(app);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick =async () => {
        
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        try {
            const resultFromGoogle = await signInWithPopup(auth, provider);
            const res = await fetch('http://localhost:3000/api/auth/google ',{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify({
                    name:resultFromGoogle.user.displayName,
                    email: resultFromGoogle.user.email,
                    googlePhotoUrl:resultFromGoogle.user.photoURL
                })
    
            })
            const data =await res.json();
            if(res.ok){
                dispatch(signInsuccess(data))
                navigate('/');
    
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <Button type="button" className="flex items-center text-white font-bold bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 focus:outline-none" onClick={handleGoogleClick}>
             <AiFillGoogleCircle className="w-6 h-6 mr-2" /> Continue with Google
        </Button>
    );
}

export default OAuth;
