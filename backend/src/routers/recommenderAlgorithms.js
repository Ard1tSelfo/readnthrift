const express = require('express')
const router = express.Router()

const recommenderAlgorithms = require('../controllers/reccomenderAlgorithms');

router.get('/recommendations/:bookshelfid', recommenderAlgorithms.generateRecommendationsForBookshelf); 

module.exports = router;