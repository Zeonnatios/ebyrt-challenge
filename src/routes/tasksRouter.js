const router = require('express').Router();
const TasksController = require('../controllers/TasksController');

router.get('/tasks/', TasksController.getAllTasks);
router.post('/tasks/', TasksController.createNewTask);
router.put('/tasks/:id', TasksController.updateTask);
router.delete('/tasks/:id', TasksController.excludeTask);

module.exports = router;