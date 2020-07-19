const express  = require('express');
const router   = express.Router();
const BookController = require('../controllers/book');
const auth = require('../middleware/auth');

router.get('/books', BookController.booklist); // List of all books
router.get('/books/:id', BookController.getBookById); // Get a book by its id

module.exports = router;
