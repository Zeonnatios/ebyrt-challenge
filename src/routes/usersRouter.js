const router = require('express').Router();
const UsersController = require('../controllers/UsersController');

router.get('/users/', UsersController.getAllUsers);
router.post('/users/', UsersController.createNewuser);
router.put('/users/:id', UsersController.updateUser);
router.delete('/users/:id', UsersController.excludeUser);

module.exports = router;