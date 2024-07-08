// Using Mongoose for MongoDB
const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
    rating: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Rating = mongoose.models.Rating || mongoose.model('Rating', ratingSchema);

module.exports = Rating;
