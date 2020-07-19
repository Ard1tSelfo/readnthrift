const express = require('express')
const Review = require('../models/Review')

const router = express.Router()

const ReviewController = require('../controllers/review');

router.post('/reviews', ReviewController.create); // Create a new review
router.get('/reviews', ReviewController.list); // List all reviews
router.get('/reviews/book/:id', ReviewController.listByBook); // List all reviews for a certain book
router.get('/reviews/user/:id', ReviewController.listByUser); // List all reviews written by a certain user
router.put('/reviews/:id', ReviewController.update); // Update a review by Id
router.delete('/reviews/:id', ReviewController.remove); // Delete a review by Id

module.exports = router;

