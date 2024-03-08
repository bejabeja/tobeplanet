const express = require('express')
const router = express.Router()
// const mysql = require('mysql')
const { Pool } = require('pg');
require('dotenv/config');

const client = new Pool({
  connectionString: process.env.POSTGRES_URL,
});


client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(error => console.error('Error connecting to PostgreSQL database:', error));


// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE
// })

// db.connect(err => {
//     if (err) {
//       console.error('Error connecting to MySQL database:', err);
//       return;
//     }
//     console.log('Connected to MySQL database');
//   });


router.get('/users', (req, res) => {
    const userData = 
    [
        {
            "id" : 1,
            "name" : "Mimi",
            "lasName" : "ouwww",
            "email" : "test1@gmail.com",
            "password" : "password"
        },
        {
            "id" : 2,
            "name" : "Test",
            "lastName" : "hihihi",
            "email" : "test2@gmail.com",
            "password" : "password"
        }
    ]
    res.send(userData)
})

// router.post('/sign-in', (req, res) => {
//     const { email, name, lastName } = req.body;
//     const sql = 'INSERT INTO users (name, last_name, email, password) VALUES (?, ?, ?, ?)';
  
//     db.query(sql, [name, lastName, email, 'password'], (err, result) => {
//         if (err) {
//             console.error('Error executing MySQL query:', err);
//             return res.status(500).json('Login Failed');
//         }
//         console.log('Inserted new user with ID:', result.insertId);
//         return res.status(200).json('User inserted successfully');
//     });
// });

// router.post('/sign-in', async (req, res) => {
//     const { email, name, lastName } = req.body;
//     try {
//       await client.query('CREATE TABLE IF NOT EXISTS users (name varchar(255), email varchar(255))');
//       await client.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
//       const result = await client.query('SELECT * FROM users');
//       res.status(200).json(result.rows);
//     } catch (error) {
//       console.error('Error executing PostgreSQL query:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });


module.exports = router