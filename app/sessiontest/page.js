"use client";

import React from 'react'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react';


function page() {
    const { data: session } = useSession()
    return (
        <div>
            <h1>Session Test</h1>
            <p>
                This is a test page to check if the session is working properly.
            </p>
            {session && (
                <div>
                    <h2>Signed in as {session.user.email}</h2>
                    <p>Session expires in {session.expires}</p>
                </div>
            )
            }
            {!session && (
                <div>
                    <h2>Not signed in</h2>
                    <p>
                        <a href="/api/auth/signin">Sign in</a>
                    </p>
                </div>
            )
            }
            {session && (
                <div>
                    <button onClick={() => signOut()}>Sign out</button>
                </div>
            )
            }
        </div>
    )
}

export default page
