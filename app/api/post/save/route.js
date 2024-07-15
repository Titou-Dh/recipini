import { connectToDB } from '@/utils/db';
import User from '@/models/User';
import Recipe from '@/models/Recipe';

export const POST = async (req, res) => {
    try {
        const { userId, postId } = await req.json();

        if (!userId || !postId) {
            return new Response(JSON.stringify({ message: 'Missing userId or postId' }), { status: 400 });
        }

        await connectToDB();

        const user = await User.findById(userId);
        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        const post = await Recipe.findById(postId);
        if (!post) {
            return new Response(JSON.stringify({ message: 'Post not found' }), { status: 404 });
        }

        // Add the post to the user's savedPosts if it's not already saved
        if (!user.savedPosts.includes(postId)) {
            user.savedPosts.push(postId);
            await user.save();
        }

        return new Response(JSON.stringify({ message: 'Post saved successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error saving post:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
    }
}
