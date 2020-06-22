const express  = require('express');
const router   = express.Router();
const BookController = require('../controllers/book');

router.get('/books', BookController.booklist); // List of all books

module.exports = router;
