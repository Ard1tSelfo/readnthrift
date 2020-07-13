const express  = require('express');
const router   = express.Router();
const BookshelfController = require('../controllers/bookshelf');
const auth = require('../middleware/auth');

router.post('/users/me/bookshelves/new', BookshelfController.createbookshelf); 
router.put('/users/me/bookshelves/:id', BookshelfController.updatebookshelf); 
router.get('/users/me/bookshelves/:userid', BookshelfController.bookshelflist);
router.get('/users/me/bookshelf/books/:bookshelfid', BookshelfController.getBooksByBookshelfId);
router.get('/users/me/bookshelf/:bookshelfid', BookshelfController.getbookshelf);

module.exports = router;