"use client";
import Image from "next/image"
import Link from "next/link"

import { useEffect, useState } from "react"
import { signIn, getProviders, useSession, signUp } from "next-auth/react";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [providers, setProviders] = useState(null);
    const { data: session } = useSession();


    useEffect(() => {
        (async () => {
            const res = await getProviders();
            console.log(res);
            setProviders(res);
        })();
    }, []);
    return (
        <div className="w-full overflow-hidden lg:grid lg:min-h-[600px] lg:grid-cols-2 max-h-screen ">
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/assets/images/signup.jpg"
                    alt="Image"
                    width="1080"
                    height="1080"
                    className="h-screen object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
            <div className="flex items-center justify-center py-12">
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">Sign Up</CardTitle>
                        <CardDescription>
                            Enter your information to create an account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">

                            <div className="grid gap-2">
                                <Label htmlFor="first-name">Username</Label>
                                <Input
                                    id="first-name"
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Max" required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                onClick={() => {
                                    signUp({
                                        username,
                                        email,
                                        password,
                                    }, { callbacUrl: '/' })
                                }}
                            >
                                Create an account
                            </Button>
                            <>
                                {providers &&
                                    Object.values(providers).map((provider) => (
                                        <Button
                                            variant="outline"
                                            key={provider.name}
                                            onClick={() => {
                                                signUp(provider.id, { callbackUrl: "/success" });
                                            }}
                                            className="w-full"
                                        >
                                            Sign up with {provider.name}
                                        </Button>
                                    ))}
                            </>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="underline">
                                Sign in
                            </Link>
                        </div>
                        {session && (
                            <div className="mt-4 text-center text-sm">
                                {session?.user.id}
                                hello {session?.user.email}, you are signed in with name{" "}    {session?.user.username}
                                and image <Image src={session?.user.image} alt="profile" width="30" height="30" />
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
