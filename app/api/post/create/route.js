
import multer from 'multer'; // For image upload handling
import connectToDB from '@/utils/db';
import Recipe from '@/models/Recipe';
import User from '@/models/User';



// Multer configuration
const upload = multer({dist: 'public/images'});

// POST /api/post/create

const handler = async (req, res) => {
    try {
        const { title, description, ingredients, instructions, authorId } = req.json();
        // Connect to 
        await connectToDB();

        const uploadImage = upload.single('image');
        uploadImage(req, res, (err) => {
            if (err) {
                console.log(err);
                return new Response(JSON.stringify({ message: 'Image upload failed' }), { status: 500 });
            }
        });


        const user = User.findById(authorId);

        // Get user from database
        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        const newRecipe = await Recipe.create({
            title: title,
            description:description,
            ingredients:ingredients,
            instructions:instructions,
            image: req.file.path,
            author:user
        }); 

        await newRecipe.save();

        return new Response(JSON.stringify(newRecipe), { status: 200 });
    }
    catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
};

export {handler as POST}