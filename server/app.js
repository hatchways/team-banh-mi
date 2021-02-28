const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");

const mentionRouter = require("./routes/mention");
const cors = require("cors");
const authRouter = require("./routes/auth");
const taskRouter = require("./routes/jobs");
const allowCors = require("./middlewares/cors");
const { connectDB, disconnectDB } = require("./utils/database");
const { createTaskQueue } = require("./utils/taskqueues");
const { corsOptions } = require("./middlewares/cors");
const { crawlAllPlatformsAndStoreResults } = require("./crawlers/index");

const { json, urlencoded } = express;

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));
app.use(cors(corsOptions));
app.use(cookieParser());

// TODO: Change this in production. Remove the argument.
connectDB("test");

createTaskQueue();

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/task", taskRouter);
app.use("/mention", mentionRouter);

crawlAllPlatformsAndStoreResults("tesla");

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
