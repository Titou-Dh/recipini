import Link from "next/link"
// import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import Image from "next/image"
import { Button } from "@/components/ui/button"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBookmark, faHouse,faPlus } from '@fortawesome/free-solid-svg-icons';


// export default function Nav() {
//     return (
//         <div className="flex items-center md:justify-center justify-between gap-12 px-4 py-2 lg:px-40 sm:px-2 bg-backgroundL shadow-lg dark:bg-gray-800">
//             <Link href="#" className="flex items-center gap-2" prefetch={false}>
//                 <Image width={120} height={36} src="/assets/images/logo-light.png" />
//                 <span className="text-lg font-semibold"></span>
//             </Link>
//             <div className="hidden md:flex text-text gap-8">
//                 <Link href="#" className="text-lg font-medium hover:underline underline-offset-4 flex  gap-4"  prefetch={false}>
//                     <FontAwesomeIcon icon={faHouse} className="h-6 w-6" />
//                     Browse
//                 </Link>
//                 <Link href="#" className="text-lg font-medium hover:underline underline-offset-4 flex gap-4" prefetch={false}>
//                     <FontAwesomeIcon icon={faPlus} className="h-6 w-6" />
//                     Create
//                 </Link>
//                 <Link href="#" className="text-lg font-medium hover:underline underline-offset-4 flex gap-4" prefetch={false}>
//                     <FontAwesomeIcon icon={faBookmark} className="h-6 w-6" />
//                     Savings
//                 </Link>
//                 <Link href="#" className="text-lg font-medium hover:underline underline-offset-4 flex gap-4" prefetch={false}>
//                     <FontAwesomeIcon icon={faUser} className="h-6 w-6" />
//                     Profile
//                 </Link>
//             </div>
//             <Sheet>
//                 <SheetTrigger asChild>
//                     <Button variant="outline" size="icon" className="lg:hidden">
//                         <MenuIcon className="h-6 w-6" />
//                         <span className="sr-only">Toggle navigation menu</span>
//                     </Button>
//                 </SheetTrigger>
//                 <SheetContent side="left">
//                     <div className="grid w-[200px] p-4">
//                     <Link href="#" className="text-lg font-medium hover:underline underline-offset-4 flex  gap-4"  prefetch={false}>
//                     <FontAwesomeIcon icon={faHouse} className="h-6 w-6" />
//                     Browse
//                 </Link>
//                 <Link href="#" className="text-lg font-medium hover:underline underline-offset-4 flex gap-4" prefetch={false}>
//                     <FontAwesomeIcon icon={faPlus} className="h-6 w-6" />
//                     Create
//                 </Link>
//                 <Link href="#" className="text-lg font-medium hover:underline underline-offset-4 flex gap-4" prefetch={false}>
//                     <FontAwesomeIcon icon={faBookmark} className="h-6 w-6" />
//                     Savings
//                 </Link>
//                 <Link href="#" className="text-lg font-medium hover:underline underline-offset-4 flex gap-4" prefetch={false}>
//                     <FontAwesomeIcon icon={faUser} className="h-6 w-6" />
//                     Profile
//                 </Link> 


//                     </div>
//                 </SheetContent>
//             </Sheet>
//         </div>
//     )
// }

// function MenuIcon(props) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <line x1="4" x2="20" y1="12" y2="12" />
//             <line x1="4" x2="20" y1="6" y2="6" />
//             <line x1="4" x2="20" y1="18" y2="18" />
//         </svg>
//     )
// }



import React from 'react'

function Nav() {
    return (
        <div className='md:w-max z-50  w-[90%]  fixed bottom-5 mx-auto left-1/2 transform -translate-x-1/2 navbar-blur border px-4 py-2 rounded-xl'>
            <div className="flex items-center justify-around md:justify-between gap-4">
                <Link href="#" className="flex items-center gap-2" prefetch={false}>
                    <Image width={90} height={36} src="/assets/images/logo-light.png" />
                    <span className="text-lg font-semibold"></span>
                </Link>
                <Link href="#" className="text-lg hover:scale-[1.1] transition-all font-medium hover:underline underline-offset-4 flex  gap-2" prefetch={false}>
                    <FontAwesomeIcon icon={faHouse} className="h-6 w-6" />
                    <span className="hidden md:flex">Browse</span>
                </Link>
                <Link href="#" className="text-lg hover:scale-[1.1] transition-all font-medium hover:underline underline-offset-4 flex gap-2" prefetch={false}>
                    <FontAwesomeIcon icon={faPlus} className="h-6 w-6" />
                    <span className="hidden md:flex">Create</span>
                </Link>
                <Link href="#" className="text-lg hover:scale-[1.1] transition-all font-medium hover:underline underline-offset-4 flex gap-2" prefetch={false}>
                    <FontAwesomeIcon icon={faBookmark} className="h-6 w-6" />
                    
                    <span className="hidden md:flex">Savings</span>
                </Link>
                <Link href="#" className="text-lg hover:scale-[1.1] transition-all font-medium hover:underline underline-offset-4 flex gap-2" prefetch={false}>
                    <FontAwesomeIcon icon={faUser} className="h-6 w-6" />
                    <span className="hidden md:flex">Profile</span>
                    
                </Link>
            </div>
        </div>
    )
}

export default Nav
