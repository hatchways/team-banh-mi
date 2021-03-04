const { redditSearch } = require("./reddit");
const { getTwitterData } = require("./twitter");

/**
 * Given a company name, crawl all the available platforms for that company
 * name, and store the results to the database. Produce true if the operation
 * was successful, else log the error to the console and produce false.
 *
 * @param {string} companyName
 * @returns {boolean} true if the operation was successful, else false.
 */
const crawlAllPlatformsAndStoreResults = async (companyName) => {
  try {
    await redditSearch(companyName);
    await getTwitterData(companyName);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = { crawlAllPlatformsAndStoreResults };
