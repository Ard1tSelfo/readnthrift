const express = require('express')
const Offer = require('../models/Offer')

const router = express.Router()

const OfferController = require('../controllers/offer');

router.post('/marketplace', OfferController.create); // Create a new offer
router.put('/marketplace/:id', OfferController.update); // Update a offer by Id
router.get('/marketplace', OfferController.list); // List all offers
router.get('/marketplace/myoffers/:userid', OfferController.offersList); // List of all my offers
router.get('/marketplace/:id', OfferController.getOfferById); // Get offer by Id
router.delete('/marketplace/:id', OfferController.remove); // Delete an offer by Id

module.exports = router;
