import cloudinary from 'cloudinary';
import { connectToDB } from '@/utils/db';
import Recipe from '@/models/Recipe';
import User from '@/models/User';

import { Readable } from 'stream';



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

    const result = await cloudinary.v2.uploader.upload_stream({ public_id: public_id }, function (error, result) {
        if (error) {
            console.error(error);
            return new Response(JSON.stringify({ message: 'Image not uploaded' }), { status: 404 });
        }
        console.log(result, 'result');
        return result;
    }
    );

    const readabletream = Readable.from(image.stream());
    readabletream.pipe(result);

    const url =  result.secure_url;
    console.log(url, 'url');
    console.log(public_id, 'public_id');

    const newRecipe = await Recipe.create({
        title: title,
        description: description,
        ingredients: ingredients,
        instructions: instructions,
        image: public_id,
        authorId: authorId,
        authorName: user.username,
        authorPic: user.profilePicture
    });

    await newRecipe.save();

    return new Response(JSON.stringify({ message: 'Created successfully' }), { status: 200 });
}


