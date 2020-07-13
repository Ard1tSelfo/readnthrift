const BookshelfModel = require("../models/BookShelf");
const UserModel = require("../models/User");
const BookModel = require("../models/Book");

const bookshelflist = async (req, res) => {
    try {
        let bookshelves = await BookshelfModel.find({"user" : req.params.userid}).exec();
        return res.status(200).json(bookshelves);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const getbookshelf = async (req, res) => {
    try {
        let bookshelf = await BookshelfModel.findOne({"_id" : req.params.bookshelfid}).exec();
        return res.status(200).json(bookshelf);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        }); 
    }
};

const createbookshelf = async (req, res) => {
    if (Object.keys(req.body).length === 0)
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body is empty",
        });

    try {
        const bookshelf = await BookshelfModel.create(req.body);
        const user = await UserModel.findById(req.body.user);
        user.bookshelves = [...user.bookshelves, bookshelf];
        user.save();
        return res.status(201).json(bookshelf);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const updatebookshelf = async (req, res) => {
    if (Object.keys(req.body).length === 0)
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body is empty",
        });
    try {
        // TODO check if book is there, provide feedback
        
        const bookshelf = await BookshelfModel.findByIdAndUpdate(
            req.params.id,
            { $push: req.body },
            {
                safe: true,
                new: true,
            }
        ).exec();
        console.log(req.body)
        return res.status(201).json(bookshelf);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const getBooksByBookshelfId = async (req, res) => {
    let bookshelfId = req.params.bookshelfid
    
    try {
        let booksIdList = await BookshelfModel.findOne({"_id": bookshelfId}).exec()
        let books = await BookModel.find({"_id": {$in: booksIdList.books}}).exec();
        return res.status(200).json(books);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

module.exports = {
    bookshelflist,
    createbookshelf,
    updatebookshelf,
    getbookshelf,
    getBooksByBookshelfId
};
