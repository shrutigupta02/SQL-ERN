const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass@2024',
    database: 'demo'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.post('/login', (req, res) => {
    const sql = 'INSERT INTO login (`id`, `email`, `password`) VALUES (?)';
    const values = [
        uuidv4(),
        req.body.email,
        req.body.password
    ];

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            res.status(500).send({ error: 'Database query error' });
            return;
        }
        console.log(result);
        res.status(200).send({ message: 'User registered successfully' });
    });
});

app.listen(1234, () => {
    console.log("Server listening on port 1234");
});
