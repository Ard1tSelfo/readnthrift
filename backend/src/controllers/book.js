const BookModel = require("../models/Book");

const booklist = async (req, res) => {
    try {
        let books = await BookModel.find({}).exec();
        return res.status(200).json(books);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const createbook = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });
    try {
      let book = await BookModel.create(req.body);
      return res.status(201).json(book)
    } catch(err) {
      return res.status(500).json({
        error: 'Internal server error',
        message: err.message
      });
    }
};

module.exports = {
    booklist,
    createbook
}