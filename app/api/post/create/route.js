import cloudinary from 'cloudinary';
import { connectToDB } from '@/utils/db';
import Recipe from '@/models/Recipe';
import User from '@/models/User';
import { Readable } from 'stream';
import path from 'path';

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

    console.log(title, description, ingredients, instructions, authorId, image);

    if (!image) {
        return new Response(JSON.stringify({ message: 'Image not found' }), { status: 404 });
    }

    await connectToDB();

    const user = await User.findById({ _id: authorId });
    console.log(user, 'user');
    if (!user) {
        return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    // Convert the image to a buffer
    const imageBuffer = Buffer.from(await image.arrayBuffer());

    // Create a stream from the buffer
    const imageStream = Readable.from(imageBuffer);

    const public_id = path.parse(image.name).name;
    // Upload the image stream to Cloudinary

    const uploadStream = await cloudinary.uploader.upload_stream(
        {
            upload_preset: 'ml_default',
            folder: 'recipes',
            use_filename: true,
        }
    );
    await imageStream.pipe(uploadStream);



    console.log(uploadStream, 'uploadStream');


    const newRecipe = await Recipe.create({
        title: title,
        description: description,
        ingredients: ingredients,
        instructions: instructions,
        image: image.name,
        authorId: authorId,
        authorName: user.username,
        authorPic: user.profilePicture
    });

    await newRecipe.save();

    return new Response(JSON.stringify({ message: 'Created successfully' }), { status: 200 });
}














// import { join } from 'path';
// import { writeFile } from 'fs/promises';
// import { connectToDB } from '@/utils/db';
// import Recipe from '@/models/Recipe';
// import User from '@/models/User';




// export async function POST(req, res) {
//     const data = await req.formData();
//     const title = data.get('title');
//     const description = data.get('description');
//     const ingredients = data.get('ingredients');
//     const instructions = data.get('instructions');
//     const authorId = data.get('authorId');
//     const image = data.get('image');

//     console.log(title, description, ingredients, instructions, authorId, image);




//     if (!image){
//         return new Response(JSON.stringify({ message: 'Image not found' }), { status: 404 });
//     }

//     await connectToDB();

//     const user = await User.findById({ _id: authorId });
//     console.log(user, 'user');
//     if (!user) {
//         return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
//     }

//     const newRecipe = await Recipe.create({
//         title: title,
//         description: description,
//         ingredients: ingredients,
//         instructions: instructions,
//         image: image.name,
//         authorId: authorId,
//         authorName: user.username,
//         authorPic: user.profilePicture
//     });

//     await newRecipe.save();


//     const bytes = await image.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const path = join('public', 'uploads', image.name);
//     await writeFile(path, buffer);




//     console.log(path);
//     return new Response(JSON.stringify({ message: 'Created successfully' }), { status: 200 });
// }



