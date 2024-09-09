const express = require('express');
const { createTaskController } = require('../controllers/taskController');
const { createTask } = require('../models/taskModels');
const router = express.Router();

router.post('/create', createTaskController);

module.exports= router;