import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import { hashSync, genSalt, hash } from "bcryptjs";
export const POST = async (req, res) => {

    try {
        await connectToDB();
        const body = await req.json();
        const { username, email, password } = body;
        console.log(username, email, password,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        if (!username || !email || !password) {
            return new Response("Please fill in all fields", { status: 400 });
        }
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return new Response("User already exists", { status: 400 });
        }
        const salt = await genSalt(10);
        const hashedPassword = hashSync(password, salt);
        await User.create({
            username: username,
            email: email,
            password: hashedPassword,
            profilePicture: `/assets/images/default-pic.jpg`,
            createdAt: new Date(),
        });
        return new Response("Sign up successful", { status: 200 });
    }
    catch (error) {
        console.error("error signing up :", error);
        return new Response("Something went wrong", { status: 500 });
    }
}

