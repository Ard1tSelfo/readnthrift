const express  = require('express');
const router   = express.Router();
const BookshelfController = require('../controllers/bookshelf');
const auth = require('../middleware/auth');

router.post('/users/me/bookshelves/new', BookshelfController.createbookshelf); // Create a new bookshelf
router.put('/users/me/bookshelves/:id', BookshelfController.updatebookshelf);  // Update a bookshelf by id
router.get('/users/me/bookshelves/:userid', BookshelfController.bookshelflist); // Get the bookshelf of a user by userid
router.get('/users/me/bookshelf/books/:bookshelfid', BookshelfController.getBooksByBookshelfId); // Get the books in a bookshelf by bookshelfid
router.get('/users/me/bookshelf/:bookshelfid', BookshelfController.getbookshelf); // Get a bookshelf by its id
router.delete('/users/me/bookshelf/:bookshelfid', BookshelfController.removebookshelf); // Delete a bookshelf by its id
router.put('/users/me/bookshelf/deletebook/:id', BookshelfController.removebookfrombookshelf); // Delete a book from a bookshelf by their ids

module.exports = router; 