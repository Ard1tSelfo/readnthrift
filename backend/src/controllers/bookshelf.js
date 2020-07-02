const BookShelfModel = require("../models/BookList");

const bookshelflist = async (req, res) => {
    try {
        let bookLShelfs = await BookShelfModel.find({}).exec();
        return res.status(200).json(bookLShelfs);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const createbookshelf = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });
    try {
      let bookShelf = await BookShelfModel.create(req.body);
      return res.status(201).json(bookShelf)
    } catch(err) {
      return res.status(500).json({
        error: 'Internal server error',
        message: err.message
      });
    }
};

module.exports = {
    bookshelflist,
    createbookshelf
}