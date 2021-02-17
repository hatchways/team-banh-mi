let throng = require('throng');
let Queue = require("bull");

let REDIS_URL = "redis://127.0.0.1:6379";

// Spin up multiple processes to handle jobs to take advantage of more CPU cores
let workers = 2;

// The maxium number of jobs each worker should process at once
let maxJobsPerWorker = 50;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function start() {
  // /create a queue and connect with redis
  let workQueue = new Queue('work', REDIS_URL);

  workQueue.process(maxJobsPerWorker, async (job) => {
    let progress = 0;

    // throw an error 5% of the time
    if (Math.random() < 0.05) {
      throw new Error("This job failed!")
    }

    while (progress < 100) {
      await sleep(50);
      progress += 1;
      job.progress(progress)
    }

    //this is stored and return value from redis.
    return { value: "This will be stored" };
  });
}

// Initi the clustered worker process
throng({ workers, start });
