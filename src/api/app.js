const express = require('express');
const cors = require('cors');
const { TasksRouter } = require('../routes/routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', TasksRouter);

module.exports = app;