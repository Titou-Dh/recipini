// Using Mongoose for MongoDB
import { Schema, models, model } from 'mongoose';

const recipeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [String],
    instructions: [String],
    image: String,
    authorid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: { type: String, required: true },
    authorPic: { type: String, required: true },
    ratings: [{ user: { type: Schema.Types.ObjectId, ref: 'User' }, rating: Number }],
    comments: [{ user: { type: Schema.Types.ObjectId, ref: 'User' }, comment: String, createdAt: { type: Date, default: Date.now } }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
});

const Recipe = models.Recipe || model('Recipe', recipeSchema);

export default Recipe;
