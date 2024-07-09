// Using Mongoose for MongoDB
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [String],
    instructions: [String],
    image: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ratings: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, rating: Number }],
    comments: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, comment: String, createdAt: { type: Date, default: Date.now } }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
});

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
