// Review model required
/*const ReviewModel = require("../models/Review");

const reviewlist = async (req, res) => {
    try {
        let reviews = await ReviewModel.find({}).exec();
        return res.status(200).json(reviews);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const createreview = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });
    try {
      let review = await ReviewModel.create(req.body);
      return res.status(201).json(review)
    } catch(err) {
      return res.status(500).json({
        error: 'Internal server error',
        message: err.message
      });
    }
};

module.exports = {
    reviewlist,
    createreview
}*/