const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '102003',       
    database: 'projet_examen'
});

module.exports = db;