const { config } = require("./crawlers-config");
const { createMention, getMention } = require("../models/mention-model");

function getMentionFromDataBase(companyName, platform) {
  return getMention(companyName, platform);
}

async function storeMentionIntoDataBase(data, platform) {
  data.forEach((element) => {
    mention = createObjectForMention(element, platform);
    createMention(mention);
  });
}

function createObjectForMention(element, platform) {
  console.log(element);
  mention = {
    content: contentOfMention(element, platform),
    title: titleOfMention(element, platform),
    platform: platform,
    image: imageOfMention(element, platform),
    date: dateOfMention(element, platform),
    popularity: popularityOfMention(element, platform),
    url: urlOfMention(element, platform),
  };
  console.log(mention);
  return mention;
}

function contentOfMention(data, platform) {
  if (platform == config.REDDIT) {
    return data.selftext || data.title;
  } else {
    return data.text;
  }
}

function titleOfMention(data, platform) {
  if (platform == config.REDDIT) {
    return data.title;
  } else {
    return `${data.text.substring(0, 100)}...`;
  }
}

function imageOfMention(data, platform) {
  if (platform == config.REDDIT) {
    return data.thumbnail;
  } else {
    let image = null;
    if (data.entities && data.entities["media"])
      image = data.entities["media"][0]["media_url"];
    return image;
  }
}

function dateOfMention(data, platform) {
  if (platform == config.REDDIT) {
    return new Date(data.created_utc * 1000);
  } else {
    return data.created_at;
  }
}

function popularityOfMention(data, platform) {
  console.log("storeMentionIntoDataBase6");
  if (platform == config.REDDIT) {
    return data.ups;
  } else {
    return data.public_metrics.like_count;
  }
}

function urlOfMention(data, platform) {
  if (platform == config.REDDIT) {
    return "https://www.reddit.com/" + data.permalink;
  } else {
    return `https://twitter.com/anyUser/status/${data.id}`;
  }
}

module.exports = {
  storeMentionIntoDataBase,
  getMentionFromDataBase,
};
