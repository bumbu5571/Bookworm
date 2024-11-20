const router = require("express").Router();
const authRouter = require("./auth.router");
const tokenRouter = require("./token.api.router");

router.use("/auth", authRouter);
router.use("/tokens", tokenRouter);

module.exports = router;
