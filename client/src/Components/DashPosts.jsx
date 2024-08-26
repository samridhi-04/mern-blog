import { Modal, Table ,Button} from "flowbite-react";
import { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
const DashPosts = () => {
    const {currentUser} = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');
    

    useEffect(() => {
        const fetchPosts = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/post/getposts?userId=${currentUser._id}`,{
                method: 'GET',
                credentials: 'include',
            });
            const data = await res.json();
            if (res.ok) {
                if(data.posts.length < 10) {
                    setShowMore(false);
                }
                setUserPosts(data.posts);
            }

        } catch (error) {
            console.log(error.message);
        }
        }
        if (currentUser.isAdmin) {
            fetchPosts();
        }
    },[currentUser._id]);
    const handleShowMore = async () => {
        const startIndex = userPosts.length;
        try {
            const res = await fetch(`http://localhost:3000/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`,{
                method: 'GET',
                credentials: 'include',
            });
            const data = await res.json();
            if(res.ok) {
            setUserPosts((prev) => [...prev, ...data.posts]);
            if(data.posts.length < 10) {
                setShowMore(false);
            }
        }
        } catch (error) {
            console.log(error.message);
        }
    }
    const handleDeletePost = async () => {
        setShowModal(false);
        try {
            const res = await fetch(`http://localhost:3000/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,{
                method: 'DELETE',
                credentials: 'include',
            });
            const data = await res.json();
            if(!res.ok) {
                console.log(data.message);
            }else{
                setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
            }
        } catch (error) {
            console.log(error.message);
        }

    }
    return (
        <div className="table-auto overflow-x-scroll md:mx-auto p-3
        scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700  dark:scrollbar-thumb-slate-500 ">
           {currentUser.isAdmin && userPosts.length > 0 ? (
            <>
            <table  className="shadow-md w-full text-left border-collapse">
                <thead>
                    <tr className="text-bg-gray-200">
                        <th className="p-4 border b-2 border-gray-300">Date Updated</th>
                        <th className="p-4 border b-2 border-gray-300">Post image</th>
                        <th className="p-4 border b-2 border-gray-300">Post title</th>
                        <th className="p-4 border b-2 border-gray-300">Category</th>
                        <th className="p-4 border b-2 border-gray-300">Delete</th>
                        <th className="p-4 border b-2 border-gray-300"><span>Edit</span></th>
                    </tr>
                </thead>
                {userPosts.map((post) => (
                        <tbody key={post._id}>
                            <tr>
                                <td className="p-4 border-b-2 border-gray-300">{new Date(post.updatedAt).toLocaleDateString()}</td>
                                <td className="p-4 border-b-2 border-gray-300"><Link to={`/post/${post.slug}`}><img src={post.image} alt={post.title} className="w-20 h-20 object-cover" /></Link></td>
                                <td className="p-4 border-b-2 border-gray-300"><Link to={`/post/${post.slug}`}>{post.title}</Link></td>
                                <td className="p-4 border-b-2 border-gray-300">{post.category}</td>
                                <td className="p-4 border-b-2 border-gray-300"><span className="font-medium text-red-500 hover:underline cursor-pointer" onClick={()=>{
                                    setShowModal(true); setPostIdToDelete(post._id); 
                                }}>Delete</span></td>
                                <td className="p-4 border-b-2 border-gray-300"><Link to={`/update-post/${post._id}`} className="text-teal-500 hover:underline"><span>Edit</span></Link></td>
                            </tr>
                        </tbody>
                    ))}

            </table>
            {showMore && (
                        <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">Show more</button>
                    )}
            </>
            
           ):(
            <p>You have no post yet </p>
           )}
           <Modal show ={showModal} onClose={()=>setShowModal(false)} popup size='md' >
                <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-teal-500 dark:text-gray-200 mb-4 mx-auto "/>
                        <h3 className='mb-5 text:lg text-gray-900 dark:text-gray-400 '>Are you sure you want to delete this post? </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='red' className="bg-red-500" onClick={handleDeletePost}>yes I'm sure</Button>
                            <Button color='gray' className='bg-gray-500'onClick={()=>setShowModal(false)}>No,cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal> 
        </div>
    );
}

export default DashPosts;
