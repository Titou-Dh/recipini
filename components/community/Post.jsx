"use client"
import { Input } from "../ui/input";
import { BookMarked } from "lucide-react";
import { toast } from "../ui/use-toast";
import { useSession } from "next-auth/react";

export default function Post({ title, description, image, name, time, idPost }) {
    const { data: sess } = useSession();
    const handleSave = (idPost) => {
        console.log(idPost);
        const res = fetch('/api/post/save', {
            method: 'POST',
            body: JSON.stringify({ idPost, sess.user.id })
                

        })

        if (res.ok) {
            toast(
                {
                    title: 'Post saved successfully',
                    description: 'This post has been saved successfully',
                    type: 'success'
                }
            )
        }else{
            toast(
                {
                    title: 'Post not saved',
                    description: 'This post has not been saved',
                    variant: 'destructive'
                }
            )
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
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                            <span>Like</span>
                        </button>
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
                        <button className="flex items-center space-x-2 text-muted-foreground dark:text-gray-300 hover:text-primary" onClick={(idPost) => handleSave(idPost)}>
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
                <div className="flex items-center space-x-4">
                    <Input
                        id="comment"
                        rows={3}
                        className="block w-full rounded-md border-muted bg-muted/20 px-3 py-2 text-sm placeholder-muted-foreground dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:border-primary focus:ring-primary"
                        placeholder="Write your comment"
                    />
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}