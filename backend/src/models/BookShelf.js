const mongoose = require('mongoose');

const bookshelfSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    books: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Book',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        trim: true
    }
})

module.exports = mongoose.model('Bookshelf', bookshelfSchema);
