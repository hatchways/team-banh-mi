const mongoose = require("mongoose");
const mentionSchema = new mongoose.Schema({
  content: {
    type: String,
    
  },
  title: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
 
  image: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  popularity: {
    type: String,
  },
  url: {
    type:String,
  }

});
const mention = mongoose.model('mention', mentionSchema)


function createMention(data){
  const newMention = new mention({content: data.content, title: data.title, platform: data.platform, image: data.image,date: data.date, popularity:data.popularity, url: data.url});
  newMention.save(function (err) { if (err) return console.error(err);});
}

function getMention(companyName, platformSearch){
  return mention.find({ title: new RegExp(companyName, 'i'), platform: new RegExp(platformSearch, 'i')});
}



module.exports = {
  createMention,getMention
};