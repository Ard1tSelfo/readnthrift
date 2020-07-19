const mongoose = require('mongoose')
const User = require('./User')
const Book = require('./Book')

const offerSchema = mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    cover: {
        type: String,
        enum: ["Hardcover", "Softcover"],
        required: true
    },
    condition: {
        type: String,
        enum: ["New", "Used, no traces of use", "Used, medium traces of use", "Used, sever traces of use"],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    open: Boolean,
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
    }
})

const Offer = mongoose.model('Offer', offerSchema)
module.exports = Offer