const mongoose = require('mongoose')
const User = require('./User')
const { Int32 } = require('mongodb')

const reviewSchema = mongoose.Schema ({
    /*user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },*/
    rating: Number,
    notice: String,
    accepted: {
        type: Boolean,
        required: true
    }
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review