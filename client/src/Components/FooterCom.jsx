import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs'

const FooterCom = () => {
    return (
        <Footer container className="border border-t-8 border-teal-500 py-10">  {/* Add py-10 to increase the padding */}
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                    <div className="mt-5">
                        <Link to="/" className='text-lg mr-40 sm:text-xl font-semibold dark:text-white flex items-center'>
                            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Samridhis</span> Blog
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <Footer.Title title="About" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="https://www.100jsprojects.com" target="_blank" rel="noopener noreferrer">
                                    100 JS Projects
                                </Footer.Link>
                                <Footer.Link href="/about" target="_blank" rel="noopener noreferrer">
                                    Samridhis Blog 
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Follow Us"/>
                            <Footer.LinkGroup>
                                <Footer.Link href="https://github.com/samridhi-04" target="_blank" rel="noopener noreferrer">Github</Footer.Link>
                            </Footer.LinkGroup>
                            <Footer.LinkGroup>
                                <Footer.Link href="https://www.linkedin.com/in/samridhi-wadhwa-5706b727a/" target="_blank" rel="noopener noreferrer">LinkedIn</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Legal"/>
                            <Footer.LinkGroup>
                                <Footer.Link href="#">Privacy Policy</Footer.Link>
                            </Footer.LinkGroup>
                            <Footer.LinkGroup>
                                <Footer.Link href="#">Terms and Conditions</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider />
                <div className="w-full sm:items-center sm:flex sm:justify-between">
                    <Footer.Copyright href="#" by="Samridhi Blog" year={new Date().getFullYear()}/>
                    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                        <Footer.Icon href="#" icon={BsFacebook}/>
                        <Footer.Icon href="#" icon={BsTwitter}/>
                        <Footer.Icon href="#" icon={BsInstagram}/>
                        <Footer.Icon href="#" icon={BsGithub}/>
                        <Footer.Icon href="#" icon={BsDribbble}/>
                    </div>
                </div>
            </div>
        </Footer>
    );
}

export default FooterCom;
