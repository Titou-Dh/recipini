import { connectToDB } from '@/utils/db';
import User from '@/models/User';
import Recipe from '@/models/Recipe';

export const POST = async (req, res) => {
    try {
        const {idPost, idUser  } = await req.json();
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

        // Add the post to the user's savedPosts if it's not already saved
        if (!user.savedRecipes.includes(idPost)) {
            user.savedRecipes.push(idPost);
            await user.save();
        }else{
            return new Response(JSON.stringify({ message: 'Post already saved' }), { status: 400 });
        }

        return new Response(JSON.stringify({ message: 'Post saved successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error saving post:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
    }
}
