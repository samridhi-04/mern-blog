import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

const DashComments = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [commentIdToDelete, setCommentIdToDelete] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/comment/getcomments`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await res.json();
                if (res.ok) {
                    if (data.comments.length < 10) {
                        setShowMore(false);
                    }
                    setComments(data.comments);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if (currentUser.isAdmin) {
            fetchComments();
        }
    }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = comments.length;
        try {
            const res = await fetch(`http://localhost:3000/api/comment/getcomments?startIndex=${startIndex}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await res.json();
            if (res.ok) {
                setComments((prev) => [...prev, ...data.comments]);
                if (data.comments.length < 10) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDeleteComment = async () => {
        setShowModal(false)
        try {
            const res = await fetch(`http://localhost:3000/api/comment/deleteComment/${commentIdToDelete}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            const data = await res.json();
            if (res.ok) {
                setComments(comments.filter((comment) => comment._id !== commentIdToDelete));
                setShowModal(false);}else{
                    console.log(data.message);
                }
        } catch (error) {
            console.log(error.message);
            
        }
     };

    return (
        <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            {currentUser.isAdmin && comments.length > 0 ? (
                <>
                    <table className="shadow-md w-full text-left border-collapse" >
                        <thead>
                            <tr className="text-bg-gray-200">
                                <th className="p-4 border b-2 border-gray-300">Date Updated</th>
                                <th className="p-4 border b-2 border-gray-300">Comment Content</th>
                                <th className="p-4 border b-2 border-gray-300">Number of Likes </th>
                                <th className="p-4 border b-2 border-gray-300">PostID</th>
                                <th className="p-4 border b-2 border-gray-300">UserID</th>
                                <th className="p-4 border b-2 border-gray-300">Delete</th>
                            </tr>
                        </thead>
                        {comments.map((comment) => (
                            <tbody key={comment._id}>
                                <tr>
                                    <td className="p-4 border-b-2 border-gray-300">{new Date(comment.updateAt).toLocaleDateString()}</td>
                                    <td className="p-4 border-b-2 border-gray-300">{comment.content}</td>
                                    <td className="p-4 border-b-2 border-gray-300">{comment.numberOfLikes}</td>
                                    <td className="p-4 border-b-2 border-gray-300">{comment.postId}</td>
                                    <td className="p-4 border-b-2 border-gray-300">{comment.userId}</td>
                                    <td className="p-4 border-b-2 border-gray-300"><span className="font-medium text-red-500 hover:underline cursor-pointer" onClick={() => {
                                        setShowModal(true); setCommentIdToDelete(comment._id);
                                    }}>Delete</span></td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                    {showMore && (
                        <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">Show more</button>
                    )}
                </>
            ) : (
                <p>You have no comments yet</p>
            )}
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-teal-500 dark:text-gray-200 mb-4 mx-auto" />
                        <h3 className='mb-5 text:lg text-gray-900 dark:text-gray-400'>Are you sure you want to delete this Comment?</h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='red' className="bg-red-500" onClick={handleDeleteComment}>yes I'm sure</Button>
                            <Button color='gray' className='bg-gray-500' onClick={() => setShowModal(false)}>No, cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default DashComments;