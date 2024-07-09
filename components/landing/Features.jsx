// components/Features.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faStar, faComment, faHeart } from '@fortawesome/free-solid-svg-icons';

const features = [
    {
        icon: faUtensils,
        title: 'Easy Recipe Creation',
        description: 'Create and share your own recipes with our easy-to-use interface.',
    },
    {
        icon: faStar,
        title: 'User Ratings',
        description: 'Rate your favorite recipes and see what others are saying.',
    },
    {
        icon: faComment,
        title: 'Commenting',
        description: 'Engage with the community by commenting on recipes.',
    },
    {
        icon: faHeart,
        title: 'Save Favorites',
        description: 'Save your favorite recipes for quick access anytime.',
    },
];

const Features = () => {
    return (
        <div className="bg-primary dark:bg-transparent bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base text-yellow-600 dark:text-yellow-400  font-semibold tracking-wide uppercase">Features</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Why Choose RecipeShare?</p>
                </div>
                <div className="mt-10">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                        {features.map((feature) => (
                            <div key={feature.title} className="  relative border-primaryL border py-7 px-5 rounded-xl hover:bg-yellow-200 dark:hover:bg-gray-700 transition">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-yellow-500 dark:bg-yellow-400 text-white">
                                        <FontAwesomeIcon icon={feature.icon} className="h-6 w-6" />
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium  text-secondaryL dark:text-primaryL">{feature.title}</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base dark:text-gray-300 text-gray-900">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default Features;
