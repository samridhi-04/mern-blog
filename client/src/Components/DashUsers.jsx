import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

const DashUsers = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/user/getusers`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await res.json();
                if (res.ok) {
                    if (data.users.length < 10) {
                        setShowMore(false);
                    }
                    setUsers(data.users);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if (currentUser.isAdmin) {
            fetchUsers();
        }
    }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = users.length;
        try {
            const res = await fetch(`http://localhost:3000/api/user/getusers?startIndex=${startIndex}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await res.json();
            if (res.ok) {
                setUsers((prev) => [...prev, ...data.users]);
                if (data.users.length < 10) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDeleteUser = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/user/delete/${userIdToDelete}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            const data = await res.json();
            if (res.ok) {
                setUsers(users.filter((user) => user._id !== userIdToDelete));
                setShowModal(false);}else{
                    console.log(data.message);
                }
        } catch (error) {
            console.log(error.message);
            
        }
     };

    return (
        <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            {currentUser.isAdmin && users.length > 0 ? (
                <>
                    <table className="shadow-md w-full text-left border-collapse" >
                        <thead>
                            <tr className="text-bg-gray-200">
                                <th className="p-4 border b-2 border-gray-300">Date Created</th>
                                <th className="p-4 border b-2 border-gray-300">User image</th>
                                <th className="p-4 border b-2 border-gray-300">Username</th>
                                <th className="p-4 border b-2 border-gray-300">Email</th>
                                <th className="p-4 border b-2 border-gray-300">Admin</th>
                                <th className="p-4 border b-2 border-gray-300">Delete</th>
                            </tr>
                        </thead>
                        {users.map((user) => (
                            <tbody key={user._id}>
                                <tr>
                                    <td className="p-4 border-b-2 border-gray-300">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4 border-b-2 border-gray-300"><img src={user.profilePicture} alt={user.username} className="w-10 h-10 object-cover rounded-full " /></td>
                                    <td className="p-4 border-b-2 border-gray-300">{user.username}</td>
                                    <td className="p-4 border-b-2 border-gray-300">{user.email}</td>
                                    <td className="p-4 border-b-2 border-gray-300">{user.isAdmin?(<FaCheck className='text-green-500'/>):(<FaTimes className='text-red-500'/>)}</td>
                                    <td className="p-4 border-b-2 border-gray-300"><span className="font-medium text-red-500 hover:underline cursor-pointer" onClick={() => {
                                        setShowModal(true); setUserIdToDelete(user._id);
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
                <p>You have no users yet</p>
            )}
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-teal-500 dark:text-gray-200 mb-4 mx-auto" />
                        <h3 className='mb-5 text:lg text-gray-900 dark:text-gray-400'>Are you sure you want to delete this USER?</h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='red' className="bg-red-500" onClick={handleDeleteUser}>yes I'm sure</Button>
                            <Button color='gray' className='bg-gray-500' onClick={() => setShowModal(false)}>No, cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default DashUsers;