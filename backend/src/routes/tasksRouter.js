const router = require('express').Router();
const TasksController = require('../controllers/TasksController');

router.get('/tasks/', TasksController.getAllTasks);
router.post('/tasks/', TasksController.createNewTask);

module.exports = router;