const rescue = require('express-rescue');
const TasksServices = require('../services/TasksServices');

const getAllTasks = rescue(async (req, res) => {
    const data = await TasksServices.getAllTasks();
    return res.status(200).json(data);
});

module.exports = { getAllTasks };