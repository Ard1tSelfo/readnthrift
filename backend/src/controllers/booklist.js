const BookListModel = require("../models/BookList");

const listofbooklists = async (req, res) => {
    try {
        let bookLists = await BookListModel.find({}).exec();
        return res.status(200).json(bookLists);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

const createbooklist = async (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });
    try {
      let bookList = await BookListModel.create(req.body);
      return res.status(201).json(bookList)
    } catch(err) {
      return res.status(500).json({
        error: 'Internal server error',
        message: err.message
      });
    }
};

module.exports = {
    listofbooklists,
    createbooklist
}