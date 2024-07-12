"use client";
import React, { useEffect, useState } from 'react'
import Post from './Post'

function Feed() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        fetch('/api/post')
            .then(res => res.json())
            .then(data => setPosts(data))
    }
        , [])

    return (
        <div>
            <Post title="test" description="qsldkfjqsld" time="qslkdfjlks" image="chicken-alfredo.jpg" />
            {
            posts.map(post => (
                <Post title={post.title} description={post.description} time={post.createdAt} image={post.image} name={post.author.name} />
            ))
            }
        </div>
    )
}

export default Feed
