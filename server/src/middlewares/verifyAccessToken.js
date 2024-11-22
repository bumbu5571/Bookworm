const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyAccessToken = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];

    const token = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    res.locals.user = token.user;
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.user.id;
    next();
  } catch (error) {
    console.error(`Invalid access token: ${error}`);
    res.status(403).send("Invalid access token");
  }
};

module.exports = verifyAccessToken;
