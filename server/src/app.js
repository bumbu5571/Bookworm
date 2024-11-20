const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const apiRouter = require("./routers/api.router");
const corsConfig = require("./configs/corsConfig");

const app = express();

app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsConfig));
app.use(cookieParser());

app.use("/api/v1", apiRouter);

module.exports = app;
