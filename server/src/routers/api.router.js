const router = require("express").Router();
const authRouter = require("./auth.router");
const tokenRouter = require("./token.api.router");
const booksRouter = require("./books.api.router");


router.use("/auth", authRouter);
router.use("/tokens", tokenRouter);

router.use("/books", booksRouter);

module.exports = router;
