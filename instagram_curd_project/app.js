require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());
const {globalErrorHandler} = require('./middlewares/errorHandler')
const { apiresponse } = require('./utils/apiresponse')
const port = process.env.server_port || 3000;
app.use(apiresponse)
// ***********Imports Routes****************//
app.use('/api', require('./routes/index'));

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});