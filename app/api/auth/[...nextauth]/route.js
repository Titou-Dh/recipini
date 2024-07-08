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
    },
    callbacks: {
        async session({ session, token }) {
            // Store the user id from MongoDB to session
            if (token.id) {
                session.user.id = token.id;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async signIn({ user, account, profile }) {
            const client = await connectToDB();


            const userExists = await User.findOne({ email: user.email });
            if (!userExists) {
                await User.create({
                    email: user.email,
                    name: user.name,
                    image: `/assets/default-pic.png`, // Generate avatar based on the first character of the name
                    createdAt: new Date(),
                });
            }

            client.close();
            return true;
        },
    },

    debug: true,
});

export { handler as GET, handler as POST };
