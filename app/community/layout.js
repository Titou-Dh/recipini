"use client"

import Head from 'next/head';
import Nav from '@/components/community/Nav';
import { useSession } from 'next-auth/react';

import {
    AlertDialog,
    AlertDialogAction,

    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import Link from 'next/link';

export function AlertDia() {
    return (
        <AlertDialog defaultOpen={true}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>You are not logged in!</AlertDialogTitle>
                    <AlertDialogDescription>
                        Try to log in to access this feature.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Link href="/signup">
                        <Button variant="outline">signup</Button>
                    </Link>
                    <Link href="/login">
                        <Button>Login</Button>
                    </Link>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}





const Layout = ({ children }) => {
    const { data: session } = useSession();

    return (
        <html>
            <Head>
                <title>Recipini Community</title>
                <meta name="description" content="My Next.js App" />
                <link rel="icon" href="/../favicon.ico" />
            </Head>
            <body className='overflow-x-hidden  '>
                {
                    session ? (
                        <div className='relative overflow-x-hidden m-auto'>
                            <div className=" inset-0 w-screen -top-[95%] fixed flex items-center -left-[40%] justify-center z-0">
                                <div className="bg-primaryL w-96 h-52 rounded-full filter blur-3xl"></div>
                            </div>
                            <div className=" inset-0 w-screen -top-[30%] fixed flex items-center left-[45%] justify-center z-0">
                                <div className="bg-accent w-[40rem] h-[40rem] rounded-full filter blur-3xl"></div>
                            </div>
                            <div className=" inset-0 w-screen  top-[80%] opacity-45 fixed flex items-center -left-[45%] justify-center z-0">
                                <div className="dark:bg-secondaryTextL  w-[40rem] h-[40rem] rounded-full filter blur-3xl"></div>
                            </div>
                            
                            <Nav />
                            <div className='relative min-h-screen z-10 px-10 py-10'>
                                {children}
                            </div>
                        </div>
                    ) : (
                        <AlertDia />
                    )
                }

            </body>
        </html>
    );
};

export default Layout;