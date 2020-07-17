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
    const bookshelfId = req.params.bookshelfid
    try {
        let bookshelf = await BookshelfModel.findOne({"_id" : bookshelfId}).exec();
        let books = await BookModel.find({"_id": {$in: bookshelf.books}}).exec();
        return res.status(200).json(books); 
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const removebookshelf = async (req, res) => {
    try {   
      let user = await BookshelfModel.findById(req.params.bookshelfid).exec().user;
      await BookshelfModel.findByIdAndRemove(req.params.bookshelfid).exec();
      return res.status(200).json({message: `Bookshelf with id${req.params.bookshelfid} was deleted`});
    } catch(err) {
      return res.status(500).json({
        error: 'Internal server error',
        message: err.message
      });
    }
  };

  const removebookfrombookshelf = async (req, res) => {
    try {   
      await BookshelfModel.update( {_id: req.params.bookshelfid}, { "$pull": { "books": { "_id": req.params.bookid } }} ), { safe: true };
      return res.status(200).json({message: `The book was deleted from bookshelf ${req.params.bookshelfid}`});
    } catch(err) {
      return res.status(500).json({
        error: 'Internal server error',
        message: err.message
      });
    }
  };

  

module.exports = {
    bookshelflist,
    createbookshelf,
    updatebookshelf,
    getbookshelf,
    getBooksByBookshelfId,
    removebookshelf,
    removebookfrombookshelf
};
