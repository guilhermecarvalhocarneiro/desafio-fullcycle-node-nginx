const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: 'root',
    password: 'root',
    database: 'people',
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ', err);
    } else {
        console.log('Conexão com o banco de dados estabelecida');
    }
});

app.get('/', (req, res) => {
    db.query('SELECT * FROM people', (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados no banco de dados: ', err);
            res.status(500).send('Erro ao buscar dados no banco de dados');
        } else {
            let names = '';
            results.forEach((person) => {
                names += `<li>${person.name}</li>`;
            });
            const html = `<h1>Full Cycle Rocks!</h1><ul>${names}</ul>`;
            res.send(html);
        }
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor Node.js rodando na porta ${port}`);
});
