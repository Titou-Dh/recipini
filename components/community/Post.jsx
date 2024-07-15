"use client"
import { Input } from "../ui/input";
import { BookMarked, Heart } from "lucide-react";
import { toast } from "../ui/use-toast";
import { useSession, } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function Post({ title, description, image, name, time, idPost }) {
    const [liked, setLiked] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        const checkLiked = async () => {
            const idUser = session.user.id;
            try {
                const res = await fetch('/api/post/like', {
                    method: 'GET',
                    body: JSON.stringify({ idPost: idPost, idUser: idUser })
                })
                console.log(res);
                if (res.ok) {
                    setLiked(true);
                }
            } catch (error) {
                console.error('Error checking like:', error);
            }
        }
        checkLiked();
    }, [])

    const handleComment = async () => {
        console.log('comment');
        try{
            const 
        }
    }



    const handleLike = async () => {
        console.log(idPost);
        const idUser = session.user.id;
        try {
            const res = await fetch('/api/post/like', {
                method: 'POST',
                body: JSON.stringify({ idPost: idPost, idUser: idUser })
            })
            console.log(res);

            if (res.ok) {
                toast(
                    {
                        title: 'Post liked successfully',
                        description: 'This post has been liked successfully',
                        type: 'success'
                    }
                )
                setLiked(true);
            }else if (res.status == 400) {
                toast(
                    {
                        title: 'Post unliked successfully',
                        description: 'This post has been unliked successfully',

                    }
                )
                setLiked(false);
            } else {
                toast(
                    {
                        title: 'Post not liked',
                        description: 'This post has not been liked',
                        variant: 'destructive'
                    }
                )
            }
        } catch (error) {
            console.error('Error saving post:', error);
            toast({
                title: 'An error occured',
                description: 'An error occured while liking this post' + error,
                variant: 'destructive'
            })
        }
    }
    const handleSave = async () => {
        console.log(idPost);
        const idUser = session.user.id;
        try {
            const res = await fetch('/api/post/save', {
                method: 'POST',
                body: JSON.stringify({ idPost: idPost, idUser: idUser })


            })
            console.log(res);

            if (res.ok) {
                toast(
                    {
                        title: 'Post saved successfully',
                        description: 'This post has been saved successfully',
                        type: 'success'
                    }
                )
            } else if (res.status == 400) {
                toast(
                    {
                        title: 'Post already saved',
                        description: 'This post has already been saved',
                        variant: 'destructive'
                    }
                )
            } else {
                toast(
                    {
                        title: 'Post not saved',
                        description: 'This post has not been saved',
                        variant: 'destructive'
                    }
                )
            }
        } catch (error) {
            console.error('Error saving post:', error);
            toast({
                title: 'An error occured',
                description: 'An error occured while saving this post' + error,
                variant: 'destructive'
            })
        }


    }

    return (
        <div className="bg-white dark:bg-transparent border rounded-lg shadow-md w-full max-w-lg mx-auto m-5">
            <div className="p-4 border-b">
                <div className="flex items-center">
                    <div className="flex-shrink-0 mr-3">
                        <img className="h-10 w-10 rounded-full" src="/assets/images/default-pic.jpg" alt="User Avatar" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium dark:text-white">{name}</h3>
                        <p className="text-sm text-muted-foreground dark:text-gray-300">
                            Shared a recipe
                            <span className="ml-2 text-xs bg-muted px-2 py-1 rounded-full">{time}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <img src={`https://res.cloudinary.com/dyhjyqtr3/image/upload/v1721049817/${image}`} alt="Recipe Image" className="w-full h-[400px] object-cover" />
            </div>
            <div className="p-4">
                <h2 className="text-wrap text-2xl font-bold dark:text-white">{title}</h2>
                <p className="text-lg mt-2 dark:text-gray-300">
                    {description}
                </p>
            </div>
            <div className="border-t">
                <div className="flex justify-between items-center p-4">
                    <div className="flex items-center space-x-4">
                        {
                            liked ? (
                                <button className="flex items-center space-x-2 text-muted-foreground text-red-800 hover:text-primary" onClick={() => handleLike()}>
                                    <Heart size={20} />
                                    <span>Unlike</span>
                                </button>
                            ) : (
                                <button className="flex items-center space-x-2 text-muted-foreground dark:text-gray-300 hover:text-primary" onClick={() => handleLike()}>
                                    <Heart size={20} />
                                    <span>Like</span>
                                </button>
                            )
                        }
                        <button className="flex items-center space-x-2 text-muted-foreground dark:text-gray-300 hover:text-primary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                            </svg>
                            <span>Comment</span>
                        </button>
                        <button className="flex items-center space-x-2 text-muted-foreground dark:text-gray-300 hover:text-primary" onClick={() => handleSave()}>
                            <BookMarked size={20} />
                            <span>save</span>
                        </button>
                    </div>
                    <button className="text-muted-foreground dark:text-gray-300 hover:text-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="border-t p-4">
                <form onSubmit={()=> handleComment()} className="flex items-center space-x-4">
                    <Input
                        id="comment"
                        rows={3}
                        className="block w-full rounded-md border-muted bg-muted/20 px-3 py-2 text-sm placeholder-muted-foreground dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:border-primary focus:ring-primary"
                        placeholder="Write your comment"
                    />
                    <Button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1"
                    >
                        Send
                    </Button>
                </form>
            </div>
        </div>
    )
}