import { Button } from "flowbite-react";


const CallToAction = () => {
    return (
        <div className="flex flex-col sm:flex-row border border-teal-500 justify-center text-center rounded-tl-3xl rounded-br-3xl text-center">
            <div  className="flex-1 justify-center flex flex-col ">
                <h2 className="text-2xl">
                    Want to learn more about JavaScript?
                </h2>
                <p className="text-gray-500 my-2 ">checkout these resources with 100 javascript projects </p>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-tl-xl rounded-bl-none">
                    <a href="https://www.100jsprojects.com" target="_blank" rel="noopener noreferrer">100 javascript projects </a>
                </Button>
            </div>
            <div className="p-7 flex-1">
                <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg"  />
            </div>
        </div>
    );
}

export default CallToAction;
