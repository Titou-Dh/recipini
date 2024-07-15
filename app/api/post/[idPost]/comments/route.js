import Recipe from "@/models/Recipe";
import { connectToDB } from "@/utils/db";

const GET = async (req, { params }) => {
    const { idPost } = await params.idPost;
    console.log(idPost);
    await connectToDB();
    const post = await Recipe.findById({ _id: idPost });
    if (!post) {
        return new Response(JSON.stringify({ message: 'Post not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ comments: post.comments }), { status: 200 });

}
