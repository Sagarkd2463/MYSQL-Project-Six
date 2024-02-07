const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'r$$100200',
    database:'fullname',
});

db.connect((err) => {
    if(err){
        console.log(err.message);
    }

    console.log('Database Connection Successful...');
});

app.post('/insert', (req, res) => {
    const { name } = req.body;

    const sql = "INSERT INTO name (name) VALUES (?)";

    db.query(sql, [name], (err, data) => {
        if(err){
            res.send({status: false, message: err.message});
        } else {
            res.send({status: true, message: data});
        }
    });
});

app.get('/getAll', (req, res) => {

    const sql = "SELECT * FROM name";

    db.query(sql, (err, data) => {
        if(err){
            res.send({status: true, message: err.message});
        } else {
            res.send({status: true, message: data});
        }
    });
});

app.get('/get/:id', (req, res) => {

    const { id } = req.params;

    const sql = "SELECT * FROM name WHERE id = ?";

    db.query(sql, id, (err, data) => {
        if(err){
            res.send({status: false, message: err.message});
        } else {
            res.send({status: true, message: data});
        }
    });
});

app.put('/update/:id', (req, res) => {
    const { id, name } = req.body;

    const sql = "UPDATE name SET `name` = ? WHERE id = ?";

    db.query(sql, [name, id], (err, data) => {
        if(err){
            res.send({status: false, message: err.message});
        } else {
            res.send({status: true, message: data});
        }
    });
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM name WHERE id = ?";

    db.query(sql, [id], (err) => {
        if(err){
            res.send({status: false, message: err.message});
        }else {
            res.send({status: true, message:`Deleted name with id: ${id}`});
        }
    });
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});