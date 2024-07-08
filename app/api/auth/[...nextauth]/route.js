import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/db";
import User from "@/models/User"; // Import your User model

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    session: {
        strategy: 'jwt',
        jwt: true,
    },
    callbacks: {
        async session({ session, token }) {
            // Store the user id from MongoDB to session
            if (token.id) {
                session.user.id = token.id;
                session.user.username = token.username;
                session.user.email = token.email;
                session.user.profilePicture = token.profilePicture;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async signIn({ profile }) {
            try {
                const client = await connectToDB();
                const userExists = await User.findOne({ email: profile.email });
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name,
                        password: "123456789", // No password since it's a social login
                        profilePicture: `/assets/default-pic.png`, // Generate avatar based on the first character of the name
                        createdAt: new Date(),
                    });
                }

                return true;
            }catch (error) {
                console.error("error signing in :",error);
                return false;
            }

        },
    },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error',
        verifyRequest: '/auth/verify-request',
        newUser: null,
    },

    debug: true,
});

export { handler as GET, handler as POST };
