/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Q9SB1m5CZQa
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState, useCallback } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function InputImage() {
    const [images, setImages] = useState([])
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
    return (
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