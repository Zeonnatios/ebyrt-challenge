const TasksModel = require('../models/TasksModel');

const getAllTasks = async () => {
  const data = await TasksModel.getAllTasks();
  return data;
};

const createNewTask = async (task) => {
  const createdDate = new Date();
  const data = await TasksModel.createNewTask(task, createdDate);
  return data;
};

const updateTask = async (task) => {
  const data = TasksModel.updateTask(task);
  return data;
};

const excludeTask = async (id) => {
  const data = await TasksModel.excludeTask(id);
  return data;
};

module.exports = { getAllTasks, createNewTask, updateTask, excludeTask };