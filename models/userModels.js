const db = require('../database/db');

exports.createUser = async (userData) =>{
    const { username, email, hash } = userData;

    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

    try {
        
        await db.execute(query, [username, email, hash]);

    } catch (error) {

        console.error("Erro ao criar usuário:", error);
        throw error; 
    }
};

exports.showAllUsers = async () => {
    try {

        const [users] = await db.query('SELECT * FROM users');

        return users;


    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        throw error;
    }
};

exports.getUserBy = async (type, value) => {
    try {

        const allowedTypes = ["id", "username", "email"];

        if(!allowedTypes.includes(type)){
            throw new Error("Tipo de busca inválido");
        }

        const query = `SELECT * FROM users WHERE ${type} = ?`;

        const [users] = await db.query(query, [value]);

        return users;
        
    } catch (error) {

        console.error("Erro ao buscar usuários:", error);
        throw error;
        
    }
}