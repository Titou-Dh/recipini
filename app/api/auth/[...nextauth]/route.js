import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/db";
import User from "@/models/User"; // Import your User model
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";



const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await connectToDB();

                const user = await User.findOne({ email: credentials.email });
                console.log(user, 'user')

                if (!user) {
                    throw new Error("No user found with the email");
                }

                const isValid = await compare(credentials.password, user.password);

                if (!isValid) {
                    throw new Error("Password is incorrect");
                }

                return user;
            }
        }),
    ],
    session: {
        strategy: 'jwt',
        jwt: true,
    },
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();
            session.user.username = sessionUser.username;
            session.user.image = sessionUser.profilePicture;
            session.user.email = sessionUser.email;

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
                await connectToDB();
                const userExists = await User.findOne({ email: profile.email });
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name,
                        password: "123456789", // No password since it's a social login
                        profilePicture: `/assets/images/default-pic.jpg`, // Generate avatar based on the first character of the name
                        createdAt: new Date(),
                    });
                }

                return true;
            } catch (error) {
                console.error("error signing in :", error);
                return false;
            }

        },

    },
    debug: true,
});

export { handler as GET, handler as POST };
