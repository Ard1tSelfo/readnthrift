"use strict";

const OfferModel = require('../models/Offer');

const create = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    try {
      let offer = await OfferModel.create(req.body);

      return res.status(201).json(offer)
    } catch(err) {
      return res.status(500).json({
        error: 'Internal server error',
        message: err.message
      });
    }
};

const getOfferById = async (req, res) => {
    let id = req.params.id
    try {
        let offer = await OfferModel.findOne({ _id: id}).exec();
        return res.status(200).json(offer);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message,
        });
    }
};

/*const getOfferByUserID = async (req, res) => {
    let userId = req.params.userId
    try {
        let offer = await OfferModel.findOne({ userId: userId}).exec();
        return res.status(200).json(offer);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};*/



const offersList = async (req, res) => {
    try {
        let offers = await OfferModel.find({"user" : req.body.userid}).exec();
        return res.status(200).json(offers);
    } catch (err) {
        return res.status(500).json({
            error: 'Internal server error',
            message: err.message,
        });
    }
};

const read = async (req, res) => {
  try {
    let offer = await OfferModel.findById(req.params.id).exec();

    if (!offer) return res.status(404).json({
      error: 'Not Found',
      message: 'Offer not found'
    });

    return res.status(200).json(offer)
  } catch(err) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message
    });
  }
};

const update = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    try {
      let offer = await OfferModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      }).exec();

      return res.status(200).json(offer);
    } catch(err) {
      return res.status(500).json({
        error: 'Internal server error',
        message: err.message
      });
    }
};

const remove = async (req, res) => {
  try {
    await OfferModel.findByIdAndRemove(req.params.id).exec();

    return res.status(200).json({message: 'Offer with id${req.params.id} was deleted'});
  } catch(err) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message
    });
  }
};

const list  = async (req, res) => {
  try {
    let offers = await OfferModel.find({}).exec();

    return res.status(200).json(offers);
  } catch(err) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message
    });
  }
};


module.exports = {
    create,
    getOfferById,
    offersList,
    read,
    update,
    remove,
    list
};