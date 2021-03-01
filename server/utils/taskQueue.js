const bull = require('bull');
const {getAllCompanyName} = require("../models/user-model");
const searchQueue = new bull('searchQueue', {redis: {port: 6379, host:'127.0.0.1'}});
const { redditSearch,getReddit } = require("../utils/redditcrawler");
const companyQueue = new bull('companyQueue', {redis: {port: 6379, host:'127.0.0.1'}});
searchQueue.process(function (job, done){
  console.log(job.data.company);
  redditSearch(job.data.company);
  done();
});

companyQueue.process(function (job, done){
  updateMentionDatabase();
  done();
});

function updateMentionDatabase(){
   getAllCompanyName().then(data =>data.forEach(element => {
    searchQueue.add({company: element});
  }));
}


//, {repeat: {cron: '*/1 * * * *'}
function start(){
  //companyQueue.add({},  {repeat: {cron: '*/1 * * * *'}});  
}

module.exports = {start};