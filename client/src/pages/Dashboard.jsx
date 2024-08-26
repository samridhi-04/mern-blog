import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSideBar from "../Components/DashSideBar";
import DashProfile from "../Components/DashProfile";
import DashPosts from "../Components/DashPosts";
import DashUsers from "../Components/DashUsers";
import DashComments from "../Components/DashComments";
import DashboardComp from "../Components/DashboardComp";

const Dashboard = () => {
    const location = useLocation();
    const [tab, setTab] = useState('');
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search])
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="md:w-56">
                {/* sidebar */}
                <DashSideBar/>
            </div>
            {tab === 'profile' && <DashProfile />}
            {/* profile */}
            {tab === 'posts' && <DashPosts/>}
            {tab==='users' && <DashUsers/>}
            {/* comments */}
            {tab ==='comments' && <DashComments/>}
            {/* DashboardComponent */}
            {tab ==='dash' && <DashboardComp/>}

        </div>
    );
}

export default Dashboard;
