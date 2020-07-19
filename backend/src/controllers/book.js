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

const getBookById = async (req, res) => {
    let id = req.params.id
    try {
        let book = await BookModel.findOne({ _id: id}).exec();
        return res.status(200).json(book);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

module.exports = {
    booklist,
    getBookById
}
