"use client";
import React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useState, useCallback } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useSession } from 'next-auth/react';

export default function page() {
    const [title, setTitle] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [description, setDescription] = useState('')
    const [steps, setSteps] = useState('')
    const [images, setImages] = useState([])
    const { data: session } = useSession();




    const handleDrop = useCallback((acceptedFiles) => {
        setImages((prevImages) => [...prevImages, ...acceptedFiles])
    }, [])
    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index))
    }
    const [showBrowse, setShowBrowse] = useState(false)
    const handleBrowseClick = () => {
        setShowBrowse(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', title);
        data.append('ingredients', ingredients);
        data.append('description', description);
        data.append('steps', steps);
        data.append('authorId', session.user.id)
        

        for (let i = 0; i < images.length; i++) {
            data.append('images', images[i]);
        }

        const res = await fetch('/api/post/create', {
            method: 'POST',
            body: data,
        });

        if (res.ok) {
            alert('Upload successful');
        } else {
            alert('Upload failed');
        }
    };




    return (
        <div className='flex items-start justify-around border md:w-2/3 mb-36 m-auto rounded-lg px-7 py-7 dark:bg-[#ffffff1e]'>
            <div className='md:w-1/2'>
                <h1 className='text-4xl font-bold text-primaryL'>Create a new recipe</h1>
                <p className='text-lg text-primary'>Create a community for your favorite recipes and share them with other food enthusiasts.</p>
            </div>
            <div className='w-full  md:w-1/2' onSubmit={handleSubmit} >
                <form className=''  >
                    <h1 className='text-3xl text-secondaryL font-bold'>New Recipe:</h1>
                    <div className='flex flex-col'>
                        <label htmlFor='title' className='my-2'>Title:</label>
                        <Input
                            type='text'
                            placeholder="enter the title of the recipe"
                            className='border rounded-md p-4'
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='ingredients' className='my-2'>Ingredients:</label>
                        <Textarea
                            placeholder="enter the ingredients of the recipe"
                            className='border rounded-md p-4'
                            onChange={(e) => setIngredients(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='description' className='my-2'>Description:</label>
                        <Textarea
                            placeholder="enter the description of the recipe"
                            className='border rounded-md p-4'
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='steps' className='my-2'>Steps:</label>
                        <Textarea
                            placeholder="enter the steps of the recipe"
                            className='border rounded-md p-4'
                            onChange={(e) => setSteps(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='image' className='my-2'>Image:</label>
                        <Card>
                            <CardHeader>
                                <CardTitle>Upload Images</CardTitle>
                                <CardDescription>Drag and drop your images here or click to upload.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div
                                    className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed rounded-md bg-muted hover:bg-muted/50 transition-colors cursor-pointer"
                                    onClick={handleBrowseClick}
                                >
                                    {showBrowse ? (
                                        <input type="file" multiple className="w-full" />
                                    ) : (
                                        <>
                                            <UploadIcon className="w-8 h-8 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground">Drag and drop your images here or click to upload.</p>
                                        </>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                                    {images.map((image, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src="/placeholder.svg"
                                                alt={`Image ${index}`}
                                                width={300}
                                                height={300}
                                                className="object-cover w-full h-48 rounded-md"
                                            />
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => handleRemoveImage(index)}
                                            >
                                                <XIcon className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className='flex justify-end gap-4'>
                        <Button variant='secondary' className='mt-4 ml-2' type="reset" >Cancel</Button>
                        <Button color='primary' className='mt-4' type="submit">Create Recipe</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}






function UploadIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
    )
}


function XIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}