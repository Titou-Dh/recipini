// components/Hero.js
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Hero = () => {
    return (
        <div className=" overflow-hidden flex md:flex-row flex-col items-center  px-52">

            <div className="max-w-7xl py-16   sm:py-44 ">
                <h1 className="text-4xl font-extrabold text-primaryL sm:text-5xl lg:text-6xl">
                    Welcome to RecipeShare
                </h1>
                <p className="mt-6  text-xl text-text max-w-3xl mx-auto">
                    Discover and share your favorite recipes with our community of food enthusiasts.
                </p>
                <div className="mt-10">
                    <Button as="a" href="/browse" className="" color="primary">
                        Browse Recipes
                    </Button>
                </div>
            </div>
            <Image
                    src="/assets/images/Recipe book-pana.svg" // Replace with your image path
                    alt="Delicious food"

                    objectFit="cover"

                    width={500}
                    height={500}
                />
        </div>
    );
};

export default Hero;
