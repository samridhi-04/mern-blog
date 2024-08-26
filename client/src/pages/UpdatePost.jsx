import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdatePost = () => {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const { postId } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3000/api/post/updatepost/${postId}/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });
            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }

            if (res.ok) {
                setPublishError(null);
                navigate(`/post/${data.slug}`);
            }
        } catch (error) {
            setPublishError(error.message);
        }
    }

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/post/getposts?postId=${postId}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await res.json();
                if (!res.ok) {
                    console.log(data.message);
                    setPublishError(data.message);
                    return;
                }
                if (res.ok) {
                    setFormData(data.posts[0]);
                    setPublishError(null);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchPost();
    }, [postId]);

    const handleUploadImage = async () => {
        try {
            if (!file) {
                setImageUploadError('Please select an image to upload');
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError(error.message);
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({ ...formData, image: downloadURL });
                    });
                }
            );
        } catch (error) {
            setImageUploadError(error.message);
            setImageUploadProgress(null);
            console.log(error);
        }
    };

    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>
            <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput type="text" placeholder="Title " required id='title' className="flex-1" onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        value={formData.title} />
                    <Select onChange={(e) => setFormData({ ...formData, category: e.target.value })} value={formData.category}>
                        <option value='uncategorized'>Select a category</option>
                        <option value='javascript'>Javascript</option>
                        <option value="reactjs">React.js</option>
                        <option value="nextjs">Next.js</option>
                    </Select>
                </div>
                <div className="flex gap-4 justify-between items-center border-4 border-teal-500 border-dotted p-3">
                    <div className="flex flex-1 gap-4">
                        <FileInput type="file" accept="image/*" className="flex-1" onChange={(e) => setFile(e.target.files[0])} />
                        <Button type="button" className='bg-gradient-to-r from-purple-700 to-blue-500 flex-1' size='sm' onClick={handleUploadImage} disabled={imageUploadProgress}>
                            {imageUploadProgress ? <div className="w-16 h-16"> <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} /></div> : 'Upload Image'}
                        </Button>
                    </div>
                    {imageUploadError && <Alert color='red'>{imageUploadError}</Alert>}
                    {formData.image && <img src={formData.image} alt="upload" className="w-full h-72 object-cover" />}
                </div>
                <ReactQuill theme="snow" placeholder="Write something amazing..." className="h-72 mb-12" required onChange={(value) => { setFormData({ ...formData, content: value }) }} value={formData.content} />
                <Button type="submit" className='bg-gradient-to-r from-purple-700 to-pink-500' >Update Post</Button>
                {publishError && <Alert color='red' className="mt-5">{publishError}</Alert>}
            </form>
        </div>
    );
}

export default UpdatePost;