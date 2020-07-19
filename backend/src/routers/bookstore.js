const express  = require('express');
const router   = express.Router();
const BookstoreController = require('../controllers/bookstore');

router.post('/bookstores/new', BookstoreController.createbookstore); // Create a new bookstore
router.get('/bookstores/:bookstoreid', BookstoreController.getbookstore); // Get the bookstore by id
router.put('/bookstores/:bookstoreid', BookstoreController.updatebookstore);  // Update a bookstore by id
router.put('/bookstores/deletebook/:bookid', BookstoreController.removebookfrombookstore); // Delete a book from a bookstore by their ids
router.get('/bookstore/books/:bookstoreid', BookstoreController.getBooksByBookstoreId); // Get the books in a bookstore by bookstoreid

module.exports = router; 