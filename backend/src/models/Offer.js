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
    cover: {
        type: String,
        enum: ['Hardcover', 'Softcover']
    },
    condition: {
        type: String,
        enum: ['New', 'Used, no traces of use', 'Used, medium traces of use', 'Used, sever traces of use']
    },
    description: {
        type: String,
        trim: true
    }
})