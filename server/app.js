
const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config({ path: join(__dirname, ".env") });

const indexRouter = require("./routes/index");
var snoowrap = require('snoowrap');
const { createMention, connectDB } = require("./utils/database");

const { json, urlencoded } = express;

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
const r = new snoowrap({
  userAgent: 'webcrawler',
  clientId: 'rwl4j4FrYnxqPA',
  clientSecret: 'qZ1p1Cp8q2Va6gBv8A18oI2KZGrK0Q',
  username: 'bot3424',
  password: 'bot3424'
});
connectDB("test");
redditSearch('burgerking');
function redditSearch(query){
  r.search({query: query,subreddit: 'all',sort: 'top'}).then((data) =>{
  data.forEach(element=>{
    date = new Date(element.created_utc*1000);
     createMention(element.selftext, element.title, "reddit", media(element.media_embed),date, element.ups, element.permalink);
    
  }
    )
}
)
}

function media(media){
  if(!media)
    return "none";
  else if(media ="{}")
    return "none"
  else
    return media
}

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

