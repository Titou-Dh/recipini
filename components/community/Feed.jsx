"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Post from './Post'


function Feed() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        fetch('/api/post')
            .then(res => res.json())
            .then(data => {
                setPosts(data)
            })
    }, [])
    return (
        <>
            {posts && 

                    posts.map((post, index) => (
                        <Post key={index} title={post.title} description={post.description} time={post.createdAt} image={post.image} name={post.authorName} idPost ={post._id} likes={post.likes} comments={post.comments} />
                    ))

            }
            {posts.length == 0 && (
                <div className=" flex flex-col items-center justify-center h-96">
                    <h1 className="text-2xl text-muted-foreground dark:text-gray-300 my-3" >No posts available</h1>
                    <div>Click <Link className='underline text-bold text-blue-600 ' href="/community/create">here</Link> to Create some new recipes!</div>
                </div>
            )}
        </>
    )
}

export default Feed
