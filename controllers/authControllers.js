require('dotenv').config();
const userModel = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginController = async (req, res) =>{

    const { email, password } = req.body;

    const user = { email: email }
    const accessToken = jwt.sign(user, process.env.SECRET_TOKEN);
    

    console.log("---");
    console.log(email, password);

    res.status(200).json({ accessToken: accessToken });
};


async function hashPassword(password) {
    try {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    } catch (err) {
        console.error(err);
        return false;
    }
}


exports.registerController = async (req, res) => {

    try {    
        
        const { username, email, password } = req.body;

        const hash = await hashPassword(password);
        
        console.log(hash);

        if(!hash){
            return res.status(500).json({message: "erro na criação do hash"});
        }

        console.log({username, email, hash})

        await userModel.createUser({username, email, hash});


        const result = await userModel.showAllUsers();
        console.log(result);

        return res.status(201).json({message: "Usuário registrado"});

        


    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Erro ao registrar usuário"});
    }

}






// CREATE TABLE tasks (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     email VARCHAR(100) NOT NULL,
//     title VARCHAR(50) NOT NULL,
//     done BOOLEAN NOT NULL DEFAULT FALSE,
//     description TEXT,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     CONSTRAINT fk_task_user_email FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
// );
