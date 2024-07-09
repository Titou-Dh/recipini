"use client";


import Image from 'next/image'
import { useSession } from 'next-auth/react'

import React from 'react'
import { Button } from '../ui/button';

function ProfileCard() {
    const { data: session } = useSession()

    return (
        <div className="bg-[#ffffff5e] rounded-lg border dark:border-backgroundL   shadow-lg p-4 z-30  lg:fixed h-min">
            <div className="flex justify-between items-center gap-4">
                <div className="flex items-center">
                    <Image src={session?.user.image} alt="profile" width={50} height={50} className="w-12 h-12 rounded-full" />
                    <div className="ml-2">
                        <h2 className="text-lg font-semibold">{session?.user.name}</h2>
                        <p className="text-sm text-gray-600">{session?.user.email}</p>
                    </div>
                </div>
                <Button className="bg-primaryL dark:hover:text-gray-900  text-white px-4 py-2 rounded-lg">Edit Profile</Button>
            </div>
            <div className="mt-4">
                <p className="text-sm text-gray-900">Welcome back {session?.user.name} 👋</p>
            </div>
        </div>
    )
}

export default ProfileCard
