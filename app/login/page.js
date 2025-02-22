"use client";



import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"



import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleLogin = async () => {
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res.error) {
            setMessage(res.error);
        } else {
            router.push("/community");
        }
    };




    return (
        <div className="w-full overflow-hidden lg:grid lg:min-h-[600px] lg:grid-cols-2 max-h-screen ">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="/forgot-password"
                                    className="ml-auto inline-block text-sm underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            onClick={handleLogin}

                        >
                            Login
                        </Button>
                        <Button onClick={
                            () => {
                                signIn('google', { callbackUrl: '/' })
                            }}
                            variant="outline"
                            className="w-full">
                            Login with Google
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="underline">
                            {
                                status === "loading" ? "Loading..." : "Sign up"
                            }
                        </Link>
                    </div>
                    {message && (
                        <Alert variant="destructive">
                            <ExclamationTriangleIcon className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {message}
                            </AlertDescription>
                        </Alert>
                    )}

                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/assets/images/login.jpg"
                    alt="Image"
                    width="1080"
                    height="1080"
                    className="h-screen object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
