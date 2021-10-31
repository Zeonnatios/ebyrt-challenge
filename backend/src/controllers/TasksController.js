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

module.exports = { getAllTasks, createNewTask };