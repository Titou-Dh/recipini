"use client";


import Image from 'next/image'
import { useSession } from 'next-auth/react'

import React from 'react'

function ProfileCard() {
    const { data: session } = useSession()

    return (
        <div className="bg-[#ffffffa1] rounded-lg border  shadow-lg p-4 z-30 md:w-1/4">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Image src={session?.user.image} alt="profile" width={50} height={50} className="w-12 h-12 rounded-full" />
                    <div className="ml-2">
                        <h2 className="text-lg font-semibold">{session?.user.name}</h2>
                        <p className="text-sm text-gray-600">{session?.user.email}</p>
                    </div>
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-lg">Edit Profile</button>
            </div>
            <div className="mt-4">
                <p className="text-sm text-gray-600">Welcome back {session?.user.name} 👋</p>
            </div>
        </div>
    )
}

export default ProfileCard
