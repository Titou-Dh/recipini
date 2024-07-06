// components/Testimonials.js
const testimonials = [
    {
        name: 'Jane Doe',
        feedback: 'RecipeShare has transformed the way I cook. The recipes are easy to follow and the community is fantastic!',
        image: '/images/jane.jpg',
    },
    {
        name: 'John Smith',
        feedback: 'I love being able to share my recipes with others and get feedback from fellow food enthusiasts.',
        image: '/images/john.jpg',
    },
];

const Testimonials = () => {
    return (
        <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base text-yellow-600 font-semibold tracking-wide uppercase">Testimonials</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">What Our Users Say</p>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.name} className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden p-6">
                            <div className="relative h-24 w-24 mx-auto mb-4">
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-full"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-medium text-gray-900">{testimonial.name}</h3>
                                <p className="mt-2 text-base text-gray-500">{testimonial.feedback}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
