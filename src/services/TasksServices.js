const TasksModel = require('../models/TasksModel');
const TasksSchemas = require('../schemas/TasksSchemas');

const getAllTasks = async () => {
  const data = await TasksModel.getAllTasks();
  return data;
};

const createNewTask = async (task) => {
  const createdDate = Date.now();
  const validate = TasksSchemas.validateTask({ ...task, createdDate });
  
  if (validate.message) return { err: validate };

  const data = await TasksModel.createNewTask({ ...task, createdDate });
  return data;
};

const updateTask = async (task) => {
  const validate = TasksSchemas.validateTask(task);
  if (validate.message) return { err: validate };

  const data = TasksModel.updateTask(task);
  return data;
};

const excludeTask = async (id) => {
  const data = await TasksModel.excludeTask(id);
  if (!data) return { err: TasksSchemas.errorToExcludeTask };

  return data;
};

module.exports = { getAllTasks, createNewTask, updateTask, excludeTask };