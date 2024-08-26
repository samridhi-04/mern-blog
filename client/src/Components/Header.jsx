import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation,useNavigate} from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { FaMoon, FaSun } from 'react-icons/fa';
import { toggleTheme } from '../redux/theme/themeSlice';
import { SignoutSucess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';


const Header = () => {
    const dispatch = useDispatch();
    const path = useLocation().pathname;
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useSelector(state => state.user);
    const { theme } = useSelector(state => state.theme);
    const [searchTerm, setSearchTerm] = useState('');
  

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl);
        }

    },[location.search])

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
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    }


    return (
        <Navbar className='border-b-2 p-4 flex items-center justify-between'>
            <Link to="/" className='text-sm sm:text-xl font-semibold dark:text-white flex items-center'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Samridhis</span> Blog
            </Link>
            
            <div className='flex items-center gap-6 flex-grow'>
                <form className='hidden lg:flex items-center flex-grow' onSubmit={handleSubmit}>
                    <TextInput 
                        type='text' 
                        placeholder='Search...' 
                        rightIcon={AiOutlineSearch} 
                        className='w-full'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </form>

                <Button className='w-12 h-10 lg:hidden rounded-full' color='gray' pill>
                    <AiOutlineSearch />
                </Button>

                <Navbar.Toggle className='lg:hidden' />
            </div> 

            <Navbar.Collapse className='lg:hidden'>
                <div className='flex flex-col gap-4 p-4'>
                    <Link to='/'>
                        <div className={`py-2 px-4 rounded-lg transition duration-300 ${path === '/' ? 'text-blue-400' : 'text-gray-500 hover:bg-gray-200'}`}>
                            Home
                        </div>
                    </Link>
                    <Link to='/about'>
                        <div className={`py-2 px-4 rounded-lg transition duration-300 ${path === '/about' ? 'text-blue-400' : 'text-gray-500 hover:bg-gray-200'}`}>
                            About
                        </div>
                    </Link>
                </div>
                <div className='flex items-center gap-4'>
                    <Button className='w-12 h-10 rounded-full' color='gray' pill onClick={() => dispatch(toggleTheme())}>
                        {theme === 'light' ? <FaSun /> : <FaMoon />}
                    </Button>
                    {currentUser ? (
                        <Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={currentUser.profilePicture} rounded />}>
                            <Dropdown.Header>
                                <span className='block text-sm'>@{currentUser.username}</span>
                                <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                            </Dropdown.Header>
                            <Link to={'/dashboard?tab=profile'}>
                                <Dropdown.Item>Profile</Dropdown.Item>
                            </Link>
                            <Dropdown.Divider />
                            <Dropdown.Item>Sign Out</Dropdown.Item>
                        </Dropdown>
                    ) : (
                        <Link to='/sign-in'>
                            <div className='bg-gradient-to-r from-purple-700 to-blue-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 hover:bg-blue-700 outline'>
                                Sign In
                            </div>
                        </Link>
                    )}
                </div>
            </Navbar.Collapse>

            <div className='hidden lg:flex items-center gap-4'>
                <Link to='/'>
                    <div className={`py-2 px-4 rounded-lg transition duration-300 ${path === '/' ? 'text-blue-400' : 'text-gray-500 hover:bg-gray-200'}`}>
                        Home
                    </div>
                </Link>
                <Link to='/about'>
                    <div className={`py-2 px-4 rounded-lg transition duration-300 ${path === '/about' ? 'text-blue-400' : 'text-gray-500 hover:bg-gray-200'}`}>
                        About
                    </div>
                </Link>
                <Link to='/projects'>
                    <div className={`py-2 px-4 rounded-lg transition duration-300 ${path === '/projects' ? 'text-blue-400' : 'text-gray-500 hover:bg-gray-200'}`}>
                        Projects
                    </div>
                </Link>
                <Button className='w-12 h-10 rounded-full' color='gray' pill onClick={() => dispatch(toggleTheme())}>
                    {theme === 'light' ? <FaSun /> : <FaMoon />}
                </Button>
                {currentUser ? (
                    <Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={currentUser.profilePicture} rounded />}>
                        <Dropdown.Header>
                            <span className='block text-sm'>@{currentUser.username}</span>
                            <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Link to='/sign-in'>
                        <div className='bg-gradient-to-r from-purple-700 to-blue-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 hover:bg-blue-700 outline'>
                            Sign In
                        </div>
                    </Link>
                )}
            </div>
        </Navbar>
    );
}

export default Header;