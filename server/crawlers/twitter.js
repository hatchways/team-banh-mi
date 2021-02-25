const Twitter = require("twitter-v2");

const { TWITTER_API_KEY, TWITTER_API_SECRET_KEY } = process.env;

/**
 * Creating a new instance of the Twitter library to use it's API.
 * @constructor
 */
const client = new Twitter({
  consumer_key: TWITTER_API_KEY,
  consumer_secret: TWITTER_API_SECRET_KEY,
});

/**
 * Given a query string, produce an array of tweets from the Twitter API,
 * ordered by most-recent.
 *
 * @param {string} query - The query.
 * @returns {Object[]} An array of objects with the following properties:
 * @property {string} title - "Tweet"
 * @property {string} platform - "Twitter"
 * @property {string} content - The body of the tweet.
 * @property {string|null} image - The URL of the image in the tweet or null.
 * @property {string} date - The date in ISO string.
 * @property {string} popularity - The number of likes a tweet has.
 * @property {string} url - The url to view the tweet on the browser.
 */
const getTwitterData = async (query) => {
  try {
    const { data } = await client.get("tweets/search/recent", {
      query,
      "tweet.fields": "entities,created_at,public_metrics",
      expansions: "author_id",
    });

    const result = data.map((tweet) => {
      const { text, created_at, public_metrics, id, entities } = tweet;

      let image = null;
      if (entities["media"]) image = entities["media"][0]["media_url"];

      return {
        title: "Tweet",
        platform: "Twitter",
        content: text,
        image,
        date: created_at,
        popularity: public_metrics.like_count,
        url: `https://twitter.com/anyUser/status/${id}`,
      };
    });

    return result;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { getTwitterData };
