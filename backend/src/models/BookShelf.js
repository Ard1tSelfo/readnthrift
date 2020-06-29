const mongoose = require('mongoose');

const bookShelfSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    list: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Book',
        required: true
    }
})

module.exports = mongoose.model('BookShelf', bookShelfSchema);