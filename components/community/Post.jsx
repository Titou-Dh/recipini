"use client"
import { Input } from "../ui/input";
import { BookMarked, Heart, MessageCircleMore, Link as LinkIcon } from "lucide-react";
import { toast } from "../ui/use-toast";
import { useSession, } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "../ui/sheet";
import { Card } from "../ui/card";

export default function Post({ title, description, image, name, time, idPost, likes, comments }) {
    const [liked, setLiked] = useState(false);
    const { data: session } = useSession();
    const [comment, setComment] = useState('');
    // const [comments, setComments] = useState([]);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        toast({
            title: 'Link copied',
            description: 'The link has been copied to your clipboard',
        })
    }

    // const loadComments = async () => {
    //     try {
    //         const res = await fetch(`/api/post/${idPost}/comments`, {
    //             method: 'GET',
    //         })
    //         console.log(res);
    //         if (res.ok) {
    //             const data = await res.json();
    //             setComments(data);
    //             console.log(data);
    //         }
    //     } catch (error) {
    //         console.error('Error loading comments:', error);
    //     }
    // }


    useEffect(() => {
        const checkLiked = async () => {
            const idUser = session.user.id;
            try {
                const res = await fetch(`/api/post/like?idPost=${idPost}&idUser=${idUser}`, {
                    method: 'GET'
                })
                console.log("check liked post res:",res);
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
        try {
            const res = await fetch('/api/post/comment', {
                method: 'POST',
                body: JSON.stringify({ idPost: idPost, idUser: session.user.id, comment: comment })
            })
            console.log("handle comment res: ",res);
            if (res.ok) {
                toast(
                    {
                        title: 'Comment posted successfully',
                        description: 'Your comment has been posted successfully',
                        type: 'success'
                    }
                )
            } else {
                toast(
                    {
                        title: 'Comment not posted',
                        description: 'Your comment has not been posted',
                        variant: 'destructive'
                    }
                )
            }

        }
        catch (error) {
            console.error('Error posting comment:', error);
            toast({
                title: 'An error occured',
                description: 'An error occured while posting this comment' + error,
                variant: 'destructive'
            })
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
            } else if (res.status == 400) {
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
                    <div className="flex items-center justify-around w-full">
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

                        <Sheet>
                            <SheetTrigger className="flex items-center space-x-2 text-muted-foreground dark:text-gray-300 hover:text-primary">
                                <MessageCircleMore size={20} />
                                <span>Comments</span>
                            </SheetTrigger>
                            <SheetContent className="w-[400px] sm:w-[540px]">
                                <SheetHeader>
                                    <SheetTitle>Comments</SheetTitle>
                                    <SheetDescription>
                                        {
                                            comments ? (
                                                comments.map((comment, index) => (
                                                    <Comment key={index} comment={comment.comment} user={comment.user} />
                                                ))
                                            ) : (
                                                <p>No comments</p>
                                            )
                                        }
                                    </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                        <button className="flex items-center space-x-2 text-muted-foreground dark:text-gray-300 hover:text-primary" onClick={() => handleSave()}>
                            <BookMarked size={20} />
                            <span>save</span>
                        </button>
                        <button className="flex items-center space-x-2 text-muted-foreground dark:text-gray-300 hover:text-primary" onClick={() => handleCopy()}>
                            <LinkIcon size={20} />
                            <span>Copy link</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="border-t p-4">
                <form className="flex items-center space-x-4">
                    <Input
                        id="comment"
                        rows={3}
                        className="block w-full rounded-md border-muted bg-muted/20 px-3 py-2 text-sm placeholder-muted-foreground dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:border-primary focus:ring-primary"
                        placeholder="Write your comment"
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button
                        type="button"
                        onClick={handleComment}
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1"
                    >
                        Send
                    </Button>
                </form>
            </div>
        </div>
    )
}



function Comment({ comment, user }) {
    const [userData, setUserData] = useState({});
    const getUser = async () => {
        const res = await fetch('api/user', {
            method: 'POST',
            body: JSON.stringify({ idUser :user})
        })
        console.log("r=============================>",res);
        if (res.ok) {
            const data = await res.json();
            setUserData(data);
        }
    }

    useEffect(() => {   
        getUser();
    }
    , [])
    



    return (
        <Card >
            <div className="flex items-center space-x-2 p-7">
                <img className="h-8 w-8 rounded-full" src={userData.profilPicture} alt="User Avatar" />
                <div>
                    <h3 className="text-lg font-medium dark:text-white">{userData.name}</h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">{comment}</p>
                </div>
            </div>
        </Card>
    )
}