import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import { hashSync, genSalt } from "bcryptjs";
export const POST = async (req, res) => {

    try {
        await connectToDB();
        const { username, email, password } = req.body;
        console.log(username, email, password,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        if (!username || !email || !password) {
            res.status(400).json({ message: "Please fill in all fields" });
        }
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            res.status(400).json({ message: "User already exists" });
        }
        // const salt = await genSalt(10);
        // const hashedPassword = hashSync(password, salt);
        await User.create({
            username: username,
            email: email,
            password: password,
            profilePicture: `/assets/images/default-pic.jpg`,
            createdAt: new Date(),
        });
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.error("error signing up :", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

