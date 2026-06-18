const { Queue, Worker } = require('bullmq');
const { post } = require('../models');

const connection = { host: '127.0.0.1', port: 6379 };

const publishQueue = new Queue('publishQueue', { connection });

const worker = new Worker('publishQueue', async (job) => {
  const postRecord = await post.findByPk(job.data.postId);
  if (postRecord && postRecord.status === 'pending') {
    postRecord.status = 'published';
    await postRecord.save();
    console.log(`Post ${postRecord.id} published!`);
  }
}, { connection });
