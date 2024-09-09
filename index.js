const app = require('./app');
const db = require('./database/db');

app.get('/', (req, res)=>{
    db.query('SELECT * FROM users', (error, result) =>{
        
        if(error){
            return res.status(500).send(error);

        }

        res.json(result);
    })
})

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})