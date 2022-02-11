const TasksModel = require('../models/TasksModel');

const getAllTasks = async () => {
  const data = await TasksModel.getAllTasks();
  return data;
};

const createNewTask = async (task) => {
  const createdDate = Date.now();
  const data = await TasksModel.createNewTask({ ...task, createdDate });
  return data;
};

const updateTask = async (id, task) => {
  const taskById = await TasksModel.getTaskById(id);
  if (!taskById) {
    return { error: true, message: 'Tarefa não encontrada para atualizar!' };
  }
  const data = TasksModel.updateTask(id, task);
  return data;
};

const excludeTask = async (id) => {
  const taskById = await TasksModel.getTaskById(id);
  if (!taskById) {
    return { error: true, message: 'Tarefa não encontrada para excluir!' };
  }
  const data = await TasksModel.excludeTask(id);
  return data;
};

module.exports = { getAllTasks, createNewTask, updateTask, excludeTask };