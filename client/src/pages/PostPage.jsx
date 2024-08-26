import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../Components/CallToAction";
import CommentSection from "../Components/CommentSection";
import PostCard from '../Components/PostCard';

const Postpage = () => {
    const { postslug } = useParams();
    const [loading, setLoading] = useState(true); // Set loading to true initially
    const [post, setPost] = useState(null);
    const [error, setError] = useState(false);
    const [recentPosts, setRecentPosts] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:3000/api/post/getposts?slug=${postslug}`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                } else {
                    setPost(data.posts[0]);
                }
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [postslug]);

    useEffect(() => {
        const fetchRecentPosts = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/post/getposts?limit=3`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await res.json();
                if (res.ok) {
                    setRecentPosts(data.posts);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchRecentPosts();
    }, []);

    // Move the loading state check inside the JSX to ensure all hooks are called every render
    return (
        <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
            {loading ? (
                <div className="justify-center items-center min-h-screen">
                    <Spinner size='xl' />
                </div>
            ) : (
                <>
                    {error && <p>Failed to load post.</p>}
                    {!error && post && (
                        <>
                            <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
                                {post.title}
                            </h1>
                            <Link to={`/search?category=${post.category}`} className="self-center mt-5">
                                <Button className="bg-gray-500 text-white" pill size='xs'>
                                    {post.category}
                                </Button>
                            </Link>
                            <img src={post.image} alt={post.title} className="mt-10 p-3 max-h-[600px] w-full object-cover" />
                            <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs ">
                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                <span className="italic">{(post.content.length / 1000).toFixed(0)} mins read</span>
                            </div>
                            <div className="p-3 max-w-2xl mx-auto w-full post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                            <div className="max-w-4xl mx-auto w-full ">
                                <CallToAction />
                            </div>
                            <CommentSection postId={post._id} />
                        </>
                    )}
                    <div className="flex flex-col justify-center items-center mb-5">
                        <h1 className="text-xl mt-5">Recent articles</h1>
                        <div className="flex flex-wrap gap-5 mt-5 justify-center ">
                            {recentPosts && recentPosts.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </main>
    );
}

export default Postpage;
