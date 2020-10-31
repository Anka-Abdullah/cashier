const express = require('express');
const userController = require('../controllers/users')
const router = express.Router();
const { verifyAcces } = require('../midleware/auth')

router
    .post('/register', userController.register)
    .post('/login', userController.login)
    .get('/', verifyAcces, userController.getAllUsers)
    .patch('/:id', verifyAcces, userController.updateUser)
    .delete('/:id', verifyAcces, userController.deleteUser)

module.exports = router