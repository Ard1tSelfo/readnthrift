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
    price: {
        type: Number
    },
    comment: {
        type: String,
        trim: true
    }
})