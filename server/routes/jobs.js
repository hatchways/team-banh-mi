const express = require("express");
const { createTaskQueue } = require("../utils/taskqueues");
const router = express();
let taskQueue = createTaskQueue();

router.post("/job", async function (req, res) {
  try {
    let job = await taskQueue.add();
  } catch (err) {
    console.error(err);
  }
});

router.post("/list-job", async function (req, res) {
  try {
    let jobs = await taskQueue.getJobs();
    jobs.forEach((job) => console.log(job.id));
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
