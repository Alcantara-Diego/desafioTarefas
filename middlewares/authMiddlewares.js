const userModel = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function comparePassword(dbHash, password) {

    try {
        const result = await bcrypt.compare(password, dbHash);
        return result;

    } catch (err) {
        console.error(err);
        return false;
    }
}


const validadeLogin = async (req, res, next) => {

    const user = await userModel.getUserBy("email", req.body.email);

    console.log(user)
    console.log(user.length);
    console.log(user[0]);

    if(user.length < 1){

        return res.status(404).json({message: "Não há conta criada com o email selecionado"});

    }

    if(user.length == 1){

        const result = await comparePassword(user[0].password, req.body.password);

        if(result){
           return next();
        }

        return res.status(401).json({message: "email ou senha inválido"});
        

    }

    return res.status(500).json({message: "erro na requisição. Tente novamente"});

}

const validateFields = async (req, res, next) => {

    const { username, email, password} = req.body;

    if( !username || !email || !password){
        return res.status(400).json({message: "É necessário preencher todos os campos"})
    };
        
    next();
}

const CheckDuplicateAccount = async (req, res, next) => {

    const email = req.body.email;

    const users = await userModel.getUserBy("email", email);

    console.log("middleaware")

    if(users.length >= 1){
        return res.status(500).json({message: "A conta selecionada já está registrada. Faça login com a senha"})
    }

    next();

}

const checkCredentials = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split('')[1];

    if (token == null) {
        return res.status(401).json( { message: "token inválido"});
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        if(err) return res.status(401).json( { message: "token inválido"});

        req.user = user;
        next();
    })
}

module.exports = {validadeLogin, validateFields, CheckDuplicateAccount}