const express  = require('express');
const router   = express.Router();
const BookshelfController = require('../controllers/bookshelf');
const auth = require('../middleware/auth');

router.post('/users/me/bookshelves', BookshelfController.createbookshelf); 
router.put('/users/me/bookshelves/:id', BookshelfController.updatebookshelf); 

module.exports = router;