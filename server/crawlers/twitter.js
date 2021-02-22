const axios = require('axios');

/**
 * An object representing the public metrics of a tweet.
 *
 * @typedef {Object} PublicMetrics
 * @property {string} retweet_count
 * @property {string} rely_count
 * @property {string} like_count
 * @property {string} quote_count
 */

/**
 * An object representing a tweet.
 *
 * @typedef {Object} TweetObject
 * @property {string} author_id
 * @property {string} id - tweet id.
 * @property {string} created_at - the date and time when the tweet was created.
 * @property {string} text - the text of the tweet.
 * @property {PublicMetrics} public_metrics
 */

/**
 * Given a string, produce an array of tweets from the Twitter API, ordered by
 * most-recent.
 *
 * @param {string} query - The query.
 * @returns {TweetObject}
 */
const getTwitterData = async (query) => {
  try {
    const URLParams = new URLSearchParams();
    URLParams.append("query", query);
    URLParams.append("tweet.fields", "created_at,public_metrics");
    URLParams.append("expansions", "author_id");

    const URL = `https://api.twitter.com/2/tweets/search/recent?${URLParams}`;

    const response = await axios.get(URL);
    const { data, status } = response;

    console.log(response)

    const returnedData = data.map((tweet) => {
      // Modify the data to fit what I want to return...
    });

    return returnedData;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { getTwitterData };
