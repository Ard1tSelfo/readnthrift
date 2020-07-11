const BookshelfModel = require("../models/BookShelf");
const UserModel = require("../models/User");

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

module.exports = {
    bookshelflist,
    createbookshelf,
    updatebookshelf,
};
