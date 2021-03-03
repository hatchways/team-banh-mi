var snoowrap = require("snoowrap");
const { createMention, getMention } = require("../models/mention-model");
const sentimentAnalysis = require("sentiment-analysis");

const r = new snoowrap({
  userAgent: "webcrawler",
  clientId: "rwl4j4FrYnxqPA",
  clientSecret: "qZ1p1Cp8q2Va6gBv8A18oI2KZGrK0Q",
  username: "bot3424",
  password: "bot3424",
});

function getReddit(companyName) {
  const result = getMention(companyName, "reddit");
  return result;
}

function redditSearch(query) {
  r.search({ query: query, subreddit: "all", sort: "top" }).then((data) => {
    data.forEach((element) => {
      date = new Date(element.created_utc * 1000);
      link = "https://www.reddit.com/" + element.permalink;
      mention = {
        content: element.selftext || element.title,
        title: element.title,
        platform: "reddit",
        image: element.thumbnail,
        date: date,
        popularity: element.ups,
        url: link,
        mood: displaySentiment(element.selftext || element.title),
      };
      createMention(mention);
    });
  });
}

function displaySentiment(text) {
  const sentiment = sentimentAnalysis(text);
  let overallSentiment = "neutral";
  if (sentiment > 0.2) overallSentiment = "good";
  else if (sentiment < -0.2) overallSentiment = "bad";
  return overallSentiment;
}

module.exports = {
  redditSearch,
  getReddit,
};
