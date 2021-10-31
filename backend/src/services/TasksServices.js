const TasksModel = require('../models/TasksModel');

const getAllTasks = async () => {
  const tasks = await TasksModel.getAllTasks();
  return tasks;
};

const createNewTask = async (task) => {
  const createdDate = new Date();
  const data = await TasksModel.createNewTask(task, createdDate);
  return data;
};

const updateTask = async (task) => {
  const updatedProduct = TasksModel.updateTask(task);
  return updatedProduct;
};

module.exports = { getAllTasks, createNewTask, updateTask };