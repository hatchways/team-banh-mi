const express = require('express');
const  { createTaskQueue } = require("../utils/taskqueues");
const router = express();
let taskQueue = createTaskQueue();

router.post('/job', async function(req, res){
    try{
        console.log("job");
    let job = await taskQueue.add();
    console.log({id : job.id});
    }catch(err){
        console.log(err);
    }
});

router.post('/list-job', async function(req, res){
    try{
    let jobs = await taskQueue.getJobs();
    jobs.forEach(job => console.log(job.id));
    }catch(err){
        console.log(err);
    }
});

module.exports = router;

