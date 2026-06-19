require('dotenv').config();
const { Queue, Worker } = require('bullmq');
const { post } = require('../models');
const redis = require('redis');

const connection = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379
};

const publishQueue = new Queue('publishQueue', { connection });

const worker = new Worker('publishQueue', async (job) => {
  const postRecord = await post.findByPk(job.data.postId);
  if (postRecord && postRecord.status === 'pending') {
    postRecord.status = 'published';
    await postRecord.save();

    const pattern = `user:${postRecord.user_id}:posts:*`;
        const keys = await redis.keys(pattern);
        if (keys.length) {
            await redis.del(keys);
            console.log(`Cleared cache for user ${postRecord.user_id}`);
        }
    console.log(`Post ${postRecord.id} published!`);
  }
}, { connection });
