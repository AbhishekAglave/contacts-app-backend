const dotenv = require("dotenv");
dotenv.config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const verifyToken = require("./auth");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const contactsRouter = require("./routes/contacts");

const { swaggerServe, uiSetup } = require("./swaggerConfig");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/swagger-ui", swaggerServe, uiSetup);
app.use("/api/users", usersRouter);
app.use("/api", verifyToken, indexRouter);
app.use("/api/contacts", verifyToken, contactsRouter);

module.exports = app;
