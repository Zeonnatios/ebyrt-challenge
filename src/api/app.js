const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const { TasksRouter } = require('../routes');
const { errorHandler } = require('../middlewares/errorHandler');

const swaggerDocs = require('./swagger.json');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/', TasksRouter);
app.use(errorHandler);

module.exports = app;