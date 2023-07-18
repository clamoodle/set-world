"use strict";

/**
 * @author Pearl Chen
 * CS 132 Spring 2023
 *
 * Get/Post endpoints for Set World user data API
 * Includes user scores, login info, etc
 *
 * Ref:
 * https://eipsum.github.io/cs132/lectures/lec17-more-node/code/dir-web-cafe/app.js
 */

const express = require("express");
const fsp = require("fs/promises");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
// const socket = require("socket.io");

// const logger = require("morgan");

// const indexRouter = require("./routes/index");
// const usersRouter = require("./routes/users");

const COOKIE_SECRET = "20CWmcWQQN";

const app = express();
// const io = socket(server);
app.use(express.static("public"));
app.use(cookieParser(COOKIE_SECRET));

// https://eipsum.github.io/cs132/lectures/lec18-node-post-documentation/index.html#/34
// for parsing application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true })); // built-in middleware
// for parsing application/json
app.use(express.json()); // built-in middleware
// for parsing multipart/form-data (required with FormData)
app.use(multer().none()); // multer middleware


const SERVER_ERR_CODE = 500;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
app.use("/", indexRouter);
app.use("/users", usersRouter);

// app.use(logger("dev"));
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// io.on("connection", (socket) => {
//     console.log("Made socket connection", socket.id);
// });

/**
 * Handles errors
 */
function handleError(err, req, res, next) {
    // All error responses are plain/text
    res.status(400);
    res.type("text");
    res.send(err.message);
}

app.use(handleError);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
