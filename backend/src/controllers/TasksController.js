const rescue = require('express-rescue');
const TasksServices = require('../services/TasksServices');

const getAllTasks = rescue(async (req, res) => {
    const data = await TasksServices.getAllTasks();
    return res.status(200).json(data);
});

const createNewTask = rescue(async (req, res) => {
    const { task, description, status } = req.body;
    const data = await TasksServices.createNewTask({ task, description, status });
    return res.status(201).json(data);
});

const updateTask = rescue(async (req, res) => {
    const { id } = req.params;
    const { task, description, status, createdData } = req.body;
    const data = await TasksServices.updateTask({ id, task, description, status, createdData });
    return res.status(200).json(data);
  });

module.exports = { getAllTasks, createNewTask, updateTask };