
import multer from 'multer'; // For image upload handling
import connectDB from '@/utils/db';
import Recipe from '@/models/Recipe';
import User from '@/models/User';



// Multer configuration
const upload = multer({dist: 'public/images'});

// POST /api/post/create

const handler = async () => {
    try {
        // Connect to database
        await connectDB();

        const uploadImage = util.promisify(upload.single('image'));
        await uploadImage(req, res);

        console.log(req.body);
        console.log(req.file);

        const user = User.findById(req.body.authorId);

        // Get user from database
        if (!user) {
            return new Response(404).json({ message: 'User not found' });
        }
        const newRecipe = new Recipe({
            title: req.body.title,
            description: req.body.description,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            image: req.file ? `/images/${req.file.filename}` : '',
            author: user,
        });

        // Save recipe to database
        await newRecipe.save();

        return new Response(200).json({ message: 'Recipe created successfully' });
    }
    catch (error) {
        return new Response(500).json({ message: 'Error creating recipe' });
    }
};

export {handler as POST}