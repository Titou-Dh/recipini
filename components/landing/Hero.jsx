// components/Hero.js
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
    return (
        <div className="relative overflow-hidden logo-light  flex md:flex-row flex-col items-center min-h-screen px-20 md:px-52">
            <div className="absolute inset-0 w-screen top-[50%] flex items-center left-[20%] justify-center">
                <div className="bg-primaryL w-96 h-52 rounded-full filter blur-3xl"></div>
            </div>
            <div className="absolute inset-0 w-screen flex items-center left-[38%] justify-center">
                <div className="bg-primary w-96 h-52 rounded-full filter blur-3xl"></div>
            </div>
            <div className="py-16 md:py-44 z-20">
                <h1 className="text-4xl font-extrabold text-primaryL sm:text-5xl lg:text-6xl">
                    Welcome to Recipini
                </h1>
                <p className="mt-6 text-xl text-text max-w-3xl mx-auto">
                    Discover and share your favorite recipes with our community of food enthusiasts.
                </p>
                <div className="mt-10">
                    <Link href="/community" className={buttonVariants({ variant: "default" })}>Browse Recipes</Link>
                </div>
            </div>
            <Image
                src="/assets/images/Recipe book-pana.svg" // Replace with your image path
                alt="Delicious food"
                className="z-10 w-auto h-auto"
                width={500}
                height={500}
            />
        </div>
    );
};

export default Hero;
