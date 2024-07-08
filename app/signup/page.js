"use client";
import Image from "next/image"
import Link from "next/link"

import { useEffect, useState } from "react"
import { signIn, getProviders } from "next-auth/react";

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
    const [providers, setProviders] = useState(null);

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
                                <Input id="first-name" placeholder="Max" required />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" />
                            </div>
                            <Button type="submit" className="w-full">
                                Create an account
                            </Button>
                            <>
                                {providers &&
                                    Object.values(providers).map((provider) => (
                                        <Button
                                            variant="outline"
                                            key={provider.name}
                                            onClick={() => {
                                                signIn(provider.id);
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
                            <Link href="#" className="underline">
                                Sign in
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
