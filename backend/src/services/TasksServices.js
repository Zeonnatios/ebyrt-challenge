const TasksModel = require('../models/TasksModel');

const getAllTasks = async () => {
  const tasks = await TasksModel.getAllTasks();
  return tasks;
};

module.exports = { getAllTasks };