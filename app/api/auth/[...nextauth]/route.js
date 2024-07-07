// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider  from "next-auth/providers/google";
import { connectToDB } from "@/utils/db";
import { verifyPassword } from "@/utils/auth";

const handler =  NextAuth({
    providers: [
        // Providers.Credentials({
        //     async authorize(credentials) {
        //         const client = await connectToDatabase();
        //         const usersCollection = client.db().collection("users");

        //         const user = await usersCollection.findOne({ email: credentials.email });
        //         if (!user) {
        //             client.close();
        //             throw new Error("No user found with the entered email address");
        //         }

        //         const isValid = await verifyPassword(credentials.password, user.password);
        //         if (!isValid) {
        //             client.close();
        //             throw new Error("Could not log you in");
        //         }

        //         client.close();
        //         return { email: user.email };
        //     }
        // }),
        GoogleProvider ({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    database: process.env.MONGODB_URI,
    session: {
        jwt: true,
    },
    callbacks: {
        async session({ session }) {
            // store the user id from MongoDB to session
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();

            return session;
        },
        async jwt(token, user) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        },
        async signIn(user, account, profile) {
            const client = await connectToDB();
            const usersCollection = client.db().collection("users");

            const userExists = await usersCollection.findOne({ email: user.email });
            if (!userExists) {
                await usersCollection.insertOne({
                    email: user.email,
                    name: user.name,
                    image: '/assets/images/default-pic.jpg',
                    createdAt: new Date(),
                });
            }

            client.close();
            return true;
        }
    }
});

export{ handler as GET, handler as POST};