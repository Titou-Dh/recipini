import Head from 'next/head';
import Nav from '@/components/community/Nav';

const Layout = ({ children }) => {
    return (
        <div>
            <Head>
                <title>My Next.js App</title>
                <meta name="description" content="My Next.js App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav />


            {children}

        </div>
    );
};

export default Layout;