const mongoose = require('mongoose');

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
    }
})

module.exports = mongoose.model('Book', bookSchema); 