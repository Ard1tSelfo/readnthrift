const jwt = require("jsonwebtoken");
const User = require("../models/User"); 

const auth = async (req, res, next) => {
    try {
        const authorizationHeader = req.header("Authorization");
        if (!authorizationHeader) {
            throw new Error()
        }
        const token = authorizationHeader.replace("Bearer ", "");
        const data = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({ _id: data._id, "tokens.token": token });
        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token; 
        next();
    } catch (error) {
        res.status(401).send({ error: "Not authorized to access this resource" });
    }
};

module.exports = auth;
