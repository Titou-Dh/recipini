import User from "@/models/User";
import { connectToDB } from "@/utils/db";

export const POST = async (req, res) => {
    const {idUser} = await req.json();
    console.log(idUser);
    await connectToDB();

    const user = await User.findById({_id:idUser});
    if (!user) {
        return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ user }), { status: 200 });

}


