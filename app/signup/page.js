"use client";

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { signIn, getProviders } from "next-auth/react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [providers, setProviders] = useState(null);
    const router = useRouter();
    const { data: session, status } = useSession();


    const handleSignUp = async () => {
        try {
            console.log(username, email, password);
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            if (res.ok) {
                router.push("/login");
            } else {
                const data = await res.json();
                setMessage(data.message);
            }
        } catch (error) {
            console.error("error signing up :", error);
            setMessage("Something went wrong");
        }
    };



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
                <div className="mx-auto max-w-sm">
                    <div className="text-center grid gap-2 ">
                        <div className="text-3xl font-bold my-3">Sign Up</div>
                        <p className="text-balance text-muted-foreground mt-2 mb-5">
                            Enter your information to create an account
                        </p>
                    </div>
                    <div>
                        <div className="grid gap-4">

                            <div className="grid gap-2">
                                <Label htmlFor="first-name">Username</Label>
                                <Input
                                    id="first-name"
                                    name="username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Max" required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="m@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    name="password"
                                    id="password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                onClick={() => {
                                    handleSignUp();
                                }}
                            >
                                {
                                    status === "loading" ? "Loading..." : "Login"
                                }
                            </Button>
                            <>
                                {providers &&
                                    Object.values(providers).slice(0, 1).map((provider) => (
                                        <Button
                                            variant="outline"
                                            key={provider.name}
                                            onClick={() => {
                                                signIn(provider.id, { callbackUrl: "/login" });
                                            }}
                                            className="w-full"
                                        >
                                            Sign up with {provider.name}
                                        </Button>
                                    ))}
                            </>
                        </div>
                        <div className="my-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="underline">
                                Sign in
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
            </div>
        </div>
    )
}
