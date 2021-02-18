const express = require('express');
const { resolve } = require("path");
const  { createTaskQueue } = require("../utils/taskqueues");
const router = express();
let taskQueue = createTaskQueue();

router.get('/', function(req, res){
    res.sendFile('indexBull.html',{ root: resolve( "..", "client","src","bull") });
});

router.get('/job', async function(req, res){
    try{
        console.log("job");
    let job = await taskQueue.add();
    console.log({id : job.id});
    }catch(err){
        console.log(err);
    }
});

router.get('/list-job', async function(req, res){
    try{
    let jobs = await taskQueue.getJobs();
    jobs.forEach(job => console.log(job.id));
    }catch(err){
        console.log(err);
    }
});

module.exports = router;

