const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");

const getUserByToken = async (req, res) => {
    try {
        const authorizationHeader = req.header("Authorization");
        if (!authorizationHeader) {
            throw new Error();
        }
        const token = authorizationHeader.replace("Bearer ", "");
        const data = jwt.verify(token, process.env.JWT_KEY);
        let user = await UserModel.findOne({ _id: data._id, "tokens.token": token }).exec();
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message,
        });
    }
};

module.exports = {
    getUserByToken,
};
