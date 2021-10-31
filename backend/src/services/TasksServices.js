const TasksModel = require('../models/TasksModel');

const getAllTasks = async () => {
  const tasks = await TasksModel.getAllTasks();
  return tasks;
};

const createNewTask = async ({ task, description, status }) => {
  const data = await TasksModel.createNewTask({ task, description, status });
  return data;
};

module.exports = { getAllTasks, createNewTask };