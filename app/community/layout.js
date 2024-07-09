import Head from 'next/head';
import Nav from '@/components/community/Nav';

const Layout = ({ children }) => {
    return (
        <html>
            <Head>
                <title>My Next.js App</title>
                <meta name="description" content="My Next.js App" />
                <link rel="icon" href="/../favicon.ico" />
            </Head>
            <body className='overflow-x-hidden '>
                <div className='relative overflow-x-hidden'>
                    <div className="absolute inset-0 w-screen -top-[40%] flex items-center -left-[40%] justify-center z-0">
                        <div className="bg-primaryL w-96 h-52 rounded-full filter blur-3xl"></div>
                    </div>
                    <Nav />
                    <div className='relative min-h-screen z-10 px-10 py-10'>
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
};

export default Layout;