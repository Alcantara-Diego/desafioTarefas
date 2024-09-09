const { createTask } = require('../models/taskModels');


const createTaskController = async (req, res) => {

    const { title, description } = req.body;

    taskData = {

        title,
        description,
        done: false

    }

   

    
    return res.status(200).json(taskData); 
}

module.exports= { createTaskController };