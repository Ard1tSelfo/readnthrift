const mongoose = require('mongoose')
const User = require('./User')
const { Int32 } = require('mongodb')

const reviewSchema = mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    author: {
        type: String,
        trim: true,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    notice: String,
})

module.exports = mongoose.model('Review', reviewSchema);
