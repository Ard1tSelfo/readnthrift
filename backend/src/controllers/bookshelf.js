const BookshelfModel = require("../models/BookShelf");
const UserModel = require("../models/User");

const bookshelflist = async (req, res) => {
    try {
        let bookshelfs = await BookshelfModel.find({}).exec();
        return res.status(200).json(bookshelfs);
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
        let bookshelf = await BookshelfModel.create(req.body);
        let user = await UserModel.findById(req.body.user);
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
        let bookshelf = await BookshelfModel.findByIdAndUpdate(
            req.params.id,
            { $push: req.body },
            {
                safe: true,
                new: true,
                runValidators: true,
            }
        ).exec();
        return res.status(201).json(bookshelf);
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
};
