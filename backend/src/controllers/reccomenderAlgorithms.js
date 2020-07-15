const BookModel = require("../models/Book");
const BookShelfModel = require("../models/BookShelf");

const getBooksByTags = (tags) => {

}

const generateRecommendationsForBookshelf = async (req, res) => {
    const bookshelfId = req.params.bookshelfid;
    try {
        let bookshelf = await BookShelfModel.findOne({ "_id": bookshelfId }).exec();
        let books = await BookModel.find({ "_id": { $in: bookshelf.books } }).exec();

        let allTags = [];
        books.forEach(function (x) {
            allTags = allTags.concat(x.tags);
        });

        let tagFrequency = new Map();
        allTags.forEach(function (x) {
            tagFrequency[x] = (tagFrequency[x] || 0) + 1;
        });

        let frequentTags=[];
        for (const [key, value] of Object.entries(tagFrequency)) {
            if (value > books.length/2) {
                frequentTags=[...frequentTags,key]
            }
        }

        return res.status(200).json(frequentTags);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

module.exports = {
    generateRecommendationsForBookshelf,
};
