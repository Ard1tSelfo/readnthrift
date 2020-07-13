"use strict";

const ReviewModel = require('../models/Review');
const BookModel = require('../models/Book');
const UserModel = require('../models/User');


const create = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    try {
      let review = await ReviewModel.create(req.body);

      const book = await BookModel.findById(req.body.book);
      book.reviews = [...book.reviews, review];
      book.save();
      const user = await UserModel.findById(req.body.user);
      user.reviews = [...user.reviews, review];
      user.save();

      return res.status(201).json(review)
    } catch(err) {
      return res.status(500).json({
        error: 'Internal server error',
        message: err.message
      });
    }
};

const read = async (req, res) => {
  try {
    let review = await ReviewModel.findById(req.params.id).exec();

    if (!review) return res.status(404).json({
      error: 'Not Found',
      message: `Review not found`
    });

    return res.status(200).json(review)
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
      let review = await ReviewModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      }).exec();

      return res.status(200).json(review);
    } catch(err) {
      return res.status(500).json({
        error: 'Internal server error',
        message: err.message
      });
    }
};

const remove = async (req, res) => {
  try {
    await ReviewModel.findByIdAndRemove(req.params.id).exec();

    return res.status(200).json({message: `Review with id${req.params.id} was deleted`});
  } catch(err) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message
    });
  }
};

const list  = async (req, res) => {
  try {
    let reviews = await ReviewModel.find({}).exec();

    return res.status(200).json(reviews);
  } catch(err) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message
    });
  }
};

const listByUser  = async (req, res) => {
  try {
    let reviews = await ReviewModel.find({user: req.params.user}).exec();

    return res.status(200).json(reviews);
  } catch(err) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message
    });
  }
};

const listByBook  = async (req, res) => {
  try {
    let reviews = await ReviewModel.find({book: req.params.book}).exec();

    return res.status(200).json(reviews);
  } catch(err) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message
    });
  }
};


module.exports = {
    create,
    read,
    update,
    remove,
    list,
    listByUser,
    listByBook
};