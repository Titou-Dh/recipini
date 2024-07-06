
const steps = [
    {
        number: '1',
        title: 'Create an Account',
        description: 'Sign up to start sharing and discovering recipes.',
    },
    {
        number: '2',
        title: 'Find Recipes',
        description: 'Browse through our collection of delicious recipes.',
    },
    {
        number: '3',
        title: 'Share Your Recipes',
        description: 'Contribute your own recipes to the community.',
    },
    {
        number: '4',
        title: 'Rate and Comment',
        description: 'Engage with other users by rating and commenting on recipes.',
    },
];

const HowItWorks = () => {
    return (
        <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base text-yellow-600 font-semibold tracking-wide uppercase">How It Works</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">Getting Started is Easy</p>
                </div>
                <div className="mt-10">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                        {steps.map((step) => (
                            <div key={step.number} className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-full bg-yellow-500 text-white">
                                        <span className="text-lg font-bold">{step.number}</span>
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{step.title}</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">{step.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
