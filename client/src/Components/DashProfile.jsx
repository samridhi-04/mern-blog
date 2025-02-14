import { useSelector, useDispatch } from 'react-redux';
import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateFailure, updateStart, updateSuccess ,deleteUserStart,deleteUserSuccess,deleteUserFailure,SignoutSucess} from '../redux/user/userSlice.js';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
const DashProfile = () => {
    const { currentUser,error,loading } = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(null);
    const [uploadUserSuccess, setUploadUserSuccess] = useState(null);
    const [uploadUserError, setUploadUserError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const filePickerRef = useRef();
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploadUserError(null);
        setUploadUserSuccess(null);
        if (Object.keys(formData).length === 0) {
            setUploadUserError('No changes made');
            return;
        }
        if (imageFileUploading) {
            setUploadUserError('Please wait until image is uploaded');
            return;
        }
        
        try {
            dispatch(updateStart());
            const res = await fetch(`http://localhost:3000/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                  
                },
                body: JSON.stringify(formData),
                credentials: 'include', 
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(updateFailure(data.message));
                setUploadUserError(data.message);
            } else {
                dispatch(updateSuccess(data));
                setUploadUserSuccess("User updated successfully");
            }
        } catch (error) {
            dispatch(updateFailure(error.message));
            setUploadUserError(error.message);
        }
    };

    const uploadImage = async () => {
        imageFileUploading(true);
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError('Could not upload image (File must be less than 2MB)');
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
                setImageFileUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setFormData({ ...formData, profilePicture: downloadURL });
                    setImageFileUploading(false);
                });
            }
        );
    };
    const handleDeleteUser = async () => {
        setShowModal(false);
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`http://localhost:3000/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(deleteUserFailure(data.message));
            } else {
                dispatch(deleteUserSuccess());}
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    }
    const handleSignout = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/user/signout', {
                method: 'POST',
                credentials: 'include',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            }else{
                dispatch(SignoutSucess()); 
            }
        } catch (error) {
            console.log(error.message);
        }
    }
       
    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
                <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative' onClick={() => {
                    filePickerRef.current.click();
                }}>
                    {imageFileUploadProgress && (
                        <CircularProgressbar
                            value={imageFileUploadProgress || 0}
                            text={`${imageFileUploadProgress}%`}
                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                },
                                path: {
                                    stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                                },
                            }}
                        />
                    )}
                    <img src={imageFileUrl || currentUser.profilePicture} alt='profile' className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`} />
                </div>
                {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}

                <TextInput
                    type='text'
                    id='username'
                    placeholder='username'
                    defaultValue={currentUser.username} onChange={handleChange}
                />
                <TextInput
                    type='email'
                    id='email'
                    placeholder='email'
                    defaultValue={currentUser.email} onChange={handleChange}
                />
                <TextInput type='password' id='password' placeholder='password' onChange={handleChange} />
                <Button type='submit' className='bg-gradient-to-r from-purple-700 to-blue-500' disabled={loading||imageFileUploading} >
                    {loading ? 'Loading...' : 'Update'}
                </Button>
                
                {
                    currentUser.isAdmin && (
                        <Link to={'/create-post'}>
                            <Button type='button' className='bg-gradient-to-r from-red-700 to-yellow-500 w-full'>Create a Post</Button>
                </Link>
                        
                    )
                }
            </form>
            <div className='text-red-500 flex justify-between mt-5'>
                <span className='cursor-pointer' onClick={()=>setShowModal(true)}>Delete Account</span>
                <span className='cursor-pointer' onClick={handleSignout}>Sign Out</span>
            </div>
            {uploadUserSuccess && <Alert color='green' className='mt-5'>{uploadUserSuccess}</Alert>}
            {uploadUserError && <Alert color='red' className='mt-5'>{uploadUserError}</Alert>}
            {error && <Alert color='red' className='mt-5'>{error}</Alert>}
            <Modal show ={showModal} onClose={()=>setShowModal(false)} popup size='md' >
                <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto "/>
                        <h3 className='mb-5 text:lg text-gray-500 dark:text-gray-400 '>Are you sure you want to delete your account? </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='red' onClick={handleDeleteUser}>yes I'm sure</Button>
                            <Button color='gray' onClick={()=>setShowModal(false)}>No,cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default DashProfile;