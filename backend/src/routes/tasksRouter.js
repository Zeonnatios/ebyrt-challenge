const router = require('express').Router();
const TasksController = require('../controllers/TasksController');

router.get('/tasks/', TasksController.getAllTasks);

module.exports = router;