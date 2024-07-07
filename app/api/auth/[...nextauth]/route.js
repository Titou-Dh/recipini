// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider  from "next-auth/providers/google";
import { connectToDatabase } from "@/utils/db";
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
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    database: process.env.MONGODB_URI,
    session: {
        jwt: true,
    },
    callbacks: {
        async session(session, token) {
            session.userId = token.sub;
            return session;
        },
        async jwt(token, user) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        },
    }
});

export{ handler as GET, handler as POST};