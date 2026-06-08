require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const port = process.env.server_port || 3000;

// ***********Imports Routes****************//
app.use('/api/users', require('./routes/user.routes'));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});