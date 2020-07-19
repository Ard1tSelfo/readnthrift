const BookstoreModel = require("../models/Bookstore");
const BookModel = require("../models/Book");

const getbookstore = async (req, res) => {
    try {
        let bookstore = await BookstoreModel.findOne({ "_id": req.params.bookstoreid }).exec();
        return res.status(200).json(bookstore);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const createbookstore = async (req, res) => {
    if (Object.keys(req.body).length === 0)
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body is empty",
        });

    try {
        const bookstore = await BookstoreModel.create(req.body);
        return res.status(201).json(bookstore);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const updatebookstore = async (req, res) => {
    if (Object.keys(req.body).length === 0)
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body is empty",
        });
    try {
        const bookstore = await BookstoreModel.findByIdAndUpdate(
            req.params.id,
            { $push: req.body },
            {
                safe: true,
                new: true,
            }
        ).exec();
        console.log(req.body)
        return res.status(201).json(bookstore);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const getBooksByBookstoreId = async (req, res) => {
    const bookstoreId = req.params.bookstoreid
    try {
        let bookstore = await BookstoreModel.findOne({ "_id": bookstoreId }).exec();
        let books = await BookModel.find({ "_id": { $in: bookstore.books } }).exec();
        return res.status(200).json(books);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const removebookfrombookstore = async (req, res) => {
    if (Object.keys(req.body).length === 0)
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body is empty",
        });
    try {
        const bookstore = await BookstoreModel.findByIdAndUpdate(
            req.params.id,
            { $pull: req.body },
            {
                safe: true,
                new: true,
            }
        ).exec();
        console.log(req.body)
        return res.status(201).json(bookstore);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

module.exports = {
    getbookstore,
    createbookstore,
    updatebookstore,
    removebookfrombookstore,
    getBooksByBookstoreId
};