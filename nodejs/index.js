const mysql = require('mysql');
const express = require('express');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'db', 
  user: 'root',
  password: 'root',
  database: 'dbnode'
});

connection.connect((error) => {
  if (error) {
    console.error('Database Error:', error);
    return;
  }
  console.log('Connected to the database');
});

function createPeopleTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS people (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL
    )
  `;

  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    console.log('Table "people" created or existing');
  });
}

createPeopleTable();

function insertName(nome) {
  const query = `INSERT INTO people (nome) VALUES ('${nome}')`;

  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    console.log('Nome cadastrado com sucesso!');
  });
}



app.get('/', function (req, res) {
  const nome = 'GuilhermeCarvalho';
  insertName(nome);
  connection.query('SELECT nome FROM people', function (error, results, fields) {
    if (error) throw error;

    const names = results.map(result => result.nome);

    res.send(`<h1>Full Cycle Rocks!</h1>\n\n<ul>${names.map(name => `<li>${name}</li>`).join('')}</ul>`);
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
