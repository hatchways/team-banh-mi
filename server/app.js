
const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config({ path: join(__dirname, ".env") });
const indexRouter = require("./routes/index");
const { connectDB } = require("./utils/database");
const { redditSearch,getReddit } = require("./utils/redditcrawler");
const { json, urlencoded } = express;
const app = express();
const bull = require('bull');

const searchQueue = new bull('searchQueue', {redis: {port: 6379, host:'127.0.0.1'}})
searchQueue.process(function (job, done){
  console.log("helloworld");
  done();
  return("hello");
});

searchQueue.add({}, {repeat: {cron: '*/1 * * * *'}});




app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));
app.use("/", indexRouter);


connectDB("test");

redditSearch('burgerking');
getReddit('burgerking').then(value=>console.log(value[1]));
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

