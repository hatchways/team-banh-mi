const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");

var snoowrap = require('snoowrap');
const { createMention, connectDB, getMention } = require("./utils/database");
const { NONAME } = require("dns");
=======
const mentionRouter = require("./routes/mention");
const cors = require("cors");
const authRouter = require("./routes/auth");
const { connectDB, disconnectDB } = require("./utils/database");
const { corsOptions } = require("./middlewares/cors");


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

redditSearch('burgerking');

//getMention();
function redditSearch(query){
  r.search({query: query,subreddit: 'all',sort: 'top'}).then((data) =>{
  data.forEach(element=>{
    date = new Date(element.created_utc*1000);
    
     createMention(element.selftext, element.title, "reddit", media(element.media),date, element.ups, element.permalink);
  }
    )
}
)
}

function media(media){
  if(!media)
    return "none";
  key = Object.keys(media)[0];

  if (key == 'oembed' && media[key]['provider_url'] == 'http://imgur.com'){
    return media[key]['url'];
  }
  else if(key == 'reddit_video'){
    return media[key]['fallback_url'];
  }
  else
    return "none";
}
=======

app.use("/", indexRouter);
app.use("/auth", authRouter);


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
