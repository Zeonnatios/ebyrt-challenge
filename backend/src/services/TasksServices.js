const TasksModel = require('../models/TasksModel');

const getAllTasks = async () => {
  const tasks = await TasksModel.getAllTasks();
  return tasks;
};

const createNewTask = async ({ task, description, status }) => {
  const data = await TasksModel.createNewTask({ task, description, status });
  return data;
};

const updateTask = async ({ id, task, description, status, createdData }) => {
  const updatedProduct = TasksModel.updateTask({ id, task, description, status, createdData });
  return updatedProduct;
};

module.exports = { getAllTasks, createNewTask, updateTask };