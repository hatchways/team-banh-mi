const bull = require("bull");
const { getAllCompanyName } = require("../models/user-model");
const searchQueue = new bull("searchQueue", {
  redis: { port: 6379, host: "127.0.0.1" },
});
const { redditSearch, getReddit } = require("../crawlers/reddit");
const { getAndStoreTwitterData } = require("../crawlers/twitter");
const User = require("../models/user-model");

const companyQueue = new bull("companyQueue", {
  redis: { port: 6379, host: "127.0.0.1" },
});
searchQueue.process(function (job, done) {
  redditSearch(job.data.company);
  getAndStoreTwitterData(job.data.company);
  done();
});

companyQueue.process(function (job, done) {
  updateMentionDatabase();
  done();
});

function updateMentionDatabase() {
  User.getAllCompanyName().then((data) =>
    data.forEach((element) => {
      searchQueue.add({ company: element });
    })
  );
}

//, {repeat: {cron: '*/1 * * * *'}
function start() {
  companyQueue.add({}, { repeat: { cron: "*/1 * * * *" }, jobid: "companies" });
}

module.exports = { start };
