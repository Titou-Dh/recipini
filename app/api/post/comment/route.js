import User from '@/models/User';
import Recipe from '@/models/Recipe';
import { connectToDB } from "@/utils/db";

export const POST = async (req, res) => {
    const { idPost, idUser, comment } = await req.json();
    console.log(idPost, idUser, comment);

    if (!idUser || !idPost || !comment) {
        return new Response(JSON.stringify({ message: 'Missing userId, postId or comment' }), { status: 400 });
    }

    await connectToDB();    

    const user = await User.findById(idUser);
    if (!user) {
        return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    const post = await Recipe.findById({_id:idPost});
    if (!post) {
        return new Response(JSON.stringify({ message: 'Post not found' }), { status: 404 });
    }

    post.comments.push({ user: idUser, comment });
    await post.save();
    return new Response(JSON.stringify({ message: 'Comment added successfully' }), { status: 200 });
}


// export const GET = async (req, res) => {
//     const { idPost } = await req.json();
//     console.log(idPost);

//     await connectToDB();

//     const post = await Recipe.findById(idPost);
//     if (!post) {
//         return new Response(JSON.stringify({ message: 'Post not found' }), { status: 404 });
//     }

//     return new Response(JSON.stringify({ comments: post.comments }), { status: 200 });
// }
