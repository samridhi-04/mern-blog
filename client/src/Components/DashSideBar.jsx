import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup,HiAnnotation } from 'react-icons/hi';
import { useDispatch, useSelector } from "react-redux";
import { SignoutSucess } from "../redux/user/userSlice";


const DashSideBar = () => {
    const {currentUser} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const [tab, setTab] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);
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
        <Sidebar className="w-full md:w-56">
            <Sidebar.Items>
            <Sidebar.ItemGroup className="flex flex-col gap-1">
            <Link to='/dashboard?tab=profile'>
            <Sidebar.Item active={tab==='profile'} icon={HiUser} label={currentUser.isAdmin ?'Admin':'User'} labelColor='dark' as='div'>
                        Profile
                    </Sidebar.Item> </Link>
                    {currentUser.isAdmin && <Link to='/dashboard?tab=posts' as='div'>
                    <Sidebar.Item active={tab==='posts'} icon={HiDocumentText}>Posts</Sidebar.Item> </Link>}
                    {currentUser.isAdmin && <><Link to='/dashboard?tab=users' as='div'>
                    <Sidebar.Item active={tab==='users'} icon={HiOutlineUserGroup}>Users</Sidebar.Item> </Link>
                    <Link to='/dashboard?tab=comments' as='div'>
                    <Sidebar.Item active={tab==='comments'} icon={HiAnnotation}>Comments</Sidebar.Item> </Link></>}
                     
                     
                    <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onclick={handleSignout}>
                        Sign Out
                    </Sidebar.Item>
            </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}

export default DashSideBar;
