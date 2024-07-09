import { Button } from '@/components/ui/button';

const Footer = () => {
    return (
        <footer className="bg-gray-800 dark:bg-gray-900 relative overflow-hidden z-10">
            <div className="absolute inset-0 w-screen top-[50%] flex items-center left-[45%] opacity-90 justify-center z-0">
                <div className="bg-primaryL dark:bg-primaryD w-96 h-52 rounded-full filter blur-3xl"></div>
            </div>
            <div className="absolute inset-0 w-screen top-[10%] flex items-center -left-[10%] opacity-90 justify-center z-0">
                <div className="bg-backgroundL dark:bg-backgroundD w-44 h-36 rounded-full filter blur-3xl"></div>
            </div>
            <div className="relative z-20">
                <div className="bg-transparent dark:bg-transparent py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white dark:text-gray-200 sm:text-4xl">Ready to Get Started?</p>
                            <p className="mt-4 max-w-2xl text-xl text-gray-300 dark:text-gray-400 mx-auto">Join Recipini today and explore the world of delicious recipes!</p>
                            <div className="mt-6">
                                <Button as="a" href="/auth" className="ml-4" color="primary">
                                    Sign Up Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="md:flex md:justify-between md:items-center">
                        <div className="flex justify-center md:order-2">
                            <a href="#" className="text-backgroundL dark:text-gray-300 hover:text-gray-300 ml-4">
                                <span className="sr-only">Twitter</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M21.938 5.262a8.64 8.64 0 0 1-2.48.678 4.296 4.296 0 0 0 1.89-2.38 8.582 8.582 0 0 1-2.723 1.04 4.298 4.298 0 0 0-7.316 3.912 12.18 12.18 0 0 1-8.855-4.49 4.298 4.298 0 0 0 1.327 5.726A4.267 4.267 0 0 1 2 8.442v.054a4.297 4.297 0 0 0 3.437 4.203 4.276 4.276 0 0 1-1.933.073 4.298 4.298 0 0 0 4.014 2.983 8.615 8.615 0 0 1-5.331 1.84c-.347 0-.691-.02-1.033-.06a12.159 12.159 0 0 0 6.573 1.928c7.89 0 12.2-6.535 12.2-12.205 0-.187-.004-.372-.013-.556a8.729 8.729 0 0 0 2.137-2.235z"
                                    />
                                </svg>
                            </a>
                            <a href="#" className="text-backgroundL dark:text-gray-300 hover:text-gray-300 ml-4">
                                <span className="sr-only">Facebook</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M22.676 0H1.324A1.327 1.327 0 0 0 0 1.324v21.352C0 23.4.6 24 1.324 24h11.491V14.706h-3.13v-3.734h3.13V8.067c0-3.097 1.893-4.782 4.655-4.782 1.324 0 2.463.097 2.795.14v3.24l-1.917.001c-1.502 0-1.793.713-1.793 1.76v2.305h3.584l-.467 3.734h-3.117V24h6.116A1.327 1.327 0 0 0 24 22.676V1.324A1.327 1.327 0 0 0 22.676 0"
                                    />
                                </svg>
                            </a>
                            <a href="#" className="text-backgroundL dark:text-gray-300 hover:text-gray-300 ml-4">
                                <span className="sr-only">Instagram</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.95.246 2.403.414a4.602 4.602 0 0 1 1.66.943 4.602 4.602 0 0 1 .943 1.659c.168.453.36 1.233.414 2.403.059 1.267.07 1.647.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.246 1.95-.414 2.403a4.616 4.616 0 0 1-.943 1.66 4.612 4.612 0 0 1-1.66.943c-.453.168-1.233.36-2.403.414-1.267.059-1.647.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.95-.246-2.403-.414a4.598 4.598 0 0 1-1.66-.943 4.598 4.598 0 0 1-.943-1.66c-.168-.453-.36-1.233-.414-2.403-.059-1.267-.07-1.647-.07-4.85s.012-3.584.07-4.85c.054-1.17.246-1.95.414-2.403a4.6 4.6 0 0 1 .943-1.66 4.598 4.598 0 0 1 1.66-.943c.453-.168 1.233-.36 2.403-.414 1.267-.059 1.647-.07 4.85-.07zm0-2.163C8.756 0 8.336.013 7.05.072 5.757.131 4.737.322 3.867.6 2.957.89 2.11 1.345 1.345 2.11.89 2.957.6 3.867.322 4.737.131 5.757.072 6.178.072 12s.013 6.243.072 7.522c.059 1.29.246 2.31.525 3.18.29.91.745 1.757 1.51 2.522.765.765 1.612 1.22 2.522 1.51.87.279 1.89.466 3.18.525C8.336 23.987 8.756 24 12 24s3.243-.013 4.522-.072c1.29-.059 2.31-.246 3.18-.525.91-.29 1.757-.745 2.522-1.51.765-.765 1.22-1.612 1.51-2.522.279-.87.466-1.89.525-3.18C23.987 15.664 24 15.244 24 12s-.013-3.243-.072-4.522c-.059-1.29-.246-2.31-.525-3.18a4.6 4.6 0 0 0-1.51-2.522 4.596 4.596 0 0 0-2.522-1.51c-.87-.279-1.89-.466-3.18-.525C15.664.013 15.244 0 12 0z"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0-2.879 1.44 1.44 0 0 0 0 2.879z"
                                    />
                                </svg>
                            </a>
                        </div>
                        <div className="mt-8 md:mt-0 md:order-1">
                            <p className="text-center text-base text-gray-400 dark:text-gray-500">
                                &copy; 2024 Recipini, Inc. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
