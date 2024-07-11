
import multer from 'multer'; // For image upload handling
import { connectToDB } from '@/utils/db';
import Recipe from '@/models/Recipe';
import User from '@/models/User';



// Multer configuration
const upload = multer({ dist: 'public/images' });

// POST /api/post/create

const handler = async (req, res) => {
    try {
        const { title, description, ingredients, instructions, authorId, images } = req.json();
        // Connect to 
        await connectToDB();
        console.log(images, "images");
        console.log(images[0], "images[0]");
        console.log(images[0].path, "images[0].path");
        console.log(req.json(), "req.json()");


        const image = images[0];


        upload.single('image')(req, res, (err) => {
            if (err) {
                console.log(err);
                return new Response(JSON.stringify({ message: 'Image upload failed' }), { status: 500 });
            }
        }
        );



        // Check if user exists

        const user = User.findById(authorId);

        // Get user from database
        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        const newRecipe = await Recipe.create({
            title: title,
            description: description,
            ingredients: ingredients,
            instructions: instructions,
            image: req.file.path,
            author: user
        });

        await newRecipe.save();

        return new Response(JSON.stringify(newRecipe), { status: 200 });
    }
    catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
};

export { handler as POST }