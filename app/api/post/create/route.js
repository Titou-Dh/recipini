import { join } from 'path';
import { writeFile } from 'fs/promises';
import { connectToDB } from '@/utils/db';
import Recipe from '@/models/Recipe';
import User from '@/models/User';


// import multer from 'multer'; // For image upload handling



// // Multer configuration
// const upload = multer({ dist: 'public/images' });

// // POST /api/post/create

// const handler = async (req, res) => {
//     try {
//         const { title, description, ingredients, instructions, authorId, images } = req.json();
//         // Connect to 
//         await connectToDB();
//         console.log(images, "images");
//         console.log(images[0], "images[0]");
//         console.log(images[0].path, "images[0].path");
//         console.log(req.json(), "req.json()");


//         const image = images[0];


//         upload.single('image')(req, res, (err) => {
//             if (err) {
//                 console.log(err);
//                 return new Response(JSON.stringify({ message: 'Image upload failed' }), { status: 500 });
//             }
//         }
//         );



//         // Check if user exists

//         const user = User.findById(authorId);

//         // Get user from database
//         if (!user) {
//             return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
//         }

//         const newRecipe = await Recipe.create({
//             title: title,
//             description: description,
//             ingredients: ingredients,
//             instructions: instructions,
//             image: req.file.path,
//             author: user
//         });

//         await newRecipe.save();

//         return new Response(JSON.stringify(newRecipe), { status: 200 });
//     }
//     catch (error) {
//         return new Response(JSON.stringify(error), { status: 500 });
//     }
// };

// export { handler as POST }

export async function POST(req, res) {
    const data = await req.formData();
    const title = data.get('title');
    const description = data.get('description');
    const ingredients = data.get('ingredients');
    const instructions = data.get('instructions');
    const authorId = data.get('authorId');
    const image = data.get('image');

    console.log(title, description, ingredients, instructions, authorId, image);




    if (!image){
        return new Response(JSON.stringify({ message: 'Image not found' }), { status: 404 });
    }

    await connectToDB();

    const user = await User.findById({ _id: authorId });
    console.log(user, 'user');
    if (!user) {
        return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

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


    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = join('public', 'uploads', image.name);
    await writeFile(path, buffer);




    console.log(path);
    return new Response(JSON.stringify({ message: 'Created successfully' }), { status: 200 });
}
