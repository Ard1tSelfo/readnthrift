const express  = require('express');
const router   = express.Router();
const BookshelfController = require('../controllers/bookshelf');
const auth = require('../middleware/auth');

router.post('/users/me/bookshelves', BookshelfController.createbookshelf); // Create a new bookshelf

module.exports = router;