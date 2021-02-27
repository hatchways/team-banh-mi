var snoowrap = require("snoowrap");
const { createMention, getMention } = require("../models/mention-model");

const r = new snoowrap({
  userAgent: "webcrawler",
  clientId: "rwl4j4FrYnxqPA",
  clientSecret: "qZ1p1Cp8q2Va6gBv8A18oI2KZGrK0Q",
  username: "bot3424",
  password: "bot3424",
});

function getReddit(companyName) {
  return getMention(companyName, "reddit");
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
        image: parseMedia(element.thumbnail),
        date: date,
        popularity: element.ups,
        url: link,
      };
      createMention(mention);
    });
  });
}

function parseMedia(media) {
  if (media) return media;
  return "https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_reddit-512.png";
}

module.exports = {
  redditSearch,
  getReddit,
};
