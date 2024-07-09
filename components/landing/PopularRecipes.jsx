// components/PopularRecipes.js
import Image from 'next/image';

const recipes = [
    {
        title: 'Spaghetti Carbonara',
        description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
        image: '/assets/images/carbonara.jpg',
    },
    {
        title: 'Chicken Alfredo',
        description: 'A creamy pasta dish made with chicken, cream, and parmesan cheese.',
        image: '/assets/images/chicken-alfredo.jpg',
    },
    {
        title: 'Beef Tacos',
        description: 'Delicious beef tacos with fresh salsa and guacamole.',
        image: '/assets/images/beef-tacos.jpg',
    },
];

const PopularRecipes = () => {
    return (
        <div className="bg-white dark:bg-transparent py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base text-yellow-600 dark:text-yellow-400 font-semibold tracking-wide uppercase">Popular Recipes</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">Most Loved Recipes</p>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {recipes.map((recipe) => (
                        <div key={recipe.title} className="flex flex-col bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
                            <div className="relative h-48">
                                <Image
                                    src={recipe.image}
                                    alt={recipe.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="w-full h-full"
                                />
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{recipe.title}</h3>
                                <p className="mt-2 text-base text-gray-500 dark:text-gray-300">{recipe.description}</p>
                                <a href="#" className="mt-4 text-yellow-600 dark:text-yellow-400 hover:text-yellow-500 font-medium">View Recipe</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopularRecipes;
