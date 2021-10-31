const router = require('express').Router();
const TasksController = require('../controllers/TasksController');

router.get('/tasks/', TasksController.getAllTasks);
router.post('/tasks/', TasksController.createNewTask);
router.put('/tasks/:id', TasksController.updateTask);

module.exports = router;