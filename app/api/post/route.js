import Recipe from "@/models/Recipe";
import { connectToDB } from "@/utils/db";


export const GET = async (request) => {
    try {
        await connectToDB();
        
        const posts = await Recipe.find().populate('author');
        return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        return new Response("failed to fetch prompts", { status: 500 });
    }
}