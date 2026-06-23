require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const {globalErrorHandler} = require('./middlewares/errorHandler')
const { apiresponse } = require('./utils/apiresponse')
const port = process.env.server_port || 3000;
require('./cron/cronTest');


const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const { Queue } = require('bullmq');

const redisConnection = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379
};

const publishQueue = new Queue('publishQueue', { connection: redisConnection });

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullMQAdapter(publishQueue)],
  serverAdapter
});

app.use('/admin/queues', serverAdapter.getRouter());


app.use(apiresponse)
app.use('/public', express.static(path.join(__dirname, 'public')));
// ***********Imports Routes****************//
app.use('/api', require('./routes/index'));

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
