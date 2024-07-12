import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBookmark, faHouse, faPlus, faSignOut } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import DarkModeToggle from "../DarkModeToggle";
import { signOut } from "next-auth/react";

function Nav() {


    return (
        <div className='md:w-max z-50 w-[90%] fixed bottom-5 mx-auto left-1/2 transform -translate-x-1/2 navbar-blur border px-4 py-2 rounded-xl dark:bg-[#ffffff0b]'>
            <div className="flex items-center justify-around md:justify-between gap-4">
                {/* <Link href="#" className="flex items-center gap-2" prefetch={false}>
                    <Image width={90} height={36} src="/assets/images/logo-light.png" />
                    <span className="text-lg font-semibold"></span>
                </Link> */}
                <Link href="#" className="text-lg hover:scale-[1.1] transition-all font-medium hover:underline underline-offset-4 flex gap-2 dark:text-white" prefetch={false}>
                    <FontAwesomeIcon icon={faHouse} className="h-6 w-6" />
                    <span className="hidden md:flex">Browse</span>
                </Link>
                <Link href="/community/create" className="text-lg hover:scale-[1.1] transition-all font-medium hover:underline underline-offset-4 flex gap-2 dark:text-white" prefetch={false}>
                    <FontAwesomeIcon icon={faPlus} className="h-6 w-6" />
                    <span className="hidden md:flex">Create</span>
                </Link>
                <Link href="#" className="text-lg hover:scale-[1.1] transition-all font-medium hover:underline underline-offset-4 flex gap-2 dark:text-white" prefetch={false}>
                    <FontAwesomeIcon icon={faBookmark} className="h-6 w-6" />
                    <span className="hidden md:flex">Savings</span>
                </Link>
                <Link href="#" className="text-lg hover:scale-[1.1] transition-all font-medium hover:underline underline-offset-4 flex gap-2 dark:text-white" prefetch={false}>
                    <FontAwesomeIcon icon={faUser} className="h-6 w-6" />
                    <span className="hidden md:flex">Profile</span>
                </Link>
                <Link href="#" onClick={() => signOut({callbackUrl:"/login"})} className="text-lg hover:scale-[1.1] transition-all font-medium hover:underline underline-offset-4 flex gap-2 dark:text-white" prefetch={false}>
                    <FontAwesomeIcon icon={faSignOut} className="h-6 w-6" />
                    <span className="hidden md:flex">Logout</span>
                </Link>
                <DarkModeToggle />
            </div>
        </div>
    )
}

export default Nav;
