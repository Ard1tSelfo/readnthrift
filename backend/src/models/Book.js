const mongoose = require('mongoose');
const { Int32 } = require('mongodb');

const bookSchema = new mongoose.Schema({
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
        required: true,
    },
    publisher: {
        type: String,
        required: true,
        trim: true
    },
    isbn: {
        type: String,
        required: true,
    },
    pages: {
        type: Number
    }
})


module.exports = mongoose.model('Book', bookSchema);