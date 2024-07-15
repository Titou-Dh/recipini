import cloudinary from 'cloudinary';
import { connectToDB } from '@/utils/db';
import Recipe from '@/models/Recipe';
import User from '@/models/User';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { url } from 'inspector';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const POST = async (req, res) => {
    const data = await req.formData();
    const title = data.get('title');
    const description = data.get('description');
    const ingredients = data.get('ingredients');
    const instructions = data.get('instructions');
    const authorId = data.get('authorId');
    const image = data.get('image');



    if (!image) {
        return new Response(JSON.stringify({ message: 'Image not found' }), { status: 404 });
    }

    await connectToDB();

    const user = await User.findById({ _id: authorId });
    if (!user) {
        return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    const public_id = Math.random().toString(36).substring(2, 14);
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join('public', 'uploads', image.name);
    await writeFile(path, buffer);
    const image_path = path
    await cloudinary.v2.uploader.upload(image_path, { public_id: public_id }, function (error, result) {
        if (error) {
            console.error(error);
            return new Response(JSON.stringify({ message: 'Image not uploaded' }), { status: 404 });
        }
        console.log(result, 'result');
        const url = result.url;
    }
    );
    console.log(public_id, 'public_id');
    console.log(image_path, 'image_path');
    const newRecipe = await Recipe.create({
        title: title,
        description: description,
        ingredients: ingredients,
        instructions: instructions,
        image: url,
        authorId: authorId,
        authorName: user.username,
        authorPic: user.profilePicture
    });

    await newRecipe.save();

    return new Response(JSON.stringify({ message: 'Created successfully' }), { status: 200 });
}


