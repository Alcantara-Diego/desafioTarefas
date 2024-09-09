const db = require("../database/db");

exports.createTask = async (taskData) => {

    const { email, title, description } = req.body;

    
    return res.status(200).json({taskData}); 
}