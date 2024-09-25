"use client";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

import DarkModeToggle from "@/components/DarkModeToggle";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session, status } = useSession();
    const [isMounted, setIsMounted] = useState(false);

    // Ensure the component is mounted before rendering session-dependent components
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <nav className="bg-transparent shadow-md dark:border-b">
            <div className="md:px-32 lg:px-48 px-11 mx-auto">
                <div className="flex justify-between items-center h-16">
                    <div className="flex">
                        <Link className="m-" href="/">
                            <Image src="/assets/images/logo-light.png" alt='logo' height={150} width={120} className='h-auto w-auto' />
                        </Link>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8 md:m-auto">
                        <Link href="/" className="text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                            Home
                        </Link>
                        <Link className="text-gray-500 dark:text-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium" href="/browse">
                            Browse Recipes
                        </Link>
                        <Link className="text-gray-500 dark:text-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium" href="/about">
                            About
                        </Link>
                        <Link className="text-gray-500 dark:text-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium" href="/contact">
                            Contact
                        </Link>
                    </div>
                    <div className="hidden sm:flex sm:items-center">
                        <DarkModeToggle />
                        {
                            status === "authenticated" && isMounted ? (
                                <div className="ml-3 relative">
                                    <Button className="bg-transparent text-gray-900 dark:text-white" onClick={() => signOut()}>Logout</Button>
                                </div>
                            ) : (
                                <div className="ml-3 relative">
                                    <Link href="/login" className="dark:text-black  ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark">
                                        Login
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="bg-gray-900 dark:bg-gray-700 inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-white hover:text-white hover:bg-gray-700 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen ? 'true' : 'false'}
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col gap-5">
                    <Link href="/" className="text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 text-sm font-medium">
                        Home
                    </Link>
                    <Link className="text-gray-500 dark:text-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium" href="/browse">
                        Browse Recipes
                    </Link>
                    <Link className="text-gray-500 dark:text-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium" href="/about">
                        About
                    </Link>
                    <Link className="text-gray-500 dark:text-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium" href="/contact">
                        Contact
                    </Link>

                    {/* <DropdownMenu color="primary">
                        <DropdownMenuTrigger><Button className="w-full">Login / Signup</Button></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <Link href="/login"><DropdownMenuItem>Login</DropdownMenuItem></Link>
                            <Link href="/signup"><DropdownMenuItem>Signup</DropdownMenuItem></Link>
                        </DropdownMenuContent>
                    </DropdownMenu> */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
