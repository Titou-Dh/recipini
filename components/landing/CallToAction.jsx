// components/CallToAction.js
import { Button } from '@/components/ui/button';

const CallToAction = () => {
    return (
        <div className="bg-gray-800 py-16 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">Ready to Get Started?</p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">Join Recipini today and explore the world of delicious recipes!</p>
                    <div className="mt-6">
                        <Button as="a" href="/auth" className="ml-4" color="primary">
                            Sign Up Now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallToAction;
