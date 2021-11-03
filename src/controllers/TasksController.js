const rescue = require('express-rescue');
const TasksServices = require('../services/TasksServices');
const httpStatusCode = require('../helpers/httpStatus');

const getAllTasks = rescue(async (req, res) => {
  const data = await TasksServices.getAllTasks();
  return res.status(httpStatusCode.ok).json(data);
});

const createNewTask = rescue(async (req, res) => {
  const { task, description, status } = req.body;
  const data = await TasksServices.createNewTask({ task, description, status });

  if (data.err) return res.status(httpStatusCode.badRequest).json(data);

  return res.status(httpStatusCode.created).json(data);
});

const updateTask = rescue(async (req, res) => {
  const { id } = req.params;
  const { task, description, status, createdDate } = req.body;
  const data = await TasksServices.updateTask({ id, task, description, status, createdDate });

  if (data.err) return res.status(httpStatusCode.badRequest).json(data);

  return res.status(httpStatusCode.ok).json(data);
  });

const excludeTask = rescue(async (req, res) => {
  const { id } = req.params;
  const data = await TasksServices.excludeTask({ id });

  if (data.err) return res.status(httpStatusCode.notFound).json(data);

  return res.status(httpStatusCode.ok).json(data);
});

module.exports = { getAllTasks, createNewTask, updateTask, excludeTask };