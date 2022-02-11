const { StatusCodes } = require('http-status-codes');

const { OK, CREATED, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCodes;
const TasksServices = require('../services/TasksServices');

const getAllTasks = async (req, res, next) => {
  try {
    const data = await TasksServices.getAllTasks();
    return res.status(OK).json(data);
  } catch (error) {
    next({ status: INTERNAL_SERVER_ERROR, message: 'Não foi possível encontrar tarefas!' });
  }
};

const createNewTask = async (req, res, next) => {
  try {
    const { task, description, status } = req.body;
    const data = await TasksServices.createNewTask({ task, description, status });
    return res.status(CREATED).json(data);
  } catch (error) {
    next({ status: INTERNAL_SERVER_ERROR, message: 'Não foi possível criar uma nova tarefa!' });
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { task, description, status, createdDate } = req.body;
    const data = await TasksServices.updateTask({ id, task, description, status, createdDate });
  
    return res.status(OK).json(data);
  } catch (error) {
    next({ status: INTERNAL_SERVER_ERROR, message: 'Não foi possível atualizar a tarefa!' });
  }
  };

const excludeTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await TasksServices.excludeTask({ id });
  
    if (data.err) {
      next({ status: NOT_FOUND, message: 'Não foi encontrar a tarefa para excluir!' });
    }
  
    return res.status(OK).json(data);
  } catch (error) {
    next({ status: INTERNAL_SERVER_ERROR, message: 'Não foi possível excluir a tarefa!' });
  }
};

module.exports = { getAllTasks, createNewTask, updateTask, excludeTask };