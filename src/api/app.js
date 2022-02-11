const express = require('express');
const cors = require('cors');
const { TasksRouter } = require('../routes');
const { errorHandler } = require('../middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', TasksRouter);
app.use(errorHandler);

module.exports = app;