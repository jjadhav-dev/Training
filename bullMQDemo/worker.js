// worker.js
const { Worker } = require("bullmq");
const redis = require("./redis");

const worker = new Worker(
  "email-queue",
  async job => {
    console.log(
      `Processing job: to=${job.data.to}, subject=${job.data.subject}, body=${job.data.body}`
    );
  },
  {
    connection: redis,
    limiter: {
      max: 5,
      duration: 1000
    }
  }
);

worker.on("completed", job => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed: ${err.message}`);
});
