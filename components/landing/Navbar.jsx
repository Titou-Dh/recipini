"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-transparent shadow-md ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-around items-center h-16">
                    <div className="flex">
                        <Link className="m-" href="/">
                            <Image src="/assets/images/logo-light.png" alt='logo' height={150} width={120} />
                        </Link>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8 md:m-auto">
                        <Link href="/" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium">
                            Home
                        </Link>
                        <Link className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium" href="/browse">
                            Browse Recipes
                        </Link>
                        <Link className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium" href="/about">
                            About
                        </Link>
                        <Link className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium" href="/contact">
                            Contact
                        </Link>
                    </div>
                    <div className="hidden sm:flex sm:items-center">
                        <Button as="a" href="/auth" className="ml-4" color="primary">
                            Login / Signup
                        </Button>
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
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
                <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col gap-5 ">
                    <Link href="/" className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium ">
                        Home
                    </Link>
                    <Link className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium" href="/browse">
                        Browse Recipes
                    </Link>
                    <Link className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium" href="/about">
                        About
                    </Link>
                    <Link className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium" href="/contact">
                        Contact
                    </Link>
                    <Button as="a" href="/auth" className="w-full text-center mt-2" color="primary">
                        Login / Signup
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
