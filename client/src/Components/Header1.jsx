import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';
import {useSelector} from 'react-redux'

const Header1 = () => {
    const path = useLocation().pathname;
    const {currentUser} = useSelector(state=>state.user)

    return (
        <Navbar className='border-b-2 p-4 flex items-center justify-between'>
            <Link to="/" className='text-sm mr-40 sm:text-xl font-semibold dark:text-white flex items-center'>
                <span className='px-2 py-1  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Samridhis</span> Blog
            </Link>

            <div className='flex items-center gap-6 flex-grow'>
                <form className='hidden lg:flex items-center flex-grow'>
                    <TextInput 
                        type='text' 
                        placeholder='Search...' 
                        rightIcon={AiOutlineSearch} 
                        className='w-full mr-40'
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
                    <Link to='/projects'>
                        <div className={`py-2 px-4 rounded-lg transition duration-300 ${path === '/projects' ? 'text-blue-400' : 'text-gray-500 hover:bg-gray-200'}`}>
                            Projects
                        </div>
                    </Link>
                    <Link to='/sign-in'>
                        <div className='bg-gradient-to-r from-purple-700 to-blue-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 hover:bg-blue-700 outline'>
                            Sign In
                        </div>
                    </Link>
                </div>
            </Navbar.Collapse>

            <div className='flex items-center ml-100 mt-4 lg:mt-0 lg:flex lg:items-center lg:justify-between lg:w-auto hidden'>
                <div className='flex flex-grow gap-4'>
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
                        <div className={`py-2 px-4 mr-40 rounded-lg transition duration-300 ${path === '/projects' ? 'text-blue-400' : 'text-gray-500 hover:bg-gray-200'}`}>
                            Projects
                        </div>
                    </Link>
                </div>
                <div className='flex items-center'>
                    <Button className='w-12 ml-40 h-10 rounded-full' color='gray' pill>
                        <FaMoon />
                    </Button>
                    {currentUser?(<Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={currentUser.profilePicture} rounded/>}>
                    <Dropdown.Header>
                        <span className='block text-sm'>@{currentUser.username} </span>
                        <span className='block text-sm font-medium truncate'>{currentUser.email} </span>
                    </Dropdown.Header>
                    <Link to={'/dashboard?tab=profile'}>
                    <Dropdown.Item>Profile</Dropdown.Item>
                    </Link>
                    <Dropdown.Divider/>
                    <Dropdown.Item>Sign Out</Dropdown.Item>

                    </Dropdown>):(
                         <Link to='/sign-in'>
                         <div className='bg-gradient-to-r ml-20  from-purple-700 to-blue-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 hover:bg-blue-700 outline'>
                             Sign In
                         </div>
                     </Link>
                    )}
                    
                </div>
            </div>
        </Navbar>
    );
}

export default Header1;