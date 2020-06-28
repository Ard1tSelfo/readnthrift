const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    booklists: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'BookList',
        required: true
    }
})

module.exports = mongoose.model('UserProfile', userProfileSchema); 