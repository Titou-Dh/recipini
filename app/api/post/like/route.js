import { connectToDB } from '@/utils/db';
import User from '@/models/User';
import Recipe from '@/models/Recipe';
import nextAuth from 'next-auth';


export const GET = async (req, { params }) => {
    const  idPost = await params.idPost
    const  idUser = await params.idUser
    console.log(idPost, idUser);

    await connectToDB();

    const user = await User.findById(idUser);
    if (!user) {
        return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    const post = await Recipe.findById(idPost);
    if (!post) {
        return new Response(JSON.stringify({ message: 'Post not found' }), { status: 404 });
    }

    if (post.likes.includes(idUser)) {
        return new Response(JSON.stringify({ message: 'Post liked' }), { status: 200 });
    }

}





export const POST = async (req, res) => {
    try {
        const { idPost, idUser } = await req.json();
        console.log(idPost, idUser);

        if (!idUser || !idPost) {
            return new Response(JSON.stringify({ message: 'Missing userId or postId' }), { status: 400 });
        }

        await connectToDB();

        const user = await User.findById(idUser);
        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        const post = await Recipe.findById(idPost);
        if (!post) {
            return new Response(JSON.stringify({ message: 'Post not found' }), { status: 404 });
        }

        if (!post.likes.includes(idUser)) {
            post.likes.push(idUser);
            await post.save();
            return new Response(JSON.stringify({ message: 'Post liked successfully' }), { status: 200 });
        } else {
            post.likes = post.likes.filter((like) => like.toString() !== idUser);
            console.log(post.likes);
            await post.save();
            return new Response(JSON.stringify({ message: 'Post unliked successfully' }), { status: 400 });
        }

        // nextAuth.session({ session }) => {
        //     const sessionUser = await User.findOne({ email: session.user.email });
        //     session.user.id = sessionUser._id.toString();
        //     session.user.username = sessionUser.username;
        //     session.user.image = sessionUser.profilePicture;
        //     session.user.email = sessionUser.email;
        //     session.user.savedRecipes = sessionUser.savedRecipes;
        //     return session;
        // }


    } catch (error) {
        console.error('Error saving post:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
    }
}
