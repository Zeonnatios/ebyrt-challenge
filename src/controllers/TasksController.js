const { StatusCodes } = require('http-status-codes');
const TasksServices = require('../services/TasksServices');

const getAllTasks = async (req, res, next) => {
  try {
    const data = await TasksServices.getAllTasks();
    return res.status(StatusCodes.OK).json(data);
  } catch (error) {
    next({ status: StatusCodes.BAD_REQUEST, message: 'Não foi possível encontrar tarefas!' });
  }
};

const createNewTask = async (req, res, next) => {
  try {
    const { task, description, status } = req.body;
    const data = await TasksServices.createNewTask({ task, description, status });
    return res.status(StatusCodes.CREATED).json(data);
  } catch (error) {
    next({ status: StatusCodes.BAD_REQUEST, message: 'Não foi possível criar uma nova tarefa!' });
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { task, description, status, createdDate } = req.body;
    const data = await TasksServices.updateTask({ id, task, description, status, createdDate });
  
    return res.status(StatusCodes.OK).json(data);
  } catch (error) {
    next({ status: StatusCodes.BAD_REQUEST, message: 'Não foi possível atualizar a tarefa!' });
  }
  };

const excludeTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await TasksServices.excludeTask({ id });
  
    if (data.err) return res.status(StatusCodes.NOT_FOUND).json(data);
  
    return res.status(StatusCodes.OK).json(data);
  } catch (error) {
    next({ status: StatusCodes.BAD_REQUEST, message: 'Não foi possível excluir a tarefa!' });
  }
};

module.exports = { getAllTasks, createNewTask, updateTask, excludeTask };