const express = require('express');
const cors = require('cors');
const { TasksRouter, UsersRouter } = require('../routes/routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', [TasksRouter, UsersRouter]);

module.exports = app;