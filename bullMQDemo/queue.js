// queue.js
const { Queue } = require("bullmq");
const redis = require("./redis");

const emailQueue = new Queue("email-queue", { connection: redis });

module.exports = emailQueue;
