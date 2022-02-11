const router = require('express').Router();
const TasksController = require('../controllers/TasksController');
const { validateNewTask, validateUpdateTask } = require('../middlewares/tasksValidation');

router.get('/tasks/', TasksController.getAllTasks);
router.post('/tasks/', validateNewTask, TasksController.createNewTask);
router.put('/tasks/:id', validateUpdateTask, TasksController.updateTask);
router.delete('/tasks/:id', TasksController.excludeTask);

module.exports = router;