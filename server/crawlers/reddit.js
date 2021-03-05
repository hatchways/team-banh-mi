const snoowrap = require("snoowrap");
const { config } = require("./crawlers-config");
const {
  REDDIT_USER_AGENT,
  REDDIT_CLIENT_ID,
  REDDIT_CLIENT_SECRET,
  REDDIT_USER_NAME,
  REDDIT_PASS,
} = process.env;

const {
  storeMentionIntoDataBase,
  getMentionFromDataBase,
} = require("./crawler");

const reddit = new snoowrap({
  userAgent: REDDIT_USER_AGENT,
  clientId: REDDIT_CLIENT_ID,
  clientSecret: REDDIT_CLIENT_SECRET,
  username: REDDIT_USER_NAME,
  password: REDDIT_PASS,
});

function getReddit(companyName) {
  return getMentionFromDataBase(companyName, config.REDDIT);
}

async function redditSearch(query) {
  try {
    const data = await reddit.search({
      query: query,
      subreddit: "all",
      sort: "top",
    });

    await storeMentionIntoDataBase(data, config.REDDIT);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  redditSearch,
  getReddit,
};
