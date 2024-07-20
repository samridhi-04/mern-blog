import { useState } from "react";
import { Navbar, TextInput, Button } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const path = useLocation().pathname;

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Function to determine if a link is active
  const isActive = (route) => path === route;

  return (
    <Navbar className="border-b-2 py-4 flex flex-wrap justify-between items-center">
      <div className="flex items-center gap-4">
        <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Samridhi's</span> Blog
        </Link>
        <Button className="lg:hidden" color="gray" pill>
          <AiOutlineSearch />
        </Button>
        <Button className="ml-4" color="gray" pill>
          <FaMoon />
        </Button>
      </div>
      <div className="flex items-center gap-4 md:order-2 ml-auto">
        <form className="relative hidden lg:flex items-center">
          <TextInput
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 w-full max-w-xs"
          />
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </form>
        <Link to="sign-in" className="inline-block text-white font-bold py-2 px-4 rounded-lg transition duration-300 bg-gradient-to-r from-purple-900 to-blue-500 hover:from-purple-600 hover:to-blue-600">
          Sign In
        </Link>
      </div>
      <div className="lg:hidden">
        <Button onClick={toggleNavbar} color="gray" pill>
          <GiHamburgerMenu />
        </Button>
      </div>
      <Navbar.Collapse className={`${isOpen ? "block" : "hidden"} lg:flex lg:items-center lg:w-auto w-full`}>
        <Link
          to="/"
          className={`py-2 px-4 rounded-lg transition duration-300 ${isActive('/') ? 'bg-gray-700 text-white' : 'text-gray-500 hover:bg-gray-200'}`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`py-2 px-4 rounded-lg transition duration-300 ${isActive('/about') ? 'bg-gray-700 text-white' : 'text-gray-500 hover:bg-gray-200'}`}
        >
          About
        </Link>
        <Link
          to="/projects"
          className={`py-2 px-4 rounded-lg transition duration-300 ${isActive('/projects') ? 'bg-gray-700 text-white' : 'text-gray-500 hover:bg-gray-200'}`}
        >
          Projects
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
