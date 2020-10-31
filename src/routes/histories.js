const express = require('express');
const historyController = require('../controllers/histories')
const router = express.Router()
const { verifyAcces } = require('../midleware/auth')

router
    .get('/:id', verifyAcces, historyController.getHistoryById)
    .get('/', verifyAcces, historyController.getAllHistories)
    .post('/', verifyAcces, historyController.insertHistory)
    .patch('/:id', verifyAcces, historyController.updateHistory)
    .delete('/:id', verifyAcces, historyController.deleteHistory)

module.exports = router