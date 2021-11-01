const express = require('express');
const { TasksRouter } = require('./src/routes/routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', TasksRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
