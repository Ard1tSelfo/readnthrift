const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    thumbnail: {
        type: String,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
    },
    publisher: {
        type: String,
        trim: true
    },
    isbn: {  
        type: String,
    },
    pages: {
        type: Number
    },
    publication: {
        type: Number
    },
    description: {
        type: String,
        trim: true
    },
    reviews: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Review',
    },
    tags: {
        type: [String],
    }
})

module.exports = mongoose.model('Book', bookSchema); 