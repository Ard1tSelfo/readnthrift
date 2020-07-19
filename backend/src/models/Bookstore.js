const mongoose = require('mongoose');

const bookstoreSchema = new mongoose.Schema({
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
    description: {
        type: String,
        trim: true
    },
})

module.exports = mongoose.model('Bookstore', bookstoreSchema);
