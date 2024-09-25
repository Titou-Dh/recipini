'use client';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useRouter } from "next/navigation";


function AlertDia() {
    const Router = useRouter();
    const handeChange1 = () => {
        Router.push('/signup');
    }
    const handleChange2 = () => {
        Router.push('/login');
    }
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
                    <div onClick={handeChange1}>
                        <Button variant="outline">signup</Button>
                    </div>
                    <div onClick={handleChange2}>
                        <Button>Login</Button>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertDia; 
