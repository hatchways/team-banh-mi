let express = require('express');
let Queue = require('bull');
const { resolve } = require("path");
let REDIS_URL = 'redis://127.0.0.1:6379';

//const client = require('../')

let router = express();
//create a queue and connect with redis
let workQueue = new Queue('work', REDIS_URL);

/*app.get('/bull', function(req, res){
  console.log("hi");
  console.log({ root: join(__dirname, '../client/public')});
  res.sendFile('indexBull.html', { root: join(__dirname, '../client/public') });
});*/

router.get('/', function(req, res){
    console.log("hi");
    try{
    res.sendFile('indexBull.html',{ root: resolve( "..", "client","src","bull") });
    }catch(err)
    {
        console.log(err);
    }
});

router.get('/client.js', function(req, res){ 
    console.log("client.js"+{ root: resolve( "..", "client","src","bull") });
    res.sendFile('client.js', { root: resolve( "..", "client","src","bull") });
});

router.post('/job', async function(req, res){
    console.log("/job");
    console.log({ root: __dirname });
    // Producers adding new job to work queue
    let job = await workQueue.add();
    res.json({ id: job.id });
});

// Allows the client to query the state of a background job
router.get('/job/:id', async function(req, res) {
  let id = req.params.id;
  let job = await workQueue.getJob(id);
  
  if (job === null) {
    res.status(404).end();
  } else {
    let state = await job.getState();
    let progress = job._progress;
    let reason = job.failedReason;
    res.json({ id, state, progress, reason });
  }
});

// You can listen to global events to get notified when jobs are processed
workQueue.on('global:completed', (jobId, result) => {
  console.log(`Job completed with result ${result}`);
});

module.exports = router;