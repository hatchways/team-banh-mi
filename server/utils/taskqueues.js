let Queue = require("bull");
const { REDIS_URL } = process.env;

createTaskQueue = () => {
  try {
    let taskQueue = new Queue("taskQueue", REDIS_URL);
    return taskQueue;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { createTaskQueue };
