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

module.exports = {
    booklist
}